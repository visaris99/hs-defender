import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // www → non-www 리다이렉트 (SEO 중복 URL 방지)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.xn--2e0b15inqbc0l9kc43jpwao6fp0lmq9adie.site" }],
        destination:
          "https://xn--2e0b15inqbc0l9kc43jpwao6fp0lmq9adie.site/:path*",
        permanent: true,
      },
    ];
  },
  // 보안 + 캐시 헤더
  async headers() {
    return [
      // 보안 헤더 (모든 페이지)
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // 정적 에셋 장기 캐시 (이미지, 비디오, 폰트)
      {
        source: "/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // 이미지 최적화 — WebP/AVIF 자동 변환
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
