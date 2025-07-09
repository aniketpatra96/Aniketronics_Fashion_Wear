/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://dummyimage.com/**"),
      new URL("https://m.media-amazon.com/images/**"),
      new URL(
        "https://lh3.googleusercontent.com/a/**"
      ),
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
    ],
  },
};

export default nextConfig;
