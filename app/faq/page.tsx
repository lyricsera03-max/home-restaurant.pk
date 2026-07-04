"use client";

import { useEffect, useState } from "react";
import { faqItems as initialFaqs } from "@/lib/site-data";
import { loadAdminItems } from "@/lib/storage";

export default function FaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs);

  useEffect(() => {
    setFaqs(loadAdminItems("homerestaurant-faqs", initialFaqs));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">FAQ</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Frequently asked questions</h1>
        <p className="mt-4 text-lg text-slate-600">Browse common questions about meals, catering, and orders for HomeRestaurant.</p>
      </div>

      <div className="mt-10 space-y-4">
        {faqs.map((item) => (
          <details key={item.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer text-lg font-semibold text-slate-900">{item.question}</summary>
            <p className="mt-3 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
