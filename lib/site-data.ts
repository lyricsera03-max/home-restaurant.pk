export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: "daily" | "weekly" | "monthly";
  image: string;
  isTodaySpecial?: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  seoTitle: string;
  metaDescription: string;
  published: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "daily-1",
    name: "Chicken Karahi with Roti",
    description: "Rich, spicy karahi served with warm homemade roti and fresh salad.",
    category: "daily",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    isTodaySpecial: true,
  },
  {
    id: "weekly-1",
    name: "Beef Haleem Meal",
    description: "Slow-cooked haleem with crisp onions, lemon, and a side of naan.",
    category: "weekly",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "monthly-1",
    name: "Corporate Meal Plan",
    description: "A dependable meal plan for offices and night-shift teams with a rotating menu.",
    category: "monthly",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Homemade Food Delivery in Karachi",
    slug: "homemade-food-delivery-in-karachi",
    excerpt: "Why home-based meal services are gaining traction in Karachi for busy families and teams.",
    content:
      "HomeRestaurant brings fresh, homemade meals to Karachi residents who want comfort, hygiene, and reliability without the hassle of restaurant queues.",
    featuredImage: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Homemade Food Delivery in Karachi | HomeRestaurant",
    metaDescription: "Explore homemade food delivery in Karachi with fresh daily meals and office catering options.",
    published: true,
  },
  {
    id: "blog-2",
    title: "Night Shift Meal Service in Karachi",
    slug: "night-shift-meal-service-in-karachi",
    excerpt: "Reliable meal plans for night-shift offices, nursing teams, and call centers.",
    content:
      "Corporate clients value meals that are ready early, easy to portion, and satisfying through long shifts.",
    featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    seoTitle: "Night Shift Meal Service in Karachi | HomeRestaurant",
    metaDescription: "Discover dependable night shift meal service for Karachi offices and teams.",
    published: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amna S.",
    role: "Office Manager",
    quote: "The meals arrived fresh, the team loved them, and the ordering process was simple.",
  },
  {
    id: "t2",
    name: "Hassan R.",
    role: "Factory Supervisor",
    quote: "Their corporate meal plan helped us feed our staff without any delays.",
  },
];

export const corporateBenefits = [
  "Fresh homemade meals every day",
  "Flexible plans for offices and night shifts",
  "Hygienic preparation and dependable service",
  "Simple inquiries and quick follow-up",
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do you offer corporate meal plans?",
    answer: "Yes, we provide tailored meal plans for offices, factories, call centers, and night-shift teams.",
  },
  {
    id: "faq-2",
    question: "Do you deliver in Karachi?",
    answer: "Yes, we serve customers throughout Karachi and can arrange meal plans for regular and corporate clients.",
  },
];
