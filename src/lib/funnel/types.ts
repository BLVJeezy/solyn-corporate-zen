export type WebsiteIssue =
  | "outdated_design"
  | "not_mobile_friendly"
  | "slow_loading"
  | "poor_seo"
  | "no_clients"
  | "hard_to_update"
  | "bad_ux"
  | "unprofessional"
  | "other";

export type StylePreference =
  | "modern_premium"
  | "minimal_clean"
  | "corporate"
  | "luxury"
  | "creative"
  | "futuristic"
  | "bold";

export type WebsiteType = "hardcoded" | "cms" | "unsure";
export type AiRanking = "yes" | "no" | "unsure";
export type InvestmentReady = "yes" | "maybe" | "no";

export type Feature =
  | "booking"
  | "contact_forms"
  | "payments"
  | "portfolio"
  | "reviews"
  | "ai_chatbot"
  | "automations"
  | "multilingual"
  | "seo"
  | "client_portal"
  | "other";

export type BudgetRange =
  | "0-500"
  | "500-1000"
  | "1000-2000"
  | "2000-5000"
  | "5000+";

export type Timeline = "asap" | "1_month" | "3_months" | "exploring";

export type ReferralSource = "google" | "facebook" | "instagram" | "ai" | "word_of_mouth" | "other";
export type SpokenLanguage = "nl" | "fr" | "en" | "other";

export interface FunnelState {
  // Step 1
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  business_description: string;
  preferred_language: SpokenLanguage | "";
  referral_source: ReferralSource | "";

  // Step 2
  has_website: boolean | null;
  website_url: string;
  website_issues: WebsiteIssue[];
  website_keep: string;
  style_inspiration: string;
  style_preference: StylePreference[];

  // Step 3
  avoid_text: string;
  website_type: WebsiteType | "";
  seo_important: boolean | null;
  ai_ranking: AiRanking | "";
  features_needed: Feature[];

  // Step 4
  budget_range: BudgetRange | "";
  launch_timeline: Timeline | "";
  investment_ready: InvestmentReady | "";
}

export const INITIAL_STATE: FunnelState = {
  full_name: "",
  business_name: "",
  email: "",
  phone: "",
  business_description: "",
  preferred_language: "",
  referral_source: "",
  has_website: null,
  website_url: "",
  website_issues: [],
  website_keep: "",
  style_inspiration: "",
  style_preference: [],
  avoid_text: "",
  website_type: "",
  seo_important: null,
  ai_ranking: "",
  features_needed: [],
  budget_range: "",
  launch_timeline: "",
  investment_ready: "",
};

export function isQualified(s: FunnelState): { qualified: boolean; reason?: string } {
  if (s.budget_range === "0-500" || s.budget_range === "500-1000") {
    return { qualified: false, reason: "budget_below_threshold" };
  }
  if (s.investment_ready === "no") {
    return { qualified: false, reason: "not_investment_ready" };
  }
  if (s.launch_timeline === "exploring") {
    return { qualified: false, reason: "just_exploring" };
  }
  return { qualified: true };
}
