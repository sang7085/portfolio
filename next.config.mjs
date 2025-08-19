/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@whatisjery/react-fluid-distortion'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: '',
  basePath: '',

  // 정적 호스팅 친화적: 모든 경로를 / 로 끝나게 → out/work/a/index.html 형태로 생성
  trailingSlash: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [{ loader: 'raw-loader' }],
    });
    return config;
  },
};

export default nextConfig;