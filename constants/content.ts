import type { WorkCategory } from "@/store/WorkStore";

export interface Project {
  id: string;
  title: string;
  category: Exclude<WorkCategory, "All">;
  youtubeId: string;
  isShort: boolean;
  format: string;
  industry: string;
  workCompleted: string;
  approach: string;
  deliverables: string;
}

export const PROJECTS: Project[] = [
  // AI Ads (3)
  {
    id: "ai1",
    title: "AI Avatar Advertisement",
    category: "AI Ads",
    youtubeId: "1GQ9WR2YNDc",
    isShort: true,
    format: "Short-form AI ad",
    industry: "Consumer product",
    workCompleted: "AI avatar scene editing, captions, sound design",
    approach: "Hook-first pacing with clear offer emphasis",
    deliverables: "Platform-ready vertical creative",
  },
  {
    id: "ai2",
    title: "AI Product Scene Creative",
    category: "AI Ads",
    youtubeId: "TLR7bKHRuGY",
    isShort: true,
    format: "AI-generated product ad",
    industry: "Ecommerce",
    workCompleted: "Scene assembly, product framing, motion polish",
    approach: "Fast visual changes built for thumb-stopping intros",
    deliverables: "Vertical paid-social ad",
  },
  {
    id: "ai3",
    title: "AI Creative Concept Ad",
    category: "AI Ads",
    youtubeId: "XNERf0BlVDI",
    isShort: true,
    format: "Concept-led AI ad",
    industry: "Digital offer",
    workCompleted: "Creative direction, AI visuals, edit structure",
    approach: "Offer-led storytelling with concise visual beats",
    deliverables: "Ad-ready short-form creative",
  },
  
  // UGC Ads (3)
  {
    id: "ugc1",
    title: "Skincare AI UGC Creative",
    category: "UGC Ads",
    youtubeId: "79ZKtpN_eJM",
    isShort: true,
    format: "UGC-style vertical ad",
    industry: "Skincare",
    workCompleted: "Hook edit, captions, pacing, product moments",
    approach: "Problem-aware opening with direct-response structure",
    deliverables: "Vertical ad creative with hook variation potential",
  },
  {
    id: "ugc2",
    title: "UGC Storytelling Ad",
    category: "UGC Ads",
    youtubeId: "7Y3P1_CUHvI",
    isShort: true,
    format: "UGC narrative creative",
    industry: "Consumer product",
    workCompleted: "Story edit, visual emphasis, caption design",
    approach: "Creator-style pacing with benefit-led messaging",
    deliverables: "Paid-social creative",
  },
  {
    id: "ugc3",
    title: "Direct-Response Meta Ad",
    category: "UGC Ads",
    youtubeId: "Q62JO0NRItE",
    isShort: true,
    format: "Direct-response UGC ad",
    industry: "Ecommerce",
    workCompleted: "Product demo edit, sound design, CTA polish",
    approach: "Demo-led flow with clear product proof points",
    deliverables: "Platform-ready ad",
  },
  
  // VSL (2)
  {
    id: "vsl1",
    title: "Ecommerce Product VSL",
    category: "VSL",
    youtubeId: "CWduyNyX0VA",
    isShort: true,
    format: "Video sales letter",
    industry: "Ecommerce",
    workCompleted: "Pacing, captions, product emphasis, CTA edit",
    approach: "Direct-response structure with concise scene progression",
    deliverables: "VSL edit for paid traffic",
  },
  {
    id: "vsl2",
    title: "Offer-Focused VSL Edit",
    category: "VSL",
    youtubeId: "XoWZDl_7sRs",
    isShort: true,
    format: "Short-form VSL",
    industry: "Digital product",
    workCompleted: "Script flow edit, captions, sound, visual emphasis",
    approach: "Message clarity and retention-focused pacing",
    deliverables: "Ad-ready VSL asset",
  },
  
  // Motion Graphics (4)
  {
    id: "mg1",
    title: "SaaS Motion Graphics Video",
    category: "Motion Graphics",
    youtubeId: "fkMel8Z5BHI",
    isShort: true,
    format: "Motion graphics ad",
    industry: "SaaS",
    workCompleted: "Kinetic type, animated callouts, visual rhythm",
    approach: "Feature explanation through fast, legible motion",
    deliverables: "Short-form motion creative",
  },
  {
    id: "mg2",
    title: "Product Explainer Animation",
    category: "Motion Graphics",
    youtubeId: "tYnAKzkivWM",
    isShort: true,
    format: "Product motion ad",
    industry: "Consumer product",
    workCompleted: "Product overlays, motion polish, caption treatment",
    approach: "Benefit-led animation for quick product understanding",
    deliverables: "Vertical motion creative",
  },
  {
    id: "mg3",
    title: "Branded Motion Sequence",
    category: "Motion Graphics",
    youtubeId: "IeVlxTVJ7mU",
    isShort: false,
    format: "Brand motion video",
    industry: "Digital brand",
    workCompleted: "Motion identity, transitions, layout animation",
    approach: "Premium visual pacing with consistent brand treatment",
    deliverables: "Landscape motion asset",
  },
  {
    id: "mg4",
    title: "App Feature Motion Ad",
    category: "Motion Graphics",
    youtubeId: "mABEX08JX2A",
    isShort: true,
    format: "Feature-led motion ad",
    industry: "Software product",
    workCompleted: "Transitions, interface motion, sound design",
    approach: "Fast feature comprehension with polished motion cues",
    deliverables: "Short-form ad creative",
  },
];

