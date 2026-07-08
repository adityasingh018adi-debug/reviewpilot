"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Settings,
  Zap,
  Globe,
  Star,
  Link2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

type IntegrationStatus = "connected" | "needs_attention" | "not_connected";

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: IntegrationStatus;
  logo: string;
  logoColor: string;
  reviews?: number;
  lastSync?: string;
  features: string[];
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const INTEGRATIONS: Integration[] = [
  {
    id: "google",
    name: "Google Business Profile",
    category: "Reviews",
    description: "Sync reviews from Google Maps and manage your business listing responses.",
    status: "connected",
    logo: "G",
    logoColor: "bg-blue-500",
    reviews: 128,
    lastSync: "2 mins ago",
    features: ["Auto-sync reviews", "Reply from dashboard", "Rating analytics"],
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "Social",
    description: "Collect and respond to Facebook page reviews and recommendations.",
    status: "connected",
    logo: "f",
    logoColor: "bg-indigo-600",
    reviews: 64,
    lastSync: "15 mins ago",
    features: ["Page reviews sync", "Recommendations", "Messenger integration"],
  },
  {
    id: "yelp",
    name: "Yelp",
    category: "Reviews",
    description: "Monitor Yelp reviews and respond to customer feedback in real-time.",
    status: "connected",
    logo: "Y",
    logoColor: "bg-red-500",
    reviews: 42,
    lastSync: "1 hr ago",
    features: ["Review monitoring", "Business owner replies", "Check-in offers"],
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    category: "Reviews",
    description: "Manage your Trustpilot score and respond to verified customer reviews.",
    status: "connected",
    logo: "T",
    logoColor: "bg-green-500",
    reviews: 89,
    lastSync: "30 mins ago",
    features: ["Verified reviews", "TrustScore tracking", "Invitation campaigns"],
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "Social",
    description: "Monitor Instagram mentions, tags, and comments about your business.",
    status: "needs_attention",
    logo: "In",
    logoColor: "bg-pink-500",
    reviews: 23,
    lastSync: "Token expired",
    features: ["Mention tracking", "Story replies", "Hashtag monitoring"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    description: "Send review requests and collect feedback via WhatsApp messages.",
    status: "connected",
    logo: "W",
    logoColor: "bg-green-600",
    reviews: 31,
    lastSync: "5 mins ago",
    features: ["Review requests", "Automated messages", "Business catalog"],
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    category: "Reviews",
    description: "Track TripAdvisor rankings and manage hospitality reviews.",
    status: "not_connected",
    logo: "TA",
    logoColor: "bg-emerald-600",
    features: ["Ranking tracker", "Review alerts", "Competitive analysis"],
  },
  {
    id: "openTable",
    name: "OpenTable",
    category: "Reservations",
    description: "Sync restaurant reservations and post-dining review collection.",
    status: "not_connected",
    logo: "OT",
    logoColor: "bg-orange-500",
    features: ["Reservation sync", "Post-dine reviews", "Guest feedback"],
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "E-commerce",
    description: "Collect product reviews and sync customer purchase data.",
    status: "not_connected",
    logo: "S",
    logoColor: "bg-green-700",
    features: ["Product reviews", "Order sync", "Customer data"],
  },
  {
    id: "slack",
    name: "Slack",
    category: "Notifications",
    description: "Get real-time review alerts and AI reply suggestions in Slack.",
    status: "not_connected",
    logo: "Sl",
    logoColor: "bg-violet-600",
    features: ["Review alerts", "Team notifications", "Quick actions"],
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    description: "Connect Reviewdot.in with 3000+ apps via Zapier automation.",
    status: "not_connected",
    logo: "Z",
    logoColor: "bg-orange-600",
    features: ["3000+ app integrations", "Custom workflows", "No-code automation"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    description: "Sync customer review data with your HubSpot CRM contacts.",
    status: "not_connected",
    logo: "H",
    logoColor: "bg-orange-500",
    features: ["CRM sync", "Contact enrichment", "Deal pipeline"],
  },
];

const STATS = [
  { label: "Total Integrations", value: "12", icon: Globe, color: "text-indigo-500" },
  { label: "Active", value: "8", icon: CheckCircle2, color: "text-green-500" },
  { label: "Needs Attention", value: "2", icon: AlertTriangle, color: "text-amber-500" },
  { label: "Available", value: "24", icon: Plus, color: "text-blue-500" },
];

const CATEGORIES = ["All", "Reviews", "Social", "Messaging", "Reservations", "E-commerce", "Notifications", "Automation", "CRM"];

const STATUS_CONFIG: Record<IntegrationStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  connected: { label: "Connected", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  needs_attention: { label: "Needs Attention", color: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  not_connected: { label: "Not Connected", color: "bg-gray-100 text-gray-600", icon: XCircle },
};

// ─── Main Component ────────────────────────────────────────────────────────────

export function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "connected" | "available">("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Integration | null>(INTEGRATIONS[0]);

  const filteredIntegrations = INTEGRATIONS.filter((int) => {
    const matchesSearch =
      int.name.toLowerCase().includes(search.toLowerCase()) ||
      int.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || int.category === activeCategory;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "connected" && (int.status === "connected" || int.status === "needs_attention")) ||
      (activeTab === "available" && int.status === "not_connected");
    return matchesSearch && matchesCategory && matchesTab;
  });

  const connectedCount = INTEGRATIONS.filter((i) => i.status === "connected").length;
  const needsAttentionCount = INTEGRATIONS.filter((i) => i.status === "needs_attention").length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="text-sm text-gray-500 mt-0.5">Connect your platforms and manage data flow</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync All
          </Button>
          <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-50`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs + Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex gap-1">
                {(["all", "connected", "available"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab === "all" && `All (${INTEGRATIONS.length})`}
                    {tab === "connected" && `Connected (${connectedCount + needsAttentionCount})`}
                    {tab === "available" && `Available`}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search integrations..."
                  className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto">
            {filteredIntegrations.map((integration) => {
              const statusCfg = STATUS_CONFIG[integration.status];
              const isSelected = selected?.id === integration.id;
              return (
                <button
                  key={integration.id}
                  onClick={() => setSelected(integration)}
                  className={`bg-white rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                    isSelected ? "border-indigo-400 shadow-md" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`${integration.logoColor} rounded-xl w-10 h-10 flex items-center justify-center text-white font-bold text-sm`}>
                        {integration.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{integration.name}</p>
                        <p className="text-xs text-gray-500">{integration.category}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    {integration.status !== "not_connected" && integration.reviews != null ? (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        <span>{integration.reviews} reviews</span>
                        {integration.lastSync && (
                          <span className="ml-1 text-gray-400">· {integration.lastSync}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Not connected</span>
                    )}
                    {integration.status === "needs_attention" && (
                      <span className="text-xs text-amber-600 font-medium">Reconnect</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        {selected && (
          <div className="w-80 flex flex-col gap-4">
            {/* Integration Detail */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${selected.logoColor} rounded-xl w-12 h-12 flex items-center justify-center text-white font-bold`}>
                  {selected.logo}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selected.name}</p>
                  <p className="text-sm text-gray-500">{selected.category}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 ${STATUS_CONFIG[selected.status].color}`}>
                {(() => {
                  const Ic = STATUS_CONFIG[selected.status].icon;
                  return <Ic className="h-4 w-4" />;
                })()}
                <span className="text-sm font-medium">{STATUS_CONFIG[selected.status].label}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{selected.description}</p>

              {/* Stats if connected */}
              {selected.status !== "not_connected" && selected.reviews != null && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{selected.reviews}</p>
                    <p className="text-xs text-gray-500">Reviews synced</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{selected.lastSync}</p>
                    <p className="text-xs text-gray-500">Last synced</p>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Features</p>
                <ul className="space-y-1.5">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {selected.status === "connected" && (
                  <>
                    <Button size="sm" variant="outline" className="w-full gap-2 justify-start">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="w-full gap-2 justify-start">
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </Button>
                    <Button size="sm" variant="outline" className="w-full gap-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Link2 className="h-4 w-4" />
                      Disconnect
                    </Button>
                  </>
                )}
                {selected.status === "needs_attention" && (
                  <>
                    <Button size="sm" className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white">
                      <RefreshCw className="h-4 w-4" />
                      Reconnect
                    </Button>
                    <Button size="sm" variant="outline" className="w-full gap-2 justify-start">
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
                  </>
                )}
                {selected.status === "not_connected" && (
                  <Button size="sm" className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4" />
                    Connect Now
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-indigo-600" />
                <p className="text-sm font-semibold text-indigo-800">Pro Tip</p>
              </div>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Connect multiple review platforms to get a unified view of all your customer feedback in one dashboard.
              </p>
              <button className="mt-2 text-xs text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800">
                Learn more <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
