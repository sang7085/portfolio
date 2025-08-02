/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@whatisjery/react-fluid-distortion'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
  basePath: '',
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "raw-loader",
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
