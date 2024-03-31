/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        }

    return config;
    }    ,
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
