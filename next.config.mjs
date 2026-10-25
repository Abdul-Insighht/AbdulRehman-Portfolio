const isGitHubPages = process.env.DEPLOY_TARGET === 'gh-pages';
const basePath = isGitHubPages ? '/AbdulRehman-Portfolio' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable full Next.js serverless features on Vercel (API routes /api/chat, /api/projects)
    // Only enforce static export if explicitly targeting GitHub Pages
    ...(isGitHubPages ? { output: 'export', basePath } : {}),
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "huggingface.co",
            },
            {
                protocol: "https",
                hostname: "viz.mediapipe.dev",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "seaborn.pydata.org",
            },
            {
                protocol: "https",
                hostname: "python.langchain.com",
            },
            {
                protocol: "https",
                hostname: "ollama.com",
            },
        ],
    },
}

export default nextConfig
