"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/corporate-catering", label: "Corporate" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-slate-900">
      <header className="border-b border-amber-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-amber-700">
            HomeRestaurant
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex items-center rounded-full border border-amber-200 bg-white p-2 text-slate-700 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="text-lg">☰</span>
          </button>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive ? "text-amber-700" : "text-slate-700 hover:text-amber-700"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        {menuOpen && (
          <div className="border-t border-amber-200 bg-white px-4 py-4 md:hidden">
            <nav className="space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? "bg-amber-50 text-amber-700" : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-amber-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Fresh homemade meals for Karachi homes, offices, and night-shift teams.</p>
          <p>WhatsApp: +92 370 311 2964</p>
        </div>
      </footer>
    </div>
  );
}
