"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download, Plus, Search, Filter, Edit, Copy, MoreHorizontal,
  Star, FileText, Clock, Zap, Smile, ChevronLeft, ChevronRight,
  Eye, Bookmark,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type TemplateCategory = "Positive" | "Negative" | "General" | "Feedback" | "Follow Up" | "Referral" | "Apology" | "Welcome";
type TemplateVisibility = "Public" | "Private";

interface Template {
  id: string;
  name: string;
  preview: string;
  body: string;
  category: TemplateCategory;
  language: string;
  flag: string;
  used: number;
  updatedAt: string;
  isFavorite: boolean;
  visibility: TemplateVisibility;
  variables: string[];
  avgRating: number;
  repliesSent: number;
}

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_TEMPLATES: Template[] = [
  { id: "t1", name: "Thank You (Positive)", preview: "Thank you so much for your kind words! 😊 We...", body: "Thank you so much for your kind words! 😊\nWe're thrilled to hear that you had a great experience with us.\n\nYour feedback truly motivates our team to keep delivering the best service possible.\n\nWe look forward to serving you again soon!", category: "Positive", language: "English", flag: "🇺🇸", used: 128, updatedAt: "2 days ago",  isFavorite: true,  visibility: "Public",  variables: ["Customer Name", "Business Name", "Review Source"], avgRating: 4.8, repliesSent: 128 },
  { id: "t2", name: "Address Concern (Negative)", preview: "We're truly sorry to hear about your experience....", body: "We're truly sorry to hear about your experience and sincerely apologise for the inconvenience caused.\n\nYour feedback is very important to us and we'd love the opportunity to make things right. Please reach out to us directly so we can resolve this.", category: "Negative", language: "English", flag: "🇺🇸", used: 86, updatedAt: "3 days ago",  isFavorite: false, visibility: "Public",  variables: ["Customer Name", "Business Name"], avgRating: 4.5, repliesSent: 86 },
  { id: "t3", name: "General Response", preview: "Thank you for sharing your feedback with us....", body: "Thank you for sharing your feedback with us. We truly appreciate you taking the time to let us know about your experience. Your insights help us improve every day!", category: "General", language: "English", flag: "🇺🇸", used: 45, updatedAt: "5 days ago",  isFavorite: true,  visibility: "Public",  variables: ["Customer Name"], avgRating: 4.2, repliesSent: 45 },
  { id: "t4", name: "Service Feedback", preview: "We appreciate you taking the time to leave...", body: "We appreciate you taking the time to leave us a review! Our team works hard every day to provide excellent service, and your feedback helps us know where we can do even better.", category: "Feedback", language: "English", flag: "🇺🇸", used: 32, updatedAt: "1 week ago",  isFavorite: false, visibility: "Private", variables: ["Customer Name", "Service Type"], avgRating: 4.3, repliesSent: 32 },
  { id: "t5", name: "Follow Up", preview: "We wanted to follow up and see if everything...", body: "We wanted to follow up and see if everything was resolved to your satisfaction. If you have any further concerns, please don't hesitate to reach out to us directly.", category: "Follow Up", language: "English", flag: "🇺🇸", used: 18, updatedAt: "1 week ago",  isFavorite: false, visibility: "Private", variables: ["Customer Name", "Issue Type"], avgRating: 4.0, repliesSent: 18 },
  { id: "t6", name: "Referral Thank You", preview: "Thank you for referring us! 🎉 We truly value...", body: "Thank you for referring us! 🎉 We truly value your trust and loyalty. Referrals from valued customers like you mean everything to our team. We look forward to serving your friends and family!", category: "Referral", language: "English", flag: "🇺🇸", used: 12, updatedAt: "2 weeks ago", isFavorite: true,  visibility: "Public",  variables: ["Customer Name", "Referred Name"], avgRating: 4.7, repliesSent: 12 },
  { id: "t7", name: "Apology Response", preview: "We sincerely apologize for the inconvenience...", body: "We sincerely apologize for the inconvenience you experienced. This falls far below our usual standards and we are taking immediate steps to ensure this does not happen again. We would love a chance to make it up to you.", category: "Apology", language: "English", flag: "🇺🇸", used: 9, updatedAt: "2 weeks ago", isFavorite: false, visibility: "Public",  variables: ["Customer Name", "Issue Description"], avgRating: 4.4, repliesSent: 9 },
  { id: "t8", name: "First Time Customer", preview: "Welcome! 🎉 We're so happy to have you...", body: "Welcome! 🎉 We're so happy to have you as a customer! We hope your first experience with us was everything you expected. We can't wait to see you again and make every visit even better.", category: "Welcome", language: "English", flag: "🇺🇸", used: 8, updatedAt: "3 weeks ago", isFavorite: true,  visibility: "Private", variables: ["Customer Name", "Business Name"], avgRating: 4.6, repliesSent: 8 },
];

const CATEGORY_STYLES: Record<TemplateCategory, string> = {
  Positive:  "bg-green-50 text-green-700 border-green-200",
  Negative:  "bg-red-50 text-red-600 border-red-200",
  General:   "bg-gray-50 text-gray-600 border-gray-200",
  Feedback:  "bg-blue-50 text-blue-700 border-blue-200",
  "Follow Up": "bg-violet-50 text-violet-700 border-violet-200",
  Referral:  "bg-orange-50 text-orange-700 border-orange-200",
  Apology:   "bg-rose-50 text-rose-700 border-rose-200",
  Welcome:   "bg-teal-50 text-teal-700 border-teal-200",
};

