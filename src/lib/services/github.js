/**
 * GitHub Public API Integration
 * Extracts public repositories, primary languages, and star counts for student portfolios
 */
export async function fetchGitHubUserData(username) {
    if (!username) return null;
    const cleanUsername = username.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').trim();

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`, {
                headers: { Accept: 'application/vnd.github.v3+json' },
                next: { revalidate: 3600 }
            }),
            fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=6`, {
                headers: { Accept: 'application/vnd.github.v3+json' },
                next: { revalidate: 3600 }
            })
        ]);

        if (!userRes.ok) return null;

        const userData = await userRes.json();
        const reposData = reposRes.ok ? await reposRes.json() : [];

        const projects = Array.isArray(reposData) ? reposData.map(repo => ({
            title: repo.name,
            description: repo.description || 'Public open-source repository',
            github_url: repo.html_url,
            live_url: repo.homepage || null,
            stars_count: repo.stargazers_count || 0,
            tags: repo.language ? [repo.language] : ['Open Source'],
        })) : [];

        return {
            username: cleanUsername,
            bio: userData.bio,
            public_repos: userData.public_repos,
            followers: userData.followers,
            avatar_url: userData.avatar_url,
            projects
        };
    } catch (err) {
        console.error('Error fetching GitHub profile:', err);
        return null;
    }
}
