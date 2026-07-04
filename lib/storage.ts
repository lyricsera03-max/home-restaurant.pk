export type LeadEntry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  type: "contact" | "corporate";
  date: string;
  contacted: boolean;
  archived: boolean;
};

export function loadLeads(): LeadEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem("homerestaurant-leads");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveLeads(leads: LeadEntry[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("homerestaurant-leads", JSON.stringify(leads));
  }
}

export function loadAdminItems<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function loadFaqItems() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem("homerestaurant-faqs");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveFaqItems(items: unknown[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("homerestaurant-faqs", JSON.stringify(items));
  }
}

export function saveAdminItems<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
