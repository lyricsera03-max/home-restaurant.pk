"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts as initialBlogs, faqItems as initialFaqs, menuItems as initialMenu } from "@/lib/site-data";
import { loadAdminItems, loadLeads, saveAdminItems, saveLeads, saveFaqItems, loadFaqItems } from "@/lib/storage";
import { calculateLeadStats } from "@/lib/lead-stats";

export default function AdminPage() {
  const [leads, setLeads] = useState(() => loadLeads());
  const [menu, setMenu] = useState(() => loadAdminItems("homerestaurant-menu", initialMenu));
  const [blogs, setBlogs] = useState(() => loadAdminItems("homerestaurant-blogs", initialBlogs));
  const [faqs, setFaqs] = useState(() => loadFaqItems() as typeof initialFaqs);
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "menu" | "blogs" | "faq">("dashboard");
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    category: "daily" as "daily" | "weekly" | "monthly",
    image: "",
    isTodaySpecial: false,
  });
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    seoTitle: "",
    metaDescription: "",
    published: false,
  });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });
  const [menuImageDragActive, setMenuImageDragActive] = useState(false);

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read file"));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleMenuImageFile = async (file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      setMenuForm((current) => ({ ...current, image: dataUrl }));
    } catch {
      // ignore invalid files
    }
  };

  const handleMenuImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      void handleMenuImageFile(event.target.files[0]);
    }
  };

  const handleMenuDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuImageDragActive(false);

    if (event.dataTransfer.files?.[0]) {
      void handleMenuImageFile(event.dataTransfer.files[0]);
    }
  };

  const handleMenuDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuImageDragActive(true);
  };

  const handleMenuDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuImageDragActive(false);
  };

  useEffect(() => {
    saveLeads(leads);
  }, [leads]);

  useEffect(() => {
    saveAdminItems("homerestaurant-menu", menu);
  }, [menu]);

  useEffect(() => {
    saveAdminItems("homerestaurant-blogs", blogs);
  }, [blogs]);

  useEffect(() => {
    saveFaqItems(faqs);
  }, [faqs]);

  const stats = useMemo(() => calculateLeadStats(leads), [leads]);

  const toggleLead = (id: string) => {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, contacted: !lead.contacted } : lead)));
  };

  const archiveLead = (id: string) => {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, archived: !lead.archived } : lead)));
  };

  const addMenuItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!menuForm.name.trim() || !menuForm.description.trim()) {
      return;
    }

    const newItem = {
      id: `menu-${Date.now()}`,
      name: menuForm.name.trim(),
      description: menuForm.description.trim(),
      category: menuForm.category,
      image: menuForm.image || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      isTodaySpecial: menuForm.isTodaySpecial,
    };

    setMenu((current) => [newItem, ...current]);
    setMenuForm({ name: "", description: "", category: "daily", image: "", isTodaySpecial: false });
  };

  const updateMenuItem = (id: string, field: "name" | "description" | "category" | "image" | "isTodaySpecial", value: string | boolean) => {
    setMenu((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleUpdateMenuImage = async (id: string, file: File) => {
    try {
      const dataUrl = await fileToDataUrl(file);
      updateMenuItem(id, "image", dataUrl);
    } catch {
      // ignore invalid files
    }
  };

  const deleteMenuItem = (id: string) => {
    setMenu((current) => current.filter((item) => item.id !== id));
  };

  const addBlog = (event: React.FormEvent) => {
    event.preventDefault();
    if (!blogForm.title.trim() || !blogForm.slug.trim()) {
      return;
    }

    const newBlog = {
      id: `blog-${Date.now()}`,
      title: blogForm.title.trim(),
      slug: blogForm.slug.trim(),
      excerpt: blogForm.excerpt.trim() || "Add an excerpt",
      content: blogForm.content.trim() || "Add content",
      featuredImage: blogForm.featuredImage || "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
      seoTitle: blogForm.seoTitle.trim() || blogForm.title.trim(),
      metaDescription: blogForm.metaDescription.trim() || blogForm.excerpt.trim() || "Write a meta description",
      published: blogForm.published,
    };

    setBlogs((current) => [newBlog, ...current]);
    setBlogForm({ title: "", slug: "", excerpt: "", content: "", featuredImage: "", seoTitle: "", metaDescription: "", published: false });
  };

  const addFaq = (event: React.FormEvent) => {
    event.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      return;
    }

    setFaqs((current) => [{ id: `faq-${Date.now()}`, question: faqForm.question.trim(), answer: faqForm.answer.trim() }, ...current]);
    setFaqForm({ question: "", answer: "" });
  };

  const updateFaq = (id: string, field: "question" | "answer", value: string) => {
    setFaqs((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteFaq = (id: string) => {
    setFaqs((current) => current.filter((item) => item.id !== id));
  };

  const updateBlogPost = (id: string, field: "title" | "slug" | "excerpt" | "content" | "featuredImage" | "seoTitle" | "metaDescription" | "published", value: string | boolean) => {
    setBlogs((current) => current.map((post) => (post.id === id ? { ...post, [field]: value } : post)));
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((current) => current.filter((post) => post.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Admin</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Lead generation dashboard</h1>
          <p className="mt-4 text-lg text-slate-600">Track leads, menus, and blogs from a lightweight admin experience designed for the MVP.</p>
        </div>
        <Link href="/" className="text-sm font-semibold text-amber-700">View public site</Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["dashboard", "leads", "menu", "blogs", "faq"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === tab ? "bg-amber-600 text-white" : "bg-white text-slate-700"}`}>
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total leads</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">New leads</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.newLeads}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total blogs</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{blogs.length}</p>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total menus</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{menu.length}</p>
          </div>
        </div>
      )}

      {activeTab === "leads" && (
        <div className="mt-8 space-y-4">
          {leads.filter((lead) => !lead.archived).map((lead) => (
            <div key={lead.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{lead.name}</p>
                  <p className="text-sm text-slate-600">{lead.company || "General inquiry"}</p>
                  <p className="text-sm text-slate-600">{lead.phone} • {lead.email || "No email"}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => toggleLead(lead.id)} className="rounded-full border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-700">
                    {lead.contacted ? "Mark pending" : "Mark contacted"}
                  </button>
                  <button onClick={() => archiveLead(lead.id)} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                    {lead.archived ? "Restore" : "Archive"}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-slate-700">{lead.message}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{lead.type} • {new Date(lead.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "menu" && (
        <div className="mt-8 space-y-6">
          <form onSubmit={addMenuItem} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Add menu item</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input required placeholder="Meal name" value={menuForm.name} onChange={(event) => setMenuForm({ ...menuForm, name: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <select value={menuForm.category} onChange={(event) => setMenuForm({ ...menuForm, category: event.target.value as "daily" | "weekly" | "monthly" })} className="rounded-2xl border border-slate-200 px-4 py-3">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <textarea required placeholder="Description" rows={3} value={menuForm.description} onChange={(event) => setMenuForm({ ...menuForm, description: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" />
              <input placeholder="Image URL" value={menuForm.image} onChange={(event) => setMenuForm({ ...menuForm, image: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <div
                onDrop={handleMenuDrop}
                onDragOver={handleMenuDragOver}
                onDragLeave={handleMenuDragLeave}
                className={`rounded-2xl border border-dashed px-4 py-6 text-center text-sm text-slate-500 ${menuImageDragActive ? "border-amber-500 bg-amber-50" : "border-slate-200 bg-slate-50"}`}
              >
                <input id="menu-image-file" type="file" accept="image/*" onChange={handleMenuImageInput} className="hidden" />
                <label htmlFor="menu-image-file" className="cursor-pointer">
                  Drop an image here, or <span className="font-semibold text-amber-700">browse files</span>
                </label>
                {menuForm.image ? (
                  <img src={menuForm.image} alt="Menu preview" className="mx-auto mt-4 h-36 w-full max-w-xs rounded-2xl object-cover" />
                ) : null}
              </div>
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={menuForm.isTodaySpecial} onChange={(event) => setMenuForm({ ...menuForm, isTodaySpecial: event.target.checked })} />
                Mark as today&apos;s special
              </label>
            </div>
            <button type="submit" className="mt-4 rounded-full bg-amber-600 px-5 py-2 font-semibold text-white">Save menu item</button>
          </form>
          <div className="grid gap-6 md:grid-cols-2">
            {menu.map((item) => (
              <div key={item.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                  <button onClick={() => deleteMenuItem(item.id)} className="text-sm font-semibold text-rose-600">Delete</button>
                </div>
                <input value={item.name} onChange={(event) => updateMenuItem(item.id, "name", event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <textarea value={item.description} onChange={(event) => updateMenuItem(item.id, "description", event.target.value)} rows={3} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <select value={item.category} onChange={(event) => updateMenuItem(item.id, "category", event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <input value={item.image} onChange={(event) => updateMenuItem(item.id, "image", event.target.value)} placeholder="Image URL" className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <div className="mt-3">
                  <label className="mb-2 block text-sm font-medium text-slate-700">Upload new image</label>
                  <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && void handleUpdateMenuImage(item.id, event.target.files[0])} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700" />
                </div>
                {item.image ? (
                  <img src={item.image} alt={`${item.name} preview`} className="mt-3 h-44 w-full rounded-2xl object-cover" />
                ) : null}
                <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={item.isTodaySpecial ?? false} onChange={(event) => updateMenuItem(item.id, "isTodaySpecial", event.target.checked)} />
                  Today&apos;s special
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "blogs" && (
        <div className="mt-8 space-y-6">
          <form onSubmit={addBlog} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Add blog post</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input required placeholder="Title" value={blogForm.title} onChange={(event) => setBlogForm({ ...blogForm, title: event.target.value, seoTitle: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <input required placeholder="Slug" value={blogForm.slug} onChange={(event) => setBlogForm({ ...blogForm, slug: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <textarea placeholder="Excerpt" rows={3} value={blogForm.excerpt} onChange={(event) => setBlogForm({ ...blogForm, excerpt: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" />
              <textarea placeholder="Content" rows={4} value={blogForm.content} onChange={(event) => setBlogForm({ ...blogForm, content: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" />
              <input placeholder="Featured image URL" value={blogForm.featuredImage} onChange={(event) => setBlogForm({ ...blogForm, featuredImage: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <input placeholder="SEO title" value={blogForm.seoTitle} onChange={(event) => setBlogForm({ ...blogForm, seoTitle: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <input placeholder="Meta description" value={blogForm.metaDescription} onChange={(event) => setBlogForm({ ...blogForm, metaDescription: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" />
              <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={blogForm.published} onChange={(event) => setBlogForm({ ...blogForm, published: event.target.checked })} />
                Publish immediately
              </label>
            </div>
            <button type="submit" className="mt-4 rounded-full bg-amber-600 px-5 py-2 font-semibold text-white">Save blog post</button>
          </form>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((post) => (
              <div key={post.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                  <button onClick={() => deleteBlogPost(post.id)} className="text-sm font-semibold text-rose-600">Delete</button>
                </div>
                <input value={post.title} onChange={(event) => updateBlogPost(post.id, "title", event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <input value={post.slug} onChange={(event) => updateBlogPost(post.id, "slug", event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <textarea value={post.excerpt} onChange={(event) => updateBlogPost(post.id, "excerpt", event.target.value)} rows={3} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <textarea value={post.content} onChange={(event) => updateBlogPost(post.id, "content", event.target.value)} rows={4} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <input value={post.featuredImage} onChange={(event) => updateBlogPost(post.id, "featuredImage", event.target.value)} placeholder="Featured image URL" className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <input value={post.seoTitle} onChange={(event) => updateBlogPost(post.id, "seoTitle", event.target.value)} placeholder="SEO title" className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <input value={post.metaDescription} onChange={(event) => updateBlogPost(post.id, "metaDescription", event.target.value)} placeholder="Meta description" className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={post.published} onChange={(event) => updateBlogPost(post.id, "published", event.target.checked)} />
                  Published
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="mt-8 space-y-6">
          <form onSubmit={addFaq} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Add FAQ</h2>
            <div className="mt-4 grid gap-4">
              <input required placeholder="Question" value={faqForm.question} onChange={(event) => setFaqForm({ ...faqForm, question: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
              <textarea required placeholder="Answer" rows={3} value={faqForm.answer} onChange={(event) => setFaqForm({ ...faqForm, answer: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3" />
            </div>
            <button type="submit" className="mt-4 rounded-full bg-amber-600 px-5 py-2 font-semibold text-white">Save FAQ</button>
          </form>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{item.question}</h3>
                  <button onClick={() => deleteFaq(item.id)} className="text-sm font-semibold text-rose-600">Delete</button>
                </div>
                <input value={item.question} onChange={(event) => updateFaq(item.id, "question", event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
                <textarea value={item.answer} onChange={(event) => updateFaq(item.id, "answer", event.target.value)} rows={3} className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
