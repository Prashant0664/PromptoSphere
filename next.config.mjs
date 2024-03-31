/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        }
    }    
};

export default nextConfig;
