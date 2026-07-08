# PowerShell script to update all repository README files
$reposDir = "D:\Github\Abdul-Insighht-repos"
$owner = "Abdul-Insighht"

# Contact section to add (using single quotes for literal string)
$contactSection = '

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
'

# Get list of repos
Write-Host "Fetching repository list..."
$repoOutput = gh repo list $owner --limit 50 --json name --jq ".[].name"
$repos = $repoOutput -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }

Write-Host "Found $($repos.Count) repositories"

foreach ($repo in $repos) {
    Write-Host ""
    Write-Host "===== Processing: $repo =====" -ForegroundColor Cyan
    
    $repoPath = Join-Path $reposDir $repo
    
    # Clone if not exists
    if (!(Test-Path $repoPath)) {
        Write-Host "Cloning $repo..."
        $null = gh repo clone "$owner/$repo" $repoPath 2>&1
        if (!(Test-Path $repoPath)) {
            Write-Host "Failed to clone $repo, skipping..." -ForegroundColor Red
            continue
        }
    } else {
        Write-Host "Repository already exists, pulling latest..."
        Push-Location $repoPath
        $null = git pull 2>&1
        Pop-Location
    }
    
    # Check/update README
    $readmePath = Join-Path $repoPath "README.md"
    
    if (Test-Path $readmePath) {
        $content = Get-Content $readmePath -Raw -ErrorAction SilentlyContinue
        if ($null -eq $content) { $content = "" }
        
        # Check if contact section already exists
        if ($content -match "## 📬 Contact") {
            Write-Host "Contact section already exists in $repo, skipping..." -ForegroundColor Yellow
            continue
        }
        
        # Append contact section
        $newContent = $content.TrimEnd() + "`n" + $contactSection
        [System.IO.File]::WriteAllText($readmePath, $newContent)
        Write-Host "Updated README.md with contact section" -ForegroundColor Green
        
    } else {
        # Create basic README if missing
        $projectName = $repo -replace "-", " "
        $basicReadme = "# $projectName`n`nA project by Hafiz Abdul Rehman.`n`n## Overview`n`nThis repository contains the implementation of $projectName.`n`n## Features`n`n- Implementation details coming soon`n`n## Installation`n`n``````bash`ngit clone https://github.com/$owner/$repo.git`ncd $repo`n```````n`n## Usage`n`nDocumentation coming soon." + $contactSection

        [System.IO.File]::WriteAllText($readmePath, $basicReadme)
        Write-Host "Created new README.md" -ForegroundColor Green
    }
    
    # Commit and push
    Push-Location $repoPath
    $null = git add README.md 2>&1
    $status = git status --porcelain README.md 2>&1
    
    if ($status) {
        $null = git commit -m "docs: Add contact section and support information to README" 2>&1
        Write-Host "Committed changes" -ForegroundColor Green
        
        $pushResult = git push 2>&1
        Write-Host "Pushed to GitHub" -ForegroundColor Green
    } else {
        Write-Host "No changes to commit" -ForegroundColor Yellow
    }
    Pop-Location
}

Write-Host ""
Write-Host "===== All repositories processed! =====" -ForegroundColor Cyan
