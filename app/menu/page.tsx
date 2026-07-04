"use client";

import { useEffect, useState } from "react";
import { menuItems as initialMenu } from "@/lib/site-data";
import { loadAdminItems } from "@/lib/storage";

export default function MenuPage() {
  const [menu, setMenu] = useState(initialMenu);

  useEffect(() => {
    setMenu(loadAdminItems("homerestaurant-menu", initialMenu));
  }, []);

  const grouped = {
    daily: menu.filter((item) => item.category === "daily"),
    weekly: menu.filter((item) => item.category === "weekly"),
    monthly: menu.filter((item) => item.category === "monthly"),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Menu</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Daily meals, weekly menus, and monthly plans</h1>
        <p className="mt-4 text-lg text-slate-600">The menu is admin-managed so HomeRestaurant can quickly adjust offerings for families, offices, and corporate clients.</p>
      </div>

      <div className="mt-10 space-y-12">
        {Object.entries(grouped).map(([key, items]) => (
          <section key={key}>
            <h2 className="text-2xl font-semibold capitalize text-slate-900">{key} meals</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
                  <img src={item.image} alt={item.name} className="h-44 w-full rounded-2xl object-cover" />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
