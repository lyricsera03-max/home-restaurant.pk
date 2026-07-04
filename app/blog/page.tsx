"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogPosts as initialBlogs } from "@/lib/site-data";
import { loadAdminItems } from "@/lib/storage";

export default function BlogPage() {
  const [blogs, setBlogs] = useState(initialBlogs);

  useEffect(() => {
    setBlogs(loadAdminItems("homerestaurant-blogs", initialBlogs));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">SEO-friendly blog articles for Karachi customers</h1>
        <p className="mt-4 text-lg text-slate-600">Use the blog to attract searches for home food, office lunch ideas, and corporate catering in Karachi.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogs.map((post) => (
          <article key={post.id} className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex font-semibold text-amber-700">
              Read article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
