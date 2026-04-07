import { blogPosts } from "@/data/blogData";
import { successCasesMock } from "@/data/mockData";

const SITE_URL = "https://xn--2e0b15inqbc0l9kc43jpwao6fp0lmq9adie.site";
const SITE_TITLE = "해외선물 손실복구 디펜더";
const SITE_DESCRIPTION =
  "해외선물 손실복구 방법, 투자 전략, 성공 사례 등 전문가 시각의 투자 가이드를 제공합니다.";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const blogItems = blogPosts.map(
    (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
    </item>`
  );

  const caseItems = successCasesMock.map(
    (c) => `
    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${SITE_URL}/cases/${c.id}</link>
      <description>${escapeXml(c.description.slice(0, 200))}</description>
      <pubDate>${new Date(c.createdAt).toUTCString()}</pubDate>
      <category>복구 사례</category>
      <guid isPermaLink="true">${SITE_URL}/cases/${c.id}</guid>
    </item>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${blogItems.join("")}
${caseItems.join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
