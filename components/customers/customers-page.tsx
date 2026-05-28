"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Download, Plus, Search, Filter, Star,
  MessageSquare, MoreHorizontal, ChevronLeft, ChevronRight,
  Users, UserCheck, TrendingUp, Activity, Eye,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
type CustomerStatus = "Active" | "Inactive" | "New";
type CustomerBadge = "VIP Customer" | "Regular";

interface Customer {
  id: string;
  name: string;
  badge: CustomerBadge;
  email: string;
  phone: string;
  totalReviews: number;
  avgRating: number;
  lastReview: string;
  lastReviewDate: string;
  status: CustomerStatus;
}

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_CUSTOMERS: Customer[] = [
  { id: "cu1", name: "Rahul Sharma",  badge: "VIP Customer", email: "rahul.sharma@email.com",  phone: "+91 98765 43210", totalReviews: 8,  avgRating: 4.8, lastReview: "2 days ago",  lastReviewDate: "May 26, 2024", status: "Active"   },
  { id: "cu2", name: "Priya Mehta",   badge: "Regular",      email: "priya.mehta@email.com",   phone: "+91 91234 56789", totalReviews: 5,  avgRating: 4.2, lastReview: "5 days ago",  lastReviewDate: "May 23, 2024", status: "Active"   },
  { id: "cu3", name: "Amit Patel",    badge: "VIP Customer", email: "amit.patel@email.com",    phone: "+91 99887 76655", totalReviews: 12, avgRating: 4.9, lastReview: "1 day ago",   lastReviewDate: "May 27, 2024", status: "Active"   },
  { id: "cu4", name: "Sneha Iyer",    badge: "Regular",      email: "sneha.iyer@email.com",    phone: "+91 90000 11122", totalReviews: 3,  avgRating: 3.7, lastReview: "10 days ago", lastReviewDate: "May 18, 2024", status: "Inactive" },
  { id: "cu5", name: "Vikram Singh",  badge: "Regular",      email: "vikram.singh@email.com",  phone: "+91 87654 32109", totalReviews: 6,  avgRating: 4.0, lastReview: "7 days ago",  lastReviewDate: "May 21, 2024", status: "Active"   },
  { id: "cu6", name: "Neha Kapoor",   badge: "VIP Customer", email: "neha.kapoor@email.com",   phone: "+91 94567 89012", totalReviews: 9,  avgRating: 4.6, lastReview: "3 days ago",  lastReviewDate: "May 25, 2024", status: "Active"   },
  { id: "cu7", name: "Karan Verma",   badge: "Regular",      email: "karan.verma@email.com",   phone: "+91 92345 67890", totalReviews: 2,  avgRating: 3.0, lastReview: "15 days ago", lastReviewDate: "May 12, 2024", status: "Inactive" },
  { id: "cu8", name: "Anjali Desai",  badge: "Regular",      email: "anjali.desai@email.com",  phone: "+91 88888 99999", totalReviews: 4,  avgRating: 4.3, lastReview: "6 days ago",  lastReviewDate: "May 22, 2024", status: "Active"   },
];

const OVERVIEW_DATA = [
  { name: "VIP Customers", value: 58,  color: "#6366f1" },
  { name: "Regular",       value: 142, color: "#3b82f6" },
  { name: "Inactive",      value: 32,  color: "#22c55e" },
  { name: "New",           value: 16,  color: "#f59e0b" },
];

