export type Plan = "FREE" | "STARTER" | "GROWTH";
export type Platform = "GOOGLE" | "ZOMATO" | "SWIGGY";
export type CampaignType = "EMAIL" | "WHATSAPP";
export type AlertType = "WHATSAPP_NEGATIVE" | "EMAIL_DIGEST";

export interface ReviewWithReply {
  id: string;
  googleReviewId: string | null;
  author: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string | null;
  platform: Platform;
  reviewDate: string;
  isAnswered: boolean;
  businessId: string;
  reply?: {
    id: string;
    aiGeneratedText: string;
    finalText: string | null;
    postedAt: string | null;
  } | null;
}

export interface DashboardStats {
  totalReviews: number;
  avgRating: number;
  repliedPercent: number;
  newThisMonth: number;
}

export interface Business {
  id: string;
  name: string;
  category: string | null;
  location: string | null;
  googleLocationId: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  plan: Plan;
  aiRepliesUsed: number;
  onboardingCompleted: boolean;
}
