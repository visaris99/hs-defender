"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import Breadcrumb from "@/components/common/Breadcrumb";
import PageLayout from "@/components/layout/PageLayout";

export default function BlogPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Breadcrumb
              items={[{ name: "홈", href: "/" }, { name: "블로그" }]}
            />

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              해외선물 <span className="gradient-text">투자 가이드</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              전문가 시각의 투자 인사이트와 손실복구 가이드를 제공합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog List */}
      <section className="pb-20 md:pb-32 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-3xl p-8 md:p-10 hover:bg-white/[0.08] hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-amber-500 text-xs font-display font-semibold tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-slate-600 text-xs">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-amber-400 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all mt-2">
                      <svg
                        className="w-6 h-6"
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
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
