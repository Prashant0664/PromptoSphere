/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        }
    return config;
    },
    images: {
      domains: ['lh3.googleusercontent.com','www.pngkey.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};
export default nextConfig;