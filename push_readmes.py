import os
import subprocess

repos_dir = r"D:\Github\Abdul-Insighht-repos"

# Get all directories in the repos folder
repos = [d for d in os.listdir(repos_dir) if os.path.isdir(os.path.join(repos_dir, d))]
print(f"Found {len(repos)} repositories to process")

success_count = 0
fail_count = 0

for repo in repos:
    repo_path = os.path.join(repos_dir, repo)
    print(f"\n===== Processing: {repo} =====")
    
    # Check if there's a README.md
    readme_path = os.path.join(repo_path, "README.md")
    if not os.path.exists(readme_path):
        print("No README.md found, skipping...")
        continue
    
    # Add the file
    result = subprocess.run(["git", "add", "README.md"], cwd=repo_path, capture_output=True, text=True)
    
    # Check if there are changes to commit
    status = subprocess.run(["git", "status", "--porcelain"], cwd=repo_path, capture_output=True, text=True)
    
    if "README.md" in status.stdout or "readme.md" in status.stdout.lower():
        # Commit
        commit_result = subprocess.run(
            ["git", "commit", "-m", "docs: Add contact section and support information to README"],
            cwd=repo_path, capture_output=True, text=True
        )
        print(f"Commit: {commit_result.stdout.strip()}")
        if commit_result.returncode != 0:
            print(f"Commit error: {commit_result.stderr}")
        
        # Push
        push_result = subprocess.run(["git", "push"], cwd=repo_path, capture_output=True, text=True)
        if push_result.returncode == 0:
            print("Pushed successfully!")
            success_count += 1
        else:
            print(f"Push error: {push_result.stderr}")
            fail_count += 1
    else:
        # Check if already up to date by looking at unpushed commits
        unpushed = subprocess.run(
            ["git", "log", "origin/main..HEAD", "--oneline"],
            cwd=repo_path, capture_output=True, text=True
        )
        if unpushed.stdout.strip():
            print("Found unpushed commits, pushing...")
            push_result = subprocess.run(["git", "push"], cwd=repo_path, capture_output=True, text=True)
            if push_result.returncode == 0:
                print("Pushed successfully!")
                success_count += 1
            else:
                print(f"Push error: {push_result.stderr}")
                fail_count += 1
        else:
            print("No changes to commit or push")

print(f"\n===== Complete! =====")
print(f"Successfully pushed: {success_count}")
print(f"Failed: {fail_count}")
