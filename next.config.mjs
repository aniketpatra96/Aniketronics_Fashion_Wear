/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://dummyimage.com/**"),
      new URL("https://m.media-amazon.com/images/**"),
    ],
  },
};

export default nextConfig;
