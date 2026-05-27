import type { ReviewWithReply, DashboardStats, Business } from "@/types";

export const MOCK_BUSINESS: Business = {
  id: "biz_demo",
  name: "Sharma's Kitchen",
  category: "Restaurant",
  location: "Connaught Place, New Delhi",
  googleLocationId: "accounts/123/locations/456",
};

export const MOCK_STATS: DashboardStats = {
  totalReviews: 142,
  avgRating: 4.3,
  repliedPercent: 67,
  newThisMonth: 18,
};

export const MOCK_REVIEWS: ReviewWithReply[] = [
  {
    id: "rev_1",
    googleReviewId: "g_rev_1",
    author: "Priya Sharma",
    authorPhotoUrl: null,
    rating: 5,
    text: "Absolutely loved the butter chicken here! The masala is perfectly balanced and the naan is so soft. Service was quick and the staff were very friendly. Will definitely come back!",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_1",
      aiGeneratedText:
        "Thank you so much, Priya ji! We're absolutely delighted you enjoyed the butter chicken and naan — those are our chef's pride. Your kind words truly mean the world to us, and we can't wait to welcome you back soon! 🙏",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_2",
    googleReviewId: "g_rev_2",
    author: "Rahul Verma",
    authorPhotoUrl: null,
    rating: 2,
    text: "Waited 45 minutes for our food and it came cold. The dal makhani was watery and had no flavour. Very disappointing for the price they charge. Not coming back.",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_2",
      aiGeneratedText:
        "Rahul ji, we sincerely apologise for this experience — long wait times and cold food is completely unacceptable and not our standard. We'd love a chance to make it right; please come back as our guest and I personally ensure your next visit will be everything you deserve.",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_3",
    googleReviewId: "g_rev_3",
    author: "Ananya Krishnan",
    authorPhotoUrl: null,
    rating: 5,
    text: "Best biryani in Delhi! We come here every Friday for family dinner. The portion sizes are generous and the biryani is aromatic with great dum cooking. Never disappointed!",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: true,
    businessId: "biz_demo",
    reply: {
      id: "rep_3",
      aiGeneratedText:
        "Ananya ji, your Friday visits make our week complete! We're so glad the biryani always hits the mark — our chef's dum technique is truly a labour of love. See you this Friday, and we'll make sure it's the best one yet!",
      finalText:
        "Ananya ji, your Friday visits make our week complete! We're so glad the biryani always hits the mark — our chef's dum technique is truly a labour of love. See you this Friday, and we'll make sure it's the best one yet!",
      postedAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: "rev_4",
    googleReviewId: "g_rev_4",
    author: "Mohammed Asif",
    authorPhotoUrl: null,
    rating: 1,
    text: "Worst experience ever. Found a hair in my food. When I complained the manager was rude and dismissive. Gave no refund or apology. Absolute hygiene disaster. Reporting to FSSAI.",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_4",
      aiGeneratedText:
        "Mohammed bhai, we are deeply sorry and mortified by what you experienced — this is absolutely not the standard we hold ourselves to, and the way you were treated when you raised the issue makes it even worse. Please WhatsApp us directly at [number] so we can personally address this and make it right.",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_5",
    googleReviewId: "g_rev_5",
    author: "Deepika Nair",
    authorPhotoUrl: null,
    rating: 4,
    text: "Really nice ambiance and the paneer dishes are great. The only thing is parking is a bit difficult on weekends. Otherwise food quality and service was good. 4 stars.",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_5",
      aiGeneratedText:
        "Thank you Deepika ji! We're glad you enjoyed the paneer dishes — our chef will be thrilled to hear that. Your feedback on weekend parking is noted; we're working on a solution with the nearby parking facility. Hope to see you again soon!",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_6",
    googleReviewId: "g_rev_6",
    author: "Karan Mehta",
    authorPhotoUrl: null,
    rating: 3,
    text: "Average experience. Food was okay but nothing memorable. The price is a bit high for what you get. Staff were polite though.",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_6",
      aiGeneratedText:
        "Karan ji, thank you for the honest feedback — we always want to know what we can do better. We'd love to earn that 5th star from you on your next visit; may we suggest trying our chef's special thali which is our best value dish?",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_7",
    googleReviewId: "g_rev_7",
    author: "Sunita Rao",
    authorPhotoUrl: null,
    rating: 5,
    text: "खाना बहुत अच्छा था! दाल मखनी और तंदूरी रोटी का स्वाद लाजवाब था। अगली बार ज़रूर आएंगे।",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: false,
    businessId: "biz_demo",
    reply: {
      id: "rep_7",
      aiGeneratedText:
        "सुनीता जी, आपके इन प्यारे शब्दों के लिए बहुत-बहुत शुक्रिया! 🙏 दाल मखनी और तंदूरी रोटी हमारे खास व्यंजन हैं और यह जानकर बहुत खुशी हुई कि आपको पसंद आए। आपका अगला आगमन और भी यादगार बनाएंगे!",
      finalText: null,
      postedAt: null,
    },
  },
  {
    id: "rev_8",
    googleReviewId: "g_rev_8",
    author: "Vikram Singh",
    authorPhotoUrl: null,
    rating: 5,
    text: "Came here for my wife's birthday dinner. The staff went above and beyond — they arranged a surprise dessert with a candle. Excellent food, excellent service. A true gem in Delhi!",
    platform: "GOOGLE",
    reviewDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    isAnswered: true,
    businessId: "biz_demo",
    reply: {
      id: "rep_8",
      aiGeneratedText:
        "Vikram ji, wishing your wife a very happy birthday from all of us! 🎂 It was our absolute pleasure to be part of this special occasion — those moments are why we do what we do. Both of you are always welcome here for every celebration!",
      finalText:
        "Vikram ji, wishing your wife a very happy birthday from all of us! 🎂 It was our absolute pleasure to be part of this special occasion — those moments are why we do what we do. Both of you are always welcome here for every celebration!",
      postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
];

// Analytics mock data
export const MOCK_RATING_TREND = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() - (11 - i));
  return {
    month: date.toLocaleString("en-IN", { month: "short" }),
    avgRating: +(3.8 + Math.random() * 1.0).toFixed(1),
    reviewCount: Math.floor(8 + Math.random() * 20),
  };
});

export const MOCK_SENTIMENT = [
  { name: "Positive", value: 68, color: "#22c55e" },
  { name: "Neutral", value: 19, color: "#f59e0b" },
  { name: "Negative", value: 13, color: "#ef4444" },
];

export const MOCK_TOP_KEYWORDS = [
  { word: "biryani", count: 34 },
  { word: "butter chicken", count: 28 },
  { word: "service", count: 22 },
  { word: "staff", count: 19 },
  { word: "ambiance", count: 16 },
  { word: "naan", count: 14 },
  { word: "price", count: 12 },
  { word: "parking", count: 8 },
  { word: "waiting", count: 7 },
  { word: "dal makhani", count: 6 },
];