// ─── Main Component ───────────────────────────────────────────
export function TemplatesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Template>(MOCK_TEMPLATES[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const filtered = MOCK_TEMPLATES.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    const matchTab =
      activeTab === "all" ||
      (activeTab === "public" && t.visibility === "Public") ||
      (activeTab === "private" && t.visibility === "Private") ||
      (activeTab === "favorites" && t.isFavorite);
    return matchSearch && matchTab;
  });

  const counts = {
    all: MOCK_TEMPLATES.length,
    public: MOCK_TEMPLATES.filter(t => t.visibility === "Public").length,
    private: MOCK_TEMPLATES.filter(t => t.visibility === "Private").length,
    favorites: MOCK_TEMPLATES.filter(t => t.isFavorite).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
            <p className="text-gray-500 text-sm mt-0.5">Create and manage your AI reply templates to save time and maintain consistency.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 text-gray-700 border-gray-200">
              <Download className="h-4 w-4" />Import Template
            </Button>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="h-4 w-4" />New Template
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <FileText className="h-6 w-6 text-violet-600" />, bg: "bg-violet-50", label: "Total Templates",  value: "24",        sub: "↑ 20% vs last month" },
            { icon: <Star className="h-6 w-6 text-amber-500" />,      bg: "bg-amber-50",  label: "Most Used",        value: "Thank You",  sub: "Used 128 times" },
            { icon: <Zap className="h-6 w-6 text-blue-600" />,        bg: "bg-blue-50",   label: "Replies Sent",     value: "298",        sub: "↑ 18.7% vs last month" },
            { icon: <Smile className="h-6 w-6 text-green-600" />,     bg: "bg-green-50",  label: "Time Saved",       value: "12.4 hrs",   sub: "This month" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>{s.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex gap-5">

          {/* Table panel */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Tabs + search */}
            <div className="border-b border-gray-100">
              <div className="px-4 pt-3 flex items-center justify-between gap-4 flex-wrap">
                <Tabs value={activeTab} onValueChange={v => { setActiveTab(v); setCurrentPage(1); }}>
                  <TabsList className="h-auto bg-transparent p-0 gap-0">
                    {[
                      { value: "all",      label: `All Templates (${counts.all})` },
                      { value: "public",   label: `Public (${counts.public})` },
                      { value: "private",  label: `Private (${counts.private})` },
                      { value: "favorites",label: `Favorites (${counts.favorites})` },
                    ].map(tab => (
                      <TabsTrigger key={tab.value} value={tab.value}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-none bg-transparent px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2 pb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search templates..." className="pl-9 h-8 text-sm border-gray-200 bg-gray-50 w-48" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 text-gray-700 border-gray-200"><Filter className="h-3.5 w-3.5" />Filter</Button>
                  <div className="relative">
                    <select className="h-8 pl-2 pr-7 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none">
                      <option>Sort by</option><option>Most Used</option><option>Recently Updated</option>
                    </select>
                    <svg className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-violet-600" /></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Template Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Used</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(t => (
                    <tr key={t.id}
                      onClick={() => setSelected(t)}
                      className={`cursor-pointer transition-colors ${selected.id === t.id ? "bg-violet-50/60" : "hover:bg-gray-50/60"}`}>
                      <td className="px-4 py-3.5" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-gray-300 text-violet-600" /></td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[260px]">{t.preview}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_STYLES[t.category]}`}>{t.category}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span>{t.flag}</span>
                          <span className="text-sm text-gray-600">{t.language}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{t.used}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{t.updatedAt}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Edit className="h-4 w-4" /></button>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700"><Copy className="h-4 w-4" /></button>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 1 to 8 of 24 templates</p>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 disabled:opacity-40" disabled><ChevronLeft className="h-4 w-4" /></button>
                {[1,2,3].map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`min-w-[32px] h-8 px-2 rounded-md text-sm font-medium ${currentPage === p ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>{p}</button>
                ))}
                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"><ChevronRight className="h-4 w-4" /></button>
                <div className="ml-2 relative">
                  <select className="h-8 pl-2 pr-7 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none"><option>10 / page</option></select>
                  <svg className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right preview panel */}
          <div className="w-72 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{selected.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border mt-1 inline-block ${CATEGORY_STYLES[selected.category]}`}>{selected.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                <button className="text-gray-400 hover:text-amber-400 transition-colors"><Bookmark className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template</p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line border border-gray-100">
                  {selected.body}
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">{selected.body.length} characters</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Variables</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.variables.map(v => (
                    <span key={v} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">{v}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template Stats</p>
                <div className="space-y-2">
                  {[
                    { label: "Used", value: `${selected.used} times` },
                    { label: "Last Used", value: selected.updatedAt },
                    { label: "Average Rating", value: <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{selected.avgRating.toFixed(1)}</span> },
                    { label: "Replies Sent", value: selected.repliesSent },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{s.label}</span>
                      <span className="text-xs font-semibold text-gray-800 flex items-center">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-gray-700 border-gray-200">
                <Eye className="h-3.5 w-3.5" />Preview
              </Button>
              <Button size="sm" className="flex-1 gap-1.5 bg-violet-600 hover:bg-violet-700 text-white">
                <Edit className="h-3.5 w-3.5" />Edit Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
