"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { useModal } from "@/contexts/ModalContext";
import { trackCTAClick } from "@/lib/gtm";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageLayout from "@/components/layout/PageLayout";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const { openConsultation } = useModal();

  const handleCTAClick = () => {
    trackCTAClick("blog_cta");
    openConsultation();
  };

  const otherPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "해외선물 손실복구 디펜더",
    },
    publisher: {
      "@type": "Organization",
      name: "해외선물 손실복구 디펜더",
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <PageLayout>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Article */}
      <article className="py-20 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Breadcrumb
              items={[
                { name: "홈", href: "/" },
                { name: "블로그", href: "/blog" },
                { name: post.title },
              ]}
            />

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-amber-500 text-sm font-display font-semibold tracking-wider">
                  {post.category}
                </span>
                <span className="text-slate-600 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {section.content}
                  </p>
                </motion.section>
              ))}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#0A192F] to-[#112240]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
              손실복구가 필요하시다면
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              전담 상담사가 고객님의 상황에 맞는 최적의 솔루션을 안내해드립니다.
            </p>
            <button
              onClick={handleCTAClick}
              className="breathing-btn bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all duration-300"
            >
              무료 상담 신청하기
            </button>
          </motion.div>
        </div>
      </section>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center">
              다른 글 읽어보기
            </h2>
            <div className="space-y-4">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="block group"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-amber-500 text-xs font-display font-semibold">
                          {other.category}
                        </span>
                        <h3 className="text-base md:text-lg font-semibold text-slate-100 mt-1 group-hover:text-amber-400 transition-colors">
                          {other.title}
                        </h3>
                      </div>
                      <svg
                        className="w-5 h-5 text-slate-500 group-hover:text-amber-500 flex-shrink-0 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
