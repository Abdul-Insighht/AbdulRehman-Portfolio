/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
