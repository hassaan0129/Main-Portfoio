import type { WorkCategory } from "@/store/WorkStore";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<WorkCategory, "All">;
  thumbnail: string;
  videoPreview?: string;
  metrics: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Glow Skincare — Hook Optimization",
    client: "Glow Skincare",
    category: "AI UGC Ads",
    thumbnail: "/work/placeholder-1.jpg",
    metrics: "Hook Rate: 52% | ROAS: 3.8x",
  },
  {
    id: "p2",
    title: "Nectar — Long-form Sales Letter",
    client: "Nectar Supplements",
    category: "VSL Editing",
    thumbnail: "/work/placeholder-2.jpg",
    metrics: "CPA: -$12.40 | LTV: +40%",
  },
  {
    id: "p3",
    title: "Nova Audio — Product Launch",
    client: "Nova Audio",
    category: "Motion Graphics",
    thumbnail: "/work/placeholder-3.jpg",
    metrics: "CTR: 4.1% | ROAS: 4.2x",
  },
  {
    id: "p4",
    title: "Ridge — AI Variant Testing",
    client: "Ridge Apparel",
    category: "AI UGC Ads",
    thumbnail: "/work/placeholder-4.jpg",
    metrics: "Hook Rate: 48% | CPA: -$8.50",
  },
  {
    id: "p5",
    title: "Flowstate SaaS — Offer Restructure",
    client: "Flowstate SaaS",
    category: "VSL Editing",
    thumbnail: "/work/placeholder-5.jpg",
    metrics: "Conversion: +2.4% | ROAS: 3.1x",
  },
  {
    id: "p6",
    title: "Peak — Brand Motion Identity",
    client: "Peak Nutrition",
    category: "Motion Graphics",
    thumbnail: "/work/placeholder-6.jpg",
    metrics: "CTR: 3.8% | Watch Time: 12s",
  },
];

export const SERVICES = [
  {
    title: "AI UGC Ads",
    description:
      "High-velocity ad variants engineered with AI tools. Scripted and edited for maximum hook rate, built to find your winning creative faster.",
  },
  {
    title: "VSL Editing",
    description:
      "Long-form video sales letters structured purely for conversion. We pace the edit for the offer, optimizing drop-off points to drive sales.",
  },
  {
    title: "Motion Graphics",
    description:
      "Kinetic typography, 3D product overlays, and seamless transitions that make complex offers easily digestible and visually premium.",
  },
];

export const PROCESS_STEPS = [
  {
    label: "Strategy & Scripting",
    description: "We audit your funnel, map your audience avatars, and script the angles before we ever touch a timeline.",
  },
  {
    label: "Editing & Iteration",
    description: "We build the core assets, layer motion graphics, and pace the edit to eliminate friction and maximize watch time.",
  },
  {
    label: "Scaling & Delivery",
    description: "We deliver platform-native variants designed for split-testing, giving your media buyers the ammo they need to scale.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Our hook rate doubled in the first batch. AGENZ drove our CPA down by 30% within two weeks of testing their UGC creatives.",
    name: "Sarah Chen",
    role: "Growth Lead, Glow Skincare",
  },
  {
    quote:
      "The VSL restructure was a gamechanger. They cut the fluff, paced the offer perfectly, and we saw a 3.2x ROAS on day one.",
    name: "Priya Patel",
    role: "CMO, Nectar Supplements",
  },
  {
    quote:
      "We stopped briefing them entirely. They just know exactly what converts for our demographic. Pure performance craft.",
    name: "Marcus Webb",
    role: "Founder, Ridge Apparel",
  },
];