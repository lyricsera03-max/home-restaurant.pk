"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { blogPosts, corporateBenefits, faqItems as initialFaqs, menuItems, testimonials } from "@/lib/site-data";
import { loadAdminItems } from "@/lib/storage";

export default function Home() {
  const [faqItems, setFaqItems] = useState(initialFaqs);
  const todaySpecial = menuItems.find((item) => item.isTodaySpecial) ?? menuItems[0];

  useEffect(() => {
    const savedFaqs = loadAdminItems("homerestaurant-faqs", initialFaqs);
    setFaqItems(savedFaqs);
  }, []);

  return (
    <div>
      <section className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.25),_transparent_45%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Fresh homemade meals</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Fresh Homemade Roti, Kabab & Daily Salan in Karachi
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              HomeRestaurant helps families, offices, and night-shift teams receive wholesome meals with a simple inquiry-based experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://api.whatsapp.com/send?phone=923703112964&text=Hello%20HomeRestaurant%2C%20I%20would%20like%20to%20inquire%20about%20your%20meals." className="rounded-full bg-amber-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-amber-700">
                Contact on WhatsApp
              </a>
              <Link href="/corporate-catering" className="rounded-full border border-amber-300 px-6 py-3 text-center font-semibold text-amber-700 transition hover:bg-amber-50">
                Request Meal Plan
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Today&apos;s menu</p>
            <img src={todaySpecial.image} alt={todaySpecial.name} className="mt-4 h-56 w-full rounded-2xl object-cover" />
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{todaySpecial.name}</h2>
            <p className="mt-2 text-slate-600">{todaySpecial.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {menuItems.slice(0, 3).map((item) => (
            <article key={item.id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
              <img src={item.image} alt={item.name} className="h-44 w-full rounded-2xl object-cover" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
          <h2 className="text-3xl font-semibold text-slate-900">Why choose HomeRestaurant</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Homemade food",
              "Fresh daily",
              "Hygienic preparation",
              "Corporate meal plans available",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="font-medium text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Corporate meals</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Meal plans for offices, call centers, factories and night-shift teams</h2>
            <div className="mt-6 space-y-3">
              {corporateBenefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-amber-50 p-3 text-slate-700">
                  {benefit}
                </div>
              ))}
            </div>
            <Link href="/corporate-catering" className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700">
              Request Corporate Quote
            </Link>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Testimonials</h2>
            <div className="mt-6 space-y-4">
              {testimonials.map((item) => (
                <blockquote key={item.id} className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-slate-700">“{item.quote}”</p>
                  <footer className="mt-3 text-sm font-semibold text-slate-900">{item.name} • {item.role}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-slate-900">Latest blogs</h2>
          <Link href="/blog" className="text-sm font-semibold text-amber-700">View all</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-3 text-slate-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex font-semibold text-amber-700">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold text-slate-900">FAQ</h2>
            <Link href="/faq" className="text-sm font-semibold text-amber-700">View all</Link>
          </div>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <details key={item.id} className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-3 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
