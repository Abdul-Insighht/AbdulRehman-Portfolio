import os
import subprocess
import base64
import json

repos_dir = r"D:\Github\Abdul-Insighht-repos"
owner = "Abdul-Insighht"

# Get list of repos
print("Fetching repository list...")
result = subprocess.run(
    ["gh", "repo", "list", owner, "--limit", "50", "--json", "name", "--jq", ".[].name"],
    capture_output=True, text=True
)
repos = [r.strip() for r in result.stdout.strip().split("\n") if r.strip()]
print(f"Found {len(repos)} repositories")

success_count = 0
fail_count = 0

for repo in repos:
    print(f"\n===== Processing: {repo} =====")
    
    repo_path = os.path.join(repos_dir, repo)
    readme_path = os.path.join(repo_path, "README.md")
    
    if not os.path.exists(readme_path):
        print("No local README.md found, skipping...")
        continue
    
    # Read the updated README content
    with open(readme_path, "r", encoding="utf-8", errors="ignore") as f:
        new_content = f.read()
    
    # Check if it has contact section
    if "## 📬 Contact" not in new_content:
        print("Contact section not found in local file, skipping...")
        continue
    
    # Get the current file SHA from GitHub (required for updating)
    get_sha_cmd = [
        "gh", "api", f"/repos/{owner}/{repo}/contents/README.md",
        "--jq", ".sha"
    ]
    sha_result = subprocess.run(get_sha_cmd, capture_output=True, text=True)
    
    if sha_result.returncode != 0:
        # README might not exist on GitHub, try creating it
        print("README.md not found on GitHub, creating...")
        sha = None
    else:
        sha = sha_result.stdout.strip()
        print(f"Found existing README, SHA: {sha[:8]}...")
    
    # Encode content to base64
    content_b64 = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')
    
    # Create the API request body
    request_body = {
        "message": "docs: Add contact section and support information to README",
        "content": content_b64
    }
    if sha:
        request_body["sha"] = sha
    
    # Write request body to temp file
    temp_file = os.path.join(repos_dir, f"temp_{repo}.json")
    with open(temp_file, "w") as f:
        json.dump(request_body, f)
    
    # Update via GitHub API
    update_cmd = [
        "gh", "api", "-X", "PUT",
        f"/repos/{owner}/{repo}/contents/README.md",
        "--input", temp_file
    ]
    update_result = subprocess.run(update_cmd, capture_output=True, text=True)
    
    # Clean up temp file
    os.remove(temp_file)
    
    if update_result.returncode == 0:
        print("✓ Successfully updated via GitHub API!")
        success_count += 1
    else:
        print(f"✗ Failed: {update_result.stderr}")
        fail_count += 1

print(f"\n===== Complete! =====")
print(f"Successfully updated: {success_count}")
print(f"Failed: {fail_count}")
