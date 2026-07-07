import type { WorkCategory } from "@/store/WorkStore";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<WorkCategory, "All">;
  thumbnail: string; // placeholder image path
  videoPreview?: string; // placeholder video path, optional
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Glow Skincare — UGC Sprint",
    client: "Glow Skincare",
    category: "AI UGC Ads",
    thumbnail: "/work/placeholder-1.jpg",
  },
  {
    id: "p2",
    title: "Nectar — Funnel VSL",
    client: "Nectar Supplements",
    category: "VSL Production",
    thumbnail: "/work/placeholder-2.jpg",
  },
  {
    id: "p3",
    title: "Flowstate — Product Walkthrough",
    client: "Flowstate SaaS",
    category: "SaaS Animations",
    thumbnail: "/work/placeholder-3.jpg",
  },
  {
    id: "p4",
    title: "Ridge — Meta Scaling Set",
    client: "Ridge Apparel",
    category: "Meta/TikTok Ads",
    thumbnail: "/work/placeholder-4.jpg",
  },
  {
    id: "p5",
    title: "Nova — Brand Motion System",
    client: "Nova Audio",
    category: "Motion Graphics",
    thumbnail: "/work/placeholder-5.jpg",
  },
  {
    id: "p6",
    title: "Peak — TikTok Ad Batch",
    client: "Peak Nutrition",
    category: "Meta/TikTok Ads",
    thumbnail: "/work/placeholder-6.jpg",
  },
];

export const SERVICES = [
  {
    title: "AI UGC Ads",
    description:
      "AI-generated creators, scripted and edited to feel native to the feed — built for hook-rate and thumb-stop speed.",
  },
  {
    title: "VSL Production",
    description:
      "Long-form video sales letters structured for retention and conversion, paced for the offer, not for attention alone.",
  },
  {
    title: "SaaS Animations",
    description:
      "Product walkthroughs and motion systems that make complex software feel simple in under 30 seconds.",
  },
  {
    title: "Meta/TikTok Ads",
    description:
      "Performance-first paid social edits, tested in batches, optimized for CPA — not just watch time.",
  },
  {
    title: "Motion Graphics",
    description:
      "Kinetic type, brand systems, and animated logos that carry an identity across every format.",
  },
  {
    title: "Brand Campaigns",
    description:
      "Multi-format campaign edits that keep a single creative idea consistent across every placement.",
  },
];

export const PROCESS_STEPS = [
  {
    label: "Discovery",
    description: "We map the offer, the audience, and what's already converting — before touching a single clip.",
  },
  {
    label: "Planning",
    description: "Scripts, shot lists, and a structural blueprint for pacing, hooks, and CTA placement.",
  },
  {
    label: "Editing",
    description: "Frame-accurate cuts, sound design, and pacing tuned to the platform it's built for.",
  },
  {
    label: "Motion Graphics",
    description: "Kinetic type, overlays, and brand-consistent motion layered on top of the edit.",
  },
  {
    label: "Delivery",
    description: "Platform-ready exports, versioned for testing, delivered on schedule — every time.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Our hook rate doubled in the first batch. This is the first editor who actually understood performance, not just craft.",
    name: "Sarah Chen",
    role: "Growth Lead, Glow Skincare",
  },
  {
    quote:
      "We stopped briefing every single edit. They just know what converts for our audience now.",
    name: "Marcus Webb",
    role: "Founder, Ridge Apparel",
  },
  {
    quote:
      "The VSL restructure alone paid for six months of retainer in the first week.",
    name: "Priya Patel",
    role: "CMO, Nectar Supplements",
  },
];