"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { blogPosts as initialBlogs } from "@/lib/site-data";
import { loadAdminItems } from "@/lib/storage";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState(initialBlogs);
  const slug = params?.slug;

  useEffect(() => {
    setBlogs(loadAdminItems("homerestaurant-blogs", initialBlogs));
  }, []);

  const post = blogs.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-semibold text-amber-700">
          ← Back to blog
        </Link>
        <div className="mt-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Article not found</h1>
          <p className="mt-3 text-slate-600">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/blog" className="text-sm font-semibold text-amber-700">
        ← Back to blog
      </Link>
      <article className="mt-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <img src={post.featuredImage} alt={post.title} className="mt-8 h-80 w-full rounded-2xl object-cover" />
        <p className="mt-8 text-base leading-8 text-slate-700">{post.content}</p>
      </article>
    </div>
  );
}