const RECENT_ACTIVITY = [
  { id: 1, icon: "G", iconBg: "bg-blue-100", text: "Rahul Sharma left a review",      time: "2 days ago" },
  { id: 2, icon: "★", iconBg: "bg-violet-100", text: "Priya Mehta received a reply",  time: "3 days ago" },
  { id: 3, icon: "+", iconBg: "bg-green-100",  text: "New customer added Aman Gupta", time: "5 days ago" },
];

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ icon, iconBg, label, value, change }: {
  icon: React.ReactNode; iconBg: string; label: string; value: string; change: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
          <TrendingUp className="h-3 w-3" />{change}
        </p>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: CustomerStatus }) {
  const map: Record<CustomerStatus, string> = {
    Active:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    Inactive: "bg-gray-50 text-gray-500 border-gray-200",
    New:      "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${map[status]}`}>{status}</span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────
function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="text-sm font-medium text-gray-700">{value.toFixed(1)}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [groupFilter, setGroupFilter] = useState("All Groups");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchGroup = groupFilter === "All Groups" || c.badge === groupFilter;
    return matchSearch && matchStatus && matchGroup;
  });

  const topCustomers = [...MOCK_CUSTOMERS].sort((a, b) => b.totalReviews - a.totalReviews).slice(0, 5);
  const totalPages = 31;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your customers and track their review activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 text-gray-700 border-gray-200">
              <Download className="h-4 w-4" />Import Customers
            </Button>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="h-4 w-4" />Add Customer
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users className="h-6 w-6 text-violet-600" />}    iconBg="bg-violet-50"  label="Total Customers"  value="248" change="↑ 16.5% vs Apr 1 – Apr 30" />
          <StatCard icon={<UserCheck className="h-6 w-6 text-green-600" />} iconBg="bg-green-50"   label="Active Customers" value="198" change="↑ 18.7% vs Apr 1 – Apr 30" />
          <StatCard icon={<MessageSquare className="h-6 w-6 text-orange-500" />} iconBg="bg-orange-50" label="Total Reviews" value="356" change="↑ 18.2% vs Apr 1 – Apr 30" />
          <StatCard icon={<Activity className="h-6 w-6 text-blue-600" />}   iconBg="bg-blue-50"    label="Replies Sent"     value="298" change="↑ 24.7% vs Apr 1 – Apr 30" />
        </div>

        {/* Main content: Table + Right panel */}
        <div className="flex gap-5">

          {/* Table panel */}
          <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, email or phone..."
                  className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div className="relative">
                <select value={groupFilter} onChange={e => setGroupFilter(e.target.value)}
                  className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>All Groups</option>
                  <option>VIP Customer</option>
                  <option>Regular</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" /></svg>
              </div>
              <div className="relative">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="h-9 pl-3 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>New</option>
                </select>
                <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" /></svg>
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-700 border-gray-200">
                <Filter className="h-4 w-4" />Filter
              </Button>
              <button className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                <Download className="h-4 w-4" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-violet-600" /></th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Reviews</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Average Rating</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Review</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((c, idx) => (
                    <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3.5"><input type="checkbox" className="rounded border-gray-300 text-violet-600" /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className={`text-xs font-semibold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                              {getInitials(c.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${c.badge === "VIP Customer" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                              {c.badge}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-gray-700">{c.email}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.phone}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{c.totalReviews}</td>
                      <td className="px-4 py-3.5"><StarRating value={c.avgRating} /></td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-gray-700">{c.lastReview}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.lastReviewDate}</p>
                      </td>
                      <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"><Eye className="h-4 w-4" /></button>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"><MessageSquare className="h-4 w-4" /></button>
                          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 1 to 8 of 248 customers</p>
              <div className="flex items-center gap-1">
                <button disabled className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
                {[1,2,3,4,5,"...",31].map((p, i) => (
                  <button key={i} onClick={() => typeof p === "number" && setCurrentPage(p)}
                    className={`min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${currentPage === p ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                    {p}
                  </button>
                ))}
                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"><ChevronRight className="h-4 w-4" /></button>
                <div className="ml-2 relative">
                  <select className="h-8 pl-2 pr-7 text-sm border border-gray-200 rounded-md bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>10 / page</option><option>25 / page</option><option>50 / page</option>
                  </select>
                  <svg className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-72 shrink-0 space-y-4">

            {/* Donut chart */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Overview</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-28 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={OVERVIEW_DATA} cx="50%" cy="50%" innerRadius={32} outerRadius={50} dataKey="value" paddingAngle={2}>
                        {OVERVIEW_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => [v, ""]} contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">248</span>
                    <span className="text-xs text-gray-400">Total</span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1">
                  {OVERVIEW_DATA.map(d => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                      <span className="text-xs text-gray-600 flex-1 truncate">{d.name}</span>
                      <span className="text-xs font-semibold text-gray-800">{d.value} <span className="text-gray-400 font-normal">({Math.round(d.value/248*100)}%)</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top customers */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Customers <span className="text-gray-400 font-normal">(by reviews)</span></h3>
              <div className="space-y-2.5">
                {topCustomers.map((c, i) => (
                  <div key={c.id} className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className={`text-xs font-semibold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>{getInitials(c.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 flex-1 truncate">{c.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{c.totalReviews}</span>
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-xs font-bold text-gray-600 flex items-center justify-center">{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-xs text-violet-600 font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map(a => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${a.iconBg} flex items-center justify-center text-xs font-bold shrink-0`}>{a.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
