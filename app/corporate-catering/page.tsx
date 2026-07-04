"use client";

import { useState } from "react";
import { loadLeads, saveLeads } from "@/lib/storage";

export default function CorporateCateringPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    employees: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const leads = loadLeads();
    leads.unshift({
      id: `${Date.now()}`,
      name: form.name,
      phone: form.phone,
      email: "",
      company: form.company,
      message: `${form.message}\nEmployees: ${form.employees}`,
      type: "corporate",
      date: new Date().toISOString(),
      contacted: false,
      archived: false,
    });
    saveLeads(leads);
    setSubmitted(true);
    setForm({ name: "", company: "", phone: "", employees: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Corporate catering</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Office meal service for Karachi teams</h1>
          <p className="mt-4 text-lg text-slate-600">Support software houses, call centers, factories, and hospitals with a dependable meal plan that keeps staff energized.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <div className="grid gap-4">
            <input required placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            <input required placeholder="Company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            <input required placeholder="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            <input required placeholder="Number of employees" value={form.employees} onChange={(event) => setForm({ ...form, employees: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            <textarea required placeholder="Message" rows={4} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            <button type="submit" className="rounded-full bg-amber-600 px-6 py-3 font-semibold text-white">Submit inquiry</button>
          </div>
          {submitted && <p className="mt-4 text-sm font-medium text-emerald-600">Thank you. Your corporate inquiry has been recorded.</p>}
        </form>
      </div>
    </div>
  );
}
