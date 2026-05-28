"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Star,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  CornerUpLeft,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  BarChart2,
} from "lucide-react";

// ---------- Types ----------
export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  platform: "Google" | "Facebook";
  reviewDate: string;
  isAnswered: boolean;
  status?: "Replied" | "Pending" | "Unread";
}

interface ReviewsPageProps {
  reviews?: Review[];
}

// ---------- Mock data ----------
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    text: "Absolutely love this place! The food was incredible and the service was top-notch. Will definitely be coming back again soon.",
    rating: 5,
    platform: "Google",
    reviewDate: "2024-05-20",
    isAnswered: true,
    status: "Replied",
  },
  {
    id: "2",
    author: "Michael Chen",
    text: "Great atmosphere but the wait time was a bit long. The pasta was delicious though.",
    rating: 4,
    platform: "Facebook",
    reviewDate: "2024-05-18",
    isAnswered: false,
    status: "Pending",
  },
  {
    id: "3",
    author: "Emily Rodriguez",
    text: "Disappointing experience. The staff was rude and the food arrived cold. Expected much better for the price.",
    rating: 2,
    platform: "Google",
    reviewDate: "2024-05-17",
    isAnswered: false,
    status: "Unread",
  },
  {
    id: "4",
    author: "David Park",
    text: "One of the best restaurants I have visited in the city. The ambiance is perfect for a romantic dinner.",
    rating: 5,
    platform: "Google",
    reviewDate: "2024-05-15",
    isAnswered: true,
    status: "Replied",
  },
  {
    id: "5",
    author: "Jessica Thompson",
    text: "Average food, nothing special. The dessert was okay but overpriced compared to similar places nearby.",
    rating: 3,
    platform: "Facebook",
    reviewDate: "2024-05-14",
    isAnswered: true,
    status: "Replied",
  },
  {
    id: "6",
    author: "Robert Williams",
    text: "Fantastic service! Our server Maria was so attentive and the chef even came out to greet us. Highly recommend.",
    rating: 5,
    platform: "Google",
    reviewDate: "2024-05-12",
    isAnswered: true,
    status: "Replied",
  },
  {
    id: "7",
    author: "Amanda Foster",
    text: "Cozy spot with decent food. Parking can be tricky on weekends. The brunch menu is worth trying.",
    rating: 4,
    platform: "Facebook",
    reviewDate: "2024-05-10",
    isAnswered: false,
    status: "Unread",
  },
  {
    id: "8",
    author: "James Mitchell",
    text: "Terrible hygiene standards. Found a hair in my soup and the management was dismissive when I complained.",
    rating: 1,
    platform: "Google",
    reviewDate: "2024-05-08",
    isAnswered: false,
    status: "Pending",
  },
];

// ---------- Helpers ----------
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Google") {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[8px] font-bold text-blue-600">
          G
        </div>
        <span className="text-xs text-gray-500">Google</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-4 h-4 rounded-full bg-blue-700 flex items-center justify-center text-[8px] font-bold text-white">
        f
      </div>
      <span className="text-xs text-gray-500">Facebook</span>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (status === "Replied") {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-xs font-medium">
        Replied
      </Badge>
    );
  }
  if (status === "Pending") {
    return (
      <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50 text-xs font-medium">
        Pending
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50 text-xs font-medium">
      Unread
    </Badge>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return `${Math.floor(diff / 30)}mo ago`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

// ---------- Stats Card ----------
function StatCard({
  icon: Icon,
  label,
  value,
  change,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {change} vs last month
        </p>
      </div>
      <div className={`p-2.5 rounded-lg ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export function ReviewsPage({ reviews = MOCK_REVIEWS }: ReviewsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      !searchQuery ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform =
      platformFilter === "All" || r.platform === platformFilter;
    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && r.status === "Unread") ||
      (activeTab === "replied" && r.status === "Replied") ||
      (activeTab === "negative" && r.rating <= 2);
    return matchesSearch && matchesPlatform && matchesStatus && matchesTab;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const unreadCount = reviews.filter((r) => r.status === "Unread").length;
  const repliedCount = reviews.filter((r) => r.status === "Replied").length;
  const negativeCount = reviews.filter((r) => r.rating <= 2).length;

  // Build page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 2)
        pages.push(currentPage);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and respond to customer reviews from all your connected
              platforms.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 text-gray-700 border-gray-200"
            >
              <Download className="h-4 w-4" />
              Export Reviews
            </Button>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="h-4 w-4" />
              Add Review
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={MessageSquare}
            label="Total Reviews"
            value="356"
            change="+18.2%"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={Star}
            label="Avg Rating"
            value="4.6"
            change="+0.3"
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />
          <StatCard
            icon={CheckCircle}
            label="Replied Reviews"
            value="298"
            change="+24.7%"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={BarChart2}
            label="Response Rate"
            value="92%"
            change="+11.3%"
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reviews, customers..."
                className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Platform dropdown */}
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => {
                  setPlatformFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="All">All Platforms</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>

            {/* Ratings dropdown */}
            <div className="relative">
              <select className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
                <option>2 Stars</option>
                <option>1 Star</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="All">All Status</option>
                <option value="Replied">Replied</option>
                <option value="Pending">Pending</option>
                <option value="Unread">Unread</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>

            {/* Date range */}
            <div className="relative">
              <select className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 text-gray-700 border-gray-200"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tabs + Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v);
              setCurrentPage(1);
            }}
          >
            <div className="border-b border-gray-100 px-4">
              <TabsList className="h-auto bg-transparent p-0 gap-0">
                {[
                  { value: "all", label: `All Reviews (${reviews.length})` },
                  { value: "unread", label: `Unread (${unreadCount})` },
                  { value: "replied", label: `Replied (${repliedCount})` },
                  { value: "negative", label: `Negative (${negativeCount})` },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-none bg-transparent px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {["all", "unread", "replied", "negative"].map((tabVal) => (
              <TabsContent key={tabVal} value={tabVal} className="m-0">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-50">
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Review
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Platform
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paginated.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="text-center py-12 text-gray-400 text-sm"
                          >
                            No reviews found.
                          </td>
                        </tr>
                      ) : (
                        paginated.map((review, idx) => (
                          <tr
                            key={review.id}
                            className="hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="px-4 py-3.5">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                              />
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar className="h-8 w-8 shrink-0">
                                  <AvatarFallback
                                    className={`text-xs font-semibold ${
                                      AVATAR_COLORS[idx % AVATAR_COLORS.length]
                                    }`}
                                  >
                                    {getInitials(review.author)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                  {review.author}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 max-w-[260px]">
                              <p className="text-sm text-gray-600 truncate">
                                {review.text}
                              </p>
                            </td>
                            <td className="px-4 py-3.5">
                              <StarDisplay rating={review.rating} />
                            </td>
                            <td className="px-4 py-3.5">
                              <PlatformIcon platform={review.platform} />
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm text-gray-500 whitespace-nowrap">
                                {formatDate(review.reviewDate)}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={review.status} />
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                                  <CornerUpLeft className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium text-gray-700">
                      {filtered.length === 0
                        ? 0
                        : (currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-700">
                      {Math.min(currentPage * pageSize, filtered.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-700">
                      {filtered.length}
                    </span>{" "}
                    reviews
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageNumbers().map((page, i) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${i}`}
                          className="px-2 text-gray-400 text-sm"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          className={`min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-violet-600 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <div className="ml-2 relative">
                      <select className="h-8 pl-2 pr-7 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500">
                        <option>10 / page</option>
                        <option>25 / page</option>
                        <option>50 / page</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
                        <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
