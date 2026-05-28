"use client";

import { useState } from "react";
import {
  Search, Filter, MoreHorizontal, Users, Shield, ChevronDown,
  Download, Plus, Copy, ArrowRight, Crown, UserCheck, UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberRole = "Owner" | "Admin" | "Manager" | "Reviewer" | "Viewer";
type MemberStatus = "Active" | "Pending";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedOn: string;
  lastActive: string;
  isYou?: boolean;
  invited?: boolean;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MEMBERS: TeamMember[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul.sharma@cafedelight.com", role: "Owner", status: "Active", joinedOn: "Jan 10, 2024", lastActive: "May 31, 2024\n10:30 AM", isYou: true },
  { id: "2", name: "Priya Mehta", email: "priya.mehta@cafedelight.com", role: "Admin", status: "Active", joinedOn: "Feb 12, 2024", lastActive: "May 31, 2024\n09:15 AM" },
  { id: "3", name: "Amit Patel", email: "amit.patel@cafedelight.com", role: "Manager", status: "Active", joinedOn: "Feb 18, 2024", lastActive: "May 30, 2024\n06:45 PM" },
  { id: "4", name: "Sneha Iyer", email: "sneha.iyer@cafedelight.com", role: "Reviewer", status: "Active", joinedOn: "Mar 05, 2024", lastActive: "May 31, 2024\n08:20 AM" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@cafedelight.com", role: "Reviewer", status: "Active", joinedOn: "Mar 12, 2024", lastActive: "May 30, 2024\n11:05 AM" },
  { id: "6", name: "Neha Kapoor", email: "neha.kapoor@cafedelight.com", role: "Reviewer", status: "Active", joinedOn: "Apr 02, 2024", lastActive: "May 29, 2024\n04:32 PM" },
  { id: "7", name: "Karan Verma", email: "karan.verma@cafedelight.com", role: "Viewer", status: "Active", joinedOn: "Apr 10, 2024", lastActive: "May 28, 2024\n03:10 PM" },
  { id: "8", name: "Anjali Desai", email: "anjali.desai@cafedelight.com", role: "Viewer", status: "Active", joinedOn: "Apr 22, 2024", lastActive: "May 27, 2024\n01:45 PM" },
  { id: "9", name: "Rohit Kumar (Invited)", email: "rohit.kumar@cafedelight.com", role: "Reviewer", status: "Pending", joinedOn: "May 31, 2024", lastActive: "—", invited: true },
];

const ROLE_CONFIG: Record<MemberRole, { color: string }> = {
  Owner: { color: "bg-purple-100 text-purple-700" },
  Admin: { color: "bg-blue-100 text-blue-700" },
  Manager: { color: "bg-green-100 text-green-700" },
  Reviewer: { color: "bg-sky-100 text-sky-700" },
  Viewer: { color: "bg-gray-100 text-gray-600" },
};

const ROLES_PERMISSIONS = [
  { role: "Owner" as MemberRole, desc: "Full access to all features and settings", count: 1, icon: "👑" },
  { role: "Admin" as MemberRole, desc: "Manage team, settings and billing", count: 2, icon: "🛡️" },
  { role: "Manager" as MemberRole, desc: "Manage reviews and team members", count: 1, icon: "📋" },
  { role: "Reviewer" as MemberRole, desc: "Create, edit and reply to reviews", count: 4, icon: "⭐" },
  { role: "Viewer" as MemberRole, desc: "View data and reports", count: 2, icon: "👁️" },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export function TeamPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const stats = [
    { label: "Total Members", value: "10", sub: "Across all roles", icon: Users, color: "bg-indigo-100 text-indigo-600" },
    { label: "Active Members", value: "9", sub: "Currently active", icon: UserCheck, color: "bg-green-100 text-green-600" },
    { label: "Pending Invites", value: "1", sub: "Awaiting acceptance", icon: UserPlus, color: "bg-amber-100 text-amber-600" },
    { label: "Roles", value: "4", sub: "Custom roles", icon: Crown, color: "bg-purple-100 text-purple-600" },
  ];

  const filtered = MEMBERS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All Roles" || m.role === roleFilter;
    const matchStatus = statusFilter === "All Status" || m.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your team members, roles, and permissions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Team
          </Button>
          <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm font-medium text-gray-700">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Filters */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search team members by name or email..."
                className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 h-9 border border-gray-200 rounded-lg px-3 bg-gray-50 cursor-pointer hover:bg-gray-100">
              <span className="text-sm text-gray-600">All Roles</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 h-9 border border-gray-200 rounded-lg px-3 bg-gray-50 cursor-pointer hover:bg-gray-100">
              <span className="text-sm text-gray-600">All Status</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-6 gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span className="col-span-2">Member</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined On</span>
            <span>Last Active</span>
          </div>

          {/* Rows */}
          {filtered.map((member) => (
            <div key={member.id} className="grid grid-cols-6 gap-3 px-4 py-3 items-center border-b border-gray-50 hover:bg-gray-50 transition-colors">
              {/* Member */}
              <div className="col-span-2 flex items-center gap-3">
                <Avatar className="h-9 w-9 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-sm font-semibold">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    {member.isYou && (
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-medium">You</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              {/* Role */}
              <div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ROLE_CONFIG[member.role].color}`}>
                  {member.role}
                </span>
              </div>

              {/* Status */}
              <div>
                <div className={`flex items-center gap-1.5 ${member.status === "Active" ? "text-green-600" : "text-amber-600"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${member.status === "Active" ? "bg-green-500" : "bg-amber-500"}`} />
                  <span className="text-sm font-medium">{member.status}</span>
                </div>
              </div>

              {/* Joined On */}
              <span className="text-sm text-gray-600">{member.joinedOn}</span>

              {/* Last Active + Actions */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 whitespace-pre-line">{member.lastActive}</span>
                <div className="flex items-center gap-1">
                  {member.invited && (
                    <Button size="sm" variant="ghost" className="text-xs text-indigo-600 h-7 px-2">Resend</Button>
                  )}
                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">Showing 1 to {filtered.length} of {MEMBERS.length} members</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400">‹</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-indigo-600 text-white text-sm font-medium">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600">›</button>
              </div>
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2.5 h-7">
                <span className="text-xs text-gray-600">10 / page</span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-72 space-y-4">
          {/* Invite New Member */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Invite New Member</h3>
            <p className="text-sm text-gray-500 mb-4">Invite people to your team and collaborate together.</p>
            <div className="space-y-3">
              <Input placeholder="Enter email address" className="h-9 text-sm" />
              <div className="h-9 border border-gray-200 rounded-lg flex items-center justify-between px-3 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <span className="text-sm text-gray-500">Select Role</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white" size="sm">
                <Plus className="h-4 w-4" />
                Send Invitation
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">Shareable Invite Link</p>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-xs text-indigo-600 truncate flex-1">https://app.reviewai.com/invite/abc123</span>
                <button className="flex-shrink-0 hover:bg-gray-200 p-1 rounded">
                  <Copy className="h-3.5 w-3.5 text-gray-500" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Anyone with the link can request to join.</p>
            </div>
          </div>

          {/* Roles & Permissions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Roles & Permissions</h3>
            <div className="space-y-3">
              {ROLES_PERMISSIONS.map((r) => (
                <div key={r.role} className="flex items-center gap-3">
                  <span className="text-base">{r.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{r.role}</p>
                    <p className="text-xs text-gray-400 truncate">{r.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 flex-shrink-0">{r.count}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
              Manage Roles & Permissions <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Activity Summary</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                This month <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-xs text-gray-500 mt-0.5">New Members</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500 mt-0.5">Invites Sent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
