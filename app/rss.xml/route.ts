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

function toRfc822(date: Date | string) {
  return new Date(date).toUTCString();
}

export function GET() {
  const items: string[] = [];

  for (const post of blogPosts) {
    items.push(
      [
        "<item>",
        `<title><![CDATA[${post.title}]]></title>`,
        `<link>${SITE_URL}/blog/${post.slug}</link>`,
        `<description><![CDATA[${post.description}]]></description>`,
        `<pubDate>${toRfc822(post.publishedAt)}</pubDate>`,
        `<guid>${SITE_URL}/blog/${post.slug}</guid>`,
        "</item>",
      ].join("\n")
    );
  }

  for (const c of successCasesMock) {
    items.push(
      [
        "<item>",
        `<title><![CDATA[${c.title}]]></title>`,
        `<link>${SITE_URL}/cases/${c.id}</link>`,
        `<description><![CDATA[${c.description.slice(0, 200)}]]></description>`,
        `<pubDate>${toRfc822(c.createdAt)}</pubDate>`,
        `<guid>${SITE_URL}/cases/${c.id}</guid>`,
        "</item>",
      ].join("\n")
    );
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(SITE_TITLE)}</title>`,
    `<link>${SITE_URL}</link>`,
    `<description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "<language>ko</language>",
    `<lastBuildDate>${toRfc822(new Date())}</lastBuildDate>`,
    items.join("\n"),
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
