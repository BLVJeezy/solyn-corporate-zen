import type { WebsiteIssue, StylePreference, Feature, BudgetRange, Timeline, WebsiteType, AiRanking, InvestmentReady } from "./types";

export const websiteIssueLabels: Record<WebsiteIssue, string> = {
  outdated_design: "Outdated design",
  not_mobile_friendly: "Not mobile friendly",
  slow_loading: "Slow loading speed",
  poor_seo: "Poor Google ranking",
  no_clients: "Doesn't generate clients",
  hard_to_update: "Difficult to update",
  bad_ux: "Bad user experience",
  unprofessional: "Unprofessional appearance",
  other: "Other",
};

export const stylePreferenceLabels: Record<StylePreference, string> = {
  modern_premium: "Modern & premium",
  minimal_clean: "Minimal & clean",
  corporate: "Corporate & professional",
  luxury: "Luxury",
  creative: "Creative",
  futuristic: "Futuristic / tech",
  bold: "Bold & high-converting",
};

export const featureLabels: Record<Feature, string> = {
  booking: "Appointment booking",
  contact_forms: "Contact forms",
  payments: "Online payments",
  portfolio: "Portfolio",
  reviews: "Reviews",
  ai_chatbot: "AI chatbot",
  automations: "Automations",
  multilingual: "Multilingual support",
  seo: "SEO optimization",
  client_portal: "Client login portal",
  other: "Other",
};

export const budgetLabels: Record<BudgetRange, string> = {
  "0-500": "€0 – €500",
  "500-1000": "€500 – €1.000",
  "1000-2000": "€1.000 – €2.000",
  "2000-5000": "€2.000 – €5.000",
  "5000+": "€5.000+",
};

export const timelineLabels: Record<Timeline, string> = {
  asap: "ASAP",
  "1_month": "Within 1 month",
  "3_months": "Within 3 months",
  exploring: "Just exploring options",
};

export const websiteTypeLabels: Record<WebsiteType, { title: string; desc: string }> = {
  hardcoded: { title: "Hardcoded Premium Website", desc: "Ultra-fast, secure and optimized website managed by the developer." },
  cms: { title: "Website With Admin Panel / CMS", desc: "Ability to edit your own text, photos and pages." },
  unsure: { title: "Not sure yet", desc: "We'll guide you to the right choice during the call." },
};

export const aiRankingLabels: Record<AiRanking, string> = {
  yes: "Yes",
  no: "No",
  unsure: "I'm not sure",
};

export const investmentReadyLabels: Record<InvestmentReady, string> = {
  yes: "Yes",
  maybe: "Maybe",
  no: "No",
};
