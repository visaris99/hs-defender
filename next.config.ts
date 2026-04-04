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
  // 보안 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
