"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  MapPin, Plus, Star, MessageSquare, CheckCircle2,
  TrendingUp, Settings2, ExternalLink, Building2, Globe,
  BarChart2, ChevronRight, Plug, Edit2, Trash2, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Location {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  totalReviews: number;
  avgRating: number;
  replyRate: number;
  newThisMonth: number;
  platforms: { name: string; connected: boolean; reviews: number }[];
  status: "active" | "inactive";
  isMain: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const INITIAL_LOCATIONS: Location[] = [
  {
    id: "loc1", name: "Sharma's Kitchen", category: "Restaurant",
    address: "24 Connaught Place", city: "New Delhi",
    totalReviews: 142, avgRating: 4.3, replyRate: 67, newThisMonth: 18,
    platforms: [
      { name: "Google", connected: true, reviews: 118 },
      { name: "Yelp", connected: true, reviews: 24 },
      { name: "TripAdvisor", connected: false, reviews: 0 },
    ],
    status: "active", isMain: true,
  },
  {
    id: "loc2", name: "Sharma's Kitchen — Lajpat Nagar",
    category: "Restaurant", address: "12 Central Market", city: "New Delhi",
    totalReviews: 78, avgRating: 4.1, replyRate: 54, newThisMonth: 9,
    platforms: [
      { name: "Google", connected: true, reviews: 78 },
      { name: "Yelp", connected: false, reviews: 0 },
      { name: "TripAdvisor", connected: false, reviews: 0 },
    ],
    status: "active", isMain: false,
  },
  {
    id: "loc3", name: "Sharma's Kitchen — Cyber City",
    category: "Restaurant", address: "DLF Phase 2", city: "Gurugram",
    totalReviews: 34, avgRating: 4.5, replyRate: 82, newThisMonth: 6,
    platforms: [
      { name: "Google", connected: true, reviews: 34 },
      { name: "Yelp", connected: false, reviews: 0 },
      { name: "TripAdvisor", connected: true, reviews: 12 },
    ],
    status: "active", isMain: false,
  },
];

function RatingBar({ rating, max = 5 }: { rating: number; max?: number }) {
  const stars = [5, 4, 3, 2, 1];
  const counts = [68, 22, 8, 5, 1]; // mock distribution
  const total = counts.reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-1">
      {stars.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="text-xs text-gray-500 w-3">{s}</span>
          <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(counts[i] / total) * 100}%` }} />
          </div>
          <span className="text-xs text-gray-400 w-5 text-right">{counts[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Add Location Modal ───────────────────────────────────────────────────────
function AddLocationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", category: "Restaurant", address: "", city: "" });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-violet-600" />Add New Location
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-4">
          {[
            { key: "name", label: "Business Name", placeholder: "Sharma's Kitchen — Noida" },
            { key: "address", label: "Address", placeholder: "Sector 18, Noida" },
            { key: "city", label: "City", placeholder: "Noida" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">{f.label}</label>
              <input
                value={form[f.key as keyof typeof form]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full text-sm rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 px-4 py-2.5 outline-none transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full text-sm rounded-xl border border-gray-200 focus:border-violet-400 px-4 py-2.5 outline-none bg-white"
            >
              {["Restaurant", "Cafe", "Hotel", "Retail", "Salon", "Healthcare", "Fitness", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white gap-2" onClick={onClose}>
            <Plus className="h-4 w-4" />Add Location
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function LocationsPage() {
  const [locations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [view, setView] = useState<"grid" | "compare">("grid");

  const selected = locations.find((l) => l.id === selectedId);
  const totalReviews = locations.reduce((s, l) => s + l.totalReviews, 0);
  const avgRating = (locations.reduce((s, l) => s + l.avgRating, 0) / locations.length).toFixed(1);

  const PLATFORM_LOGOS: Record<string, React.ReactNode> = {
    Google: <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
    Yelp: <div className="w-4 h-4 bg-red-600 rounded flex items-center justify-center"><span className="text-white font-black text-xs" style={{fontFamily:"Georgia,serif"}}>y</span></div>,
    TripAdvisor: <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"><span className="text-white font-bold text-xs leading-none">T</span></div>,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {showAdd && <AddLocationModal onClose={() => setShowAdd(false)} />}
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              Locations
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage all your business locations from one dashboard.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden text-xs font-medium">
              {(["grid", "compare"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-2 capitalize transition-colors ${view === v ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  {v}
                </button>
              ))}
            </div>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAdd(true)}>
              <Plus className="h-4 w-4" />Add Location
            </Button>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-1">
          {[
            { label: "Locations", value: String(locations.length), sub: "active", bg: "bg-indigo-50", col: "text-indigo-600", icon: MapPin },
            { label: "Total Reviews", value: String(totalReviews), sub: "across all locations", bg: "bg-violet-50", col: "text-violet-600", icon: MessageSquare },
            { label: "Network Rating", value: `${avgRating}★`, sub: "combined avg", bg: "bg-amber-50", col: "text-amber-600", icon: Star },
            { label: "Best Location", value: "Cyber City", sub: "4.5★ avg · 82% reply", bg: "bg-emerald-50", col: "text-emerald-600", icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 stat-card-3d">
              <div className={`p-2.5 rounded-lg ${s.bg} shrink-0`}><s.icon className={`h-5 w-5 ${s.col}`} /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 stagger-2">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden card-3d cursor-pointer transition-all ${selectedId === loc.id ? "border-indigo-400 ring-2 ring-indigo-200" : "border-gray-100 hover:border-gray-200"}`}
                onClick={() => setSelectedId(selectedId === loc.id ? null : loc.id)}
              >
                {/* Card header */}
                <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{loc.name}</h3>
                        {loc.isMain && <Badge className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200 h-5">Main</Badge>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{loc.address}, {loc.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-5 pb-3 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Reviews", value: String(loc.totalReviews) },
                    { label: "Rating", value: `${loc.avgRating}★` },
                    { label: "Reply %", value: `${loc.replyRate}%` },
                  ].map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-xl py-2.5">
                      <p className="text-base font-bold text-gray-900">{s.value}</p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Platforms */}
                <div className="px-5 pb-4 flex items-center gap-2 flex-wrap">
                  {loc.platforms.map((p) => (
                    <span key={p.name} className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${p.connected ? "border-gray-200 bg-gray-50 text-gray-700" : "border-dashed border-gray-200 text-gray-400"}`}>
                      {PLATFORM_LOGOS[p.name]}
                      {p.connected ? `${p.reviews} reviews` : "Not connected"}
                    </span>
                  ))}
                </div>

                {/* Expanded detail */}
                {selectedId === loc.id && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-indigo-50/40 space-y-3 animate-fade-in">
                    <RatingBar rating={loc.avgRating} />
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white h-8 gap-1.5">
                        <ExternalLink className="h-3.5 w-3.5" />View Dashboard
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8 gap-1.5">
                        <Settings2 className="h-3.5 w-3.5" />Manage
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add location card */}
            <button
              onClick={() => setShowAdd(true)}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold">Add Location</p>
            </button>
          </div>
        )}

        {/* Compare view */}
        {view === "compare" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden stagger-2">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Location Comparison</h2>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: "Total Reviews", key: "totalReviews" as const, max: 150 },
                { label: "Avg Rating (× 20 for scale)", key: "avgRating" as const, max: 5, scale: 20 },
                { label: "Reply Rate", key: "replyRate" as const, max: 100 },
              ].map((metric) => (
                <div key={metric.label}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{metric.label}</p>
                  <div className="space-y-2.5">
                    {locations.map((loc, i) => {
                      const val = loc[metric.key] as number;
                      const scaledMax = metric.scale ? metric.max * metric.scale : metric.max;
                      const scaledVal = metric.scale ? val * metric.scale : val;
                      const pct = Math.round((scaledVal / scaledMax) * 100);
                      const colors = ["from-indigo-500 to-violet-500", "from-blue-500 to-indigo-400", "from-emerald-500 to-teal-400"];
                      return (
                        <div key={loc.id} className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 w-44 truncate">{loc.name.replace("Sharma's Kitchen — ", "").replace("Sharma's Kitchen", "Main Branch")}</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-lg overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${colors[i]} rounded-lg transition-all duration-700 flex items-center justify-end pr-2`} style={{ width: `${pct}%` }}>
                              <span className="text-xs text-white font-bold">{metric.key === "avgRating" ? val.toFixed(1) : val}{metric.key === "replyRate" ? "%" : ""}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
