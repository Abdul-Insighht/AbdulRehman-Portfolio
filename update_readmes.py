import os
import subprocess

repos_dir = r"D:\Github\Abdul-Insighht-repos"
owner = "Abdul-Insighht"

contact_section = """

---

## 📬 Contact

**Hafiz Abdul Rehman**

- 📧 Email: hafizrehman3321@gmail.com
- 💼 LinkedIn: [Hafiz Abdul Rehman](https://linkedin.com/in/hafiz-abdul-rehman-9990ab329)
- 🐙 GitHub: [Abdul-Insighht](https://github.com/Abdul-Insighht)

---

## 🌟 Show Your Support

If you find this project helpful, please consider:

- ⭐ **Starring** this repository
- 🔄 **Sharing** with others
- 🐛 **Reporting** issues
- 💡 **Suggesting** improvements

---

<p align="center">Made with ❤️ by <b>Hafiz Abdul Rehman</b></p>
"""

# Create repos directory
os.makedirs(repos_dir, exist_ok=True)

# Get list of repos
print("Fetching repository list...")
result = subprocess.run(
    ["gh", "repo", "list", owner, "--limit", "50", "--json", "name", "--jq", ".[].name"],
    capture_output=True, text=True
)
repos = [r.strip() for r in result.stdout.strip().split("\n") if r.strip()]
print(f"Found {len(repos)} repositories")

for repo in repos:
    print(f"\n===== Processing: {repo} =====")
    
    repo_path = os.path.join(repos_dir, repo)
    
    # Clone if not exists
    if not os.path.exists(repo_path):
        print(f"Cloning {repo}...")
        subprocess.run(["gh", "repo", "clone", f"{owner}/{repo}", repo_path], 
                      capture_output=True)
        if not os.path.exists(repo_path):
            print(f"Failed to clone {repo}, skipping...")
            continue
    else:
        print("Repository already exists, pulling latest...")
        subprocess.run(["git", "pull"], cwd=repo_path, capture_output=True)
    
    # Check/update README
    readme_path = os.path.join(repo_path, "README.md")
    
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        
        # Check if contact section already exists
        if "## 📬 Contact" in content:
            print(f"Contact section already exists in {repo}, skipping...")
            continue
        
        # Append contact section
        new_content = content.rstrip() + "\n" + contact_section
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Updated README.md with contact section")
        
    else:
        # Create basic README if missing
        project_name = repo.replace("-", " ").replace("_", " ")
        basic_readme = f"""# {project_name}

A project by Hafiz Abdul Rehman.

## 📖 Overview

This repository contains the implementation of {project_name}.

## 🚀 Features

- Implementation details coming soon

## ⚙️ Installation

```bash
git clone https://github.com/{owner}/{repo}.git
cd {repo}
```

## 📝 Usage

Documentation coming soon.
""" + contact_section

        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(basic_readme)
        print("Created new README.md")
    
    # Commit and push
    subprocess.run(["git", "add", "README.md"], cwd=repo_path, capture_output=True)
    
    # Check if there are changes
    result = subprocess.run(["git", "status", "--porcelain", "README.md"], 
                          cwd=repo_path, capture_output=True, text=True)
    
    if result.stdout.strip():
        subprocess.run(
            ["git", "commit", "-m", "docs: Add contact section and support information to README"],
            cwd=repo_path, capture_output=True
        )
        print("Committed changes")
        
        push_result = subprocess.run(["git", "push"], cwd=repo_path, capture_output=True)
        if push_result.returncode == 0:
            print("Pushed to GitHub successfully")
        else:
            print("Push may have issues, check manually")
    else:
        print("No changes to commit")

print("\n===== All repositories processed! =====")
