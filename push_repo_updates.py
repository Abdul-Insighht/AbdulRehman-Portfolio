import os
import subprocess
import base64
import json

repos_to_update = [
    {
        "name": "Vehicle-Detection-Counting-Using_YOLO_and_Masking",
        "local_path": r"D:\Github\Abdul-Insighht-repos\Vehicle-Detection-Counting-Using_YOLO_and_Masking",
        "files": [
            ("README.md", "README.md"),
            ("outputs/sample_detection.png", "outputs/sample_detection.png")
        ]
    },
    {
        "name": "License_Plate_Detection",
        "local_path": r"D:\Github\Abdul-Insighht-repos\License_Plate_Detection",
        "files": [
            ("README.md", "README.md")
        ]
    },
    {
        "name": "Kidney-Disease-Classification-DL",
        "local_path": r"D:\Github\Abdul-Insighht-repos\Kidney-Disease-Classification-DL",
        "files": [
            ("README.md", "README.md")
        ]
    },
    {
        "name": "AI-Global-World-Wide-Travel-Assistant-Planner",
        "local_path": r"D:\Github\Abdul-Insighht-repos\AI-Global-World-Wide-Travel-Assistant-Planner",
        "files": [
            ("README.md", "README.md")
        ]
    },
    {
        "name": "Human_Activity_Recognition",
        "local_path": r"D:\Github\Abdul-Insighht-repos\Human_Activity_Recognition",
        "files": [
            ("README.md", "README.md")
        ]
    }
]

owner = "Abdul-Insighht"
success = 0
fail = 0

for repo_info in repos_to_update:
    repo = repo_info["name"]
    repo_path = repo_info["local_path"]
    
    print(f"\n===== Pushing {repo} =====")
    
    for local_file, remote_file in repo_info["files"]:
        file_path = os.path.join(repo_path, local_file)
        
        if not os.path.exists(file_path):
            print(f"  Skip: {local_file} not found")
            continue
            
        print(f"  Uploading: {remote_file}")
        
        # Read file content
        with open(file_path, "rb") as f:
            content = f.read()
        content_b64 = base64.b64encode(content).decode('utf-8')
        
        # Get existing file SHA
        get_sha_cmd = [
            "gh", "api", f"/repos/{owner}/{repo}/contents/{remote_file}",
            "--jq", ".sha"
        ]
        sha_result = subprocess.run(get_sha_cmd, capture_output=True, text=True)
        sha = sha_result.stdout.strip() if sha_result.returncode == 0 else None
        
        # Prepare request
        request_body = {
            "message": f"docs: Update {remote_file} with sample results",
            "content": content_b64
        }
        if sha:
            request_body["sha"] = sha
            
        # Write temp file
        temp_file = f"temp_{repo}_{local_file.replace('/', '_')}.json"
        with open(temp_file, "w") as f:
            json.dump(request_body, f)
        
        # Upload via API
        update_cmd = [
            "gh", "api", "-X", "PUT",
            f"/repos/{owner}/{repo}/contents/{remote_file}",
            "--input", temp_file
        ]
        result = subprocess.run(update_cmd, capture_output=True, text=True)
        
        os.remove(temp_file)
        
        if result.returncode == 0:
            print(f"    ✓ Success")
            success += 1
        else:
            print(f"    ✗ Failed: {result.stderr[:100]}")
            fail += 1

print(f"\n✅ Done! Success: {success}, Failed: {fail}")
