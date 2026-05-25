import type { WebsiteIssue, StylePreference, Feature, BudgetRange, Timeline, WebsiteType, AiRanking, InvestmentReady } from "./types";

// Each map returns a translation key consumed by the `t()` function in components.

export const websiteIssueKeys: Record<WebsiteIssue, string> = {
  outdated_design: "websiteIssue.outdated_design",
  not_mobile_friendly: "websiteIssue.not_mobile_friendly",
  slow_loading: "websiteIssue.slow_loading",
  poor_seo: "websiteIssue.poor_seo",
  no_clients: "websiteIssue.no_clients",
  hard_to_update: "websiteIssue.hard_to_update",
  bad_ux: "websiteIssue.bad_ux",
  unprofessional: "websiteIssue.unprofessional",
  other: "websiteIssue.other",
};

export const stylePreferenceKeys: Record<StylePreference, string> = {
  modern_premium: "stylePreference.modern_premium",
  minimal_clean: "stylePreference.minimal_clean",
  corporate: "stylePreference.corporate",
  luxury: "stylePreference.luxury",
  creative: "stylePreference.creative",
  futuristic: "stylePreference.futuristic",
  bold: "stylePreference.bold",
};

export const featureKeys: Record<Feature, string> = {
  booking: "feature.booking",
  contact_forms: "feature.contact_forms",
  payments: "feature.payments",
  portfolio: "feature.portfolio",
  reviews: "feature.reviews",
  ai_chatbot: "feature.ai_chatbot",
  automations: "feature.automations",
  multilingual: "feature.multilingual",
  seo: "feature.seo",
  client_portal: "feature.client_portal",
  other: "feature.other",
};

export const budgetKeys: Record<BudgetRange, string> = {
  "0-500": "budget.0-500",
  "500-1000": "budget.500-1000",
  "1000-2000": "budget.1000-2000",
  "2000-5000": "budget.2000-5000",
  "5000+": "budget.5000+",
};

export const timelineKeys: Record<Timeline, string> = {
  asap: "timeline.asap",
  "1_month": "timeline.1_month",
  "3_months": "timeline.3_months",
  exploring: "timeline.exploring",
};

export const websiteTypeKeys: Record<WebsiteType, { title: string; desc: string }> = {
  hardcoded: { title: "websiteType.hardcoded.title", desc: "websiteType.hardcoded.desc" },
  cms: { title: "websiteType.cms.title", desc: "websiteType.cms.desc" },
  unsure: { title: "websiteType.unsure.title", desc: "websiteType.unsure.desc" },
};

export const aiRankingKeys: Record<AiRanking, string> = {
  yes: "funnel.yes",
  no: "funnel.no",
  unsure: "aiRanking.unsure",
};

export const investmentReadyKeys: Record<InvestmentReady, string> = {
  yes: "funnel.yes",
  maybe: "investment.maybe",
  no: "funnel.no",
};

// Backwards-compatible label exports kept as English fallbacks (only for non-UI usage)
export const websiteIssueLabels = websiteIssueKeys;
export const stylePreferenceLabels = stylePreferenceKeys;
export const featureLabels = featureKeys;
export const budgetLabels = budgetKeys;
export const timelineLabels = timelineKeys;
export const aiRankingLabels = aiRankingKeys;
export const investmentReadyLabels = investmentReadyKeys;