export const SERVICES = [
  {
    title: "AI UGC Ad Production",
    description:
      "Hook-first UGC-style creatives designed for Meta, TikTok, and other short-form placements.",
  },
  {
    title: "VSL Editing",
    description:
      "Direct-response VSL editing with pacing, captions, visual emphasis, sound design, and clear calls-to-action.",
  },
  {
    title: "Motion Graphics",
    description:
      "Product-focused animations, visual explanations, and branded motion graphics.",
  },
  {
    title: "AI Creative Production",
    description:
      "AI-generated visuals, avatars, voiceovers, product scenes, and creative concepts.",
  },
  {
    title: "Script and Hook Development",
    description:
      "Scripts, hooks, angles, and creative variations developed around the offer and target audience.",
  },
  {
    title: "White-Label Agency Support",
    description:
      "Confidential production support for agencies that need reliable overflow capacity.",
  },
];

export const PROCESS_STEPS = [
  {
    label: "Brief the Trial",
    description: "Share the offer, audience, references, and placement so we can define one focused creative project.",
  },
  {
    label: "Produce the Asset",
    description: "We develop the edit, hooks, captions, sound design, and platform-ready format for agency review.",
  },
  {
    label: "Review and Decide",
    description: "Use the trial to evaluate workflow, communication, and production fit before committing to ongoing support.",
  },
];

export const CAPABILITIES = [
  {
    title: "AI UGC & VSL Production",
    description: "Performance ad edits, AI-assisted scenes, captions, sound design, and direct-response pacing.",
  },
  {
    title: "White-Label Agency Support",
    description: "Confidential overflow production for agencies that need more creative capacity.",
  },
  {
    title: "Hook Variations & Creative Testing",
    description: "Opening angles, scripts, and edit variants prepared for your media buying team to test.",
  },
  {
    title: "Flexible Turnaround",
    description: "Project scopes can start with one trial asset and expand into recurring production support.",
  },
];

export const EXPERIENCE_POINTS = [
  "Real production experience",
  "Confidential brand work",
  "White-label agency support",
];

export const TRIAL_DELIVERABLES = [
  "One complete performance ad",
  "Three opening-hook variations",
  "Captions and sound design",
  "Platform-ready formatting",
  "Two revision rounds",
  "Clear delivery timeline",
];
