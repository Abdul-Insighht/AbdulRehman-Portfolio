// Direct test of GitHub repository fetch and classification
const username = 'Abdul-Insighht';
const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`;

console.log(`Connecting to GitHub API for ${username}...`);
try {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'AbdulRehman-Portfolio-Test',
    },
  });

  console.log(`Status: ${res.status} ${res.statusText}`);
  if (res.ok) {
    const repos = await res.json();
    console.log(`Successfully fetched ${repos.length} public repositories!`);
    console.log('Sample top 10 repositories from GitHub:');
    repos.slice(0, 10).forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.name}] - Stars: ${r.stargazers_count}, Language: ${r.language}, Pushed: ${r.pushed_at}`);
    });
  } else {
    console.log('Response:', await res.text());
  }
} catch (e) {
  console.error('Fetch error:', e);
}
