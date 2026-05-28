"use client";

import { useState } from "react";
import {
  Camera, Edit, Globe, Calendar, Clock, Shield, Key, Smartphone,
  Monitor, AlertCircle, CheckCircle2, MoreVertical, ArrowRight,
  LogOut, Trash2, ChevronRight, UserCircle, Building2, Crown,
  Users, Plug, MessageSquare, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Session {
  id: string;
  browser: string;
  device: string;
  location: string;
  time: string;
  isCurrent?: boolean;
}

interface Activity {
  id: string;
  label: string;
  sub: string;
  time: string;
  icon: typeof CheckCircle2;
  color: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const SESSIONS: Session[] = [
  { id: "1", browser: "Chrome on macOS", device: "laptop", location: "Kolkata, India", time: "May 31, 2024, 10:30 AM", isCurrent: true },
  { id: "2", browser: "Safari on iPhone", device: "phone", location: "Kolkata, India", time: "May 30, 2024, 09:15 PM" },
  { id: "3", browser: "Chrome on Windows", device: "monitor", location: "Delhi, India", time: "May 28, 2024, 04:40 PM" },
];

const ACTIVITIES: Activity[] = [
  { id: "1", label: "Login Successful", sub: "Kolkata, India · May 31, 2024, 10:30 AM", time: "", icon: CheckCircle2, color: "bg-green-100 text-green-600" },
  { id: "2", label: "Profile Updated", sub: "Kolkata, India · May 20, 2024, 02:15 PM", time: "", icon: Edit, color: "bg-blue-100 text-blue-600" },
  { id: "3", label: "Team Member Added", sub: "Amit Patel · May 18, 2024, 11:05 AM", time: "", icon: Users, color: "bg-indigo-100 text-indigo-600" },
  { id: "4", label: "Two-Factor Authentication Enabled", sub: "Kolkata, India · Jan 10, 2024, 9:20 AM", time: "", icon: Shield, color: "bg-purple-100 text-purple-600" },
  { id: "5", label: "Account Created", sub: "Kolkata, India · Jan 10, 2024, 9:15 AM", time: "", icon: UserCircle, color: "bg-gray-100 text-gray-600" },
];

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  laptop: Monitor,
  phone: Smartphone,
  monitor: Monitor,
};

// ─── Main Component ────────────────────────────────────────────────────────────

export function OwnerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage your owner profile, account settings, and security.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
                  RS
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                <Camera className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">Rahul Sharma</h2>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">Owner</span>
              </div>
              <p className="text-sm text-gray-500">rahul.sharma@cafedelight.com</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
          </div>
          <div className="space-y-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Joined on Jan 10, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Last login: May 31, 2024, 10:30 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <span>Time zone: (GMT+05:30) Asia/Kolkata</span>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Account Overview</h3>
          <div className="space-y-3">
            {[
              { label: "Business Name", value: "Cafe Delight", icon: Building2 },
              { label: "Plan", value: "Growth Plan", icon: Crown },
              { label: "Member Role", value: "Owner", icon: UserCircle },
              { label: "Total Members", value: "10", icon: Users },
              { label: "Active Integrations", value: "8", icon: Plug },
              { label: "Reviews Tracked (This Month)", value: "1,250 / 2,000", icon: MessageSquare },
              { label: "AI Replies (This Month)", value: "420 / 1,000", icon: Sparkles },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <item.icon className="h-4 w-4 text-gray-400" />
                  {item.label}
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            View Account Summary
          </Button>
        </div>

        {/* Owner Preferences */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Owner Preferences</h3>
          <div className="space-y-1">
            {[
              { label: "Email Notifications", value: "All notifications" },
              { label: "Security Alerts", value: "Enabled" },
              { label: "Theme", value: "Light" },
              { label: "Language", value: "English" },
              { label: "Date Format", value: "May 31, 2024" },
              { label: "Time Format", value: "12 Hour (01:30 PM)" },
            ].map((pref) => (
              <button key={pref.label} className="w-full flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-1 rounded transition-colors text-left">
                <span className="text-sm text-gray-700">{pref.label}</span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {pref.value}
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
            Manage Preferences
          </Button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Security & Access */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Security & Access</h3>
          <div className="space-y-3">
            {[
              { label: "Password", sub: "Last changed 45 days ago", action: "Change Password", toggle: false },
              { label: "Two-Factor Authentication", sub: "Added on Jan 10, 2024", action: null, toggle: true, on: true },
              { label: "Backup Codes", sub: "10 codes remaining", action: "View Codes", toggle: false },
              { label: "Trusted Devices", sub: "3 devices", action: "Manage Devices", toggle: false },
              { label: "Login Alerts", sub: "Get notified of new sign-ins", action: null, toggle: true, on: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
                {item.toggle ? (
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.on ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {item.on ? "Enabled" : "Disabled"}
                    </span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs h-7">{item.action}</Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Active Sessions</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-3 mb-5">
            {SESSIONS.map((session) => {
              const DevIcon = DEVICE_ICONS[session.device] ?? Monitor;
              return (
                <div key={session.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <DevIcon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-800">{session.browser}</p>
                        {session.isCurrent && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Current Session</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Log Out All Other Sessions
          </Button>
        </div>

        {/* Recent Account Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Recent Account Activity</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-3">
            {ACTIVITIES.map((a) => (
              <div key={a.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${a.color}`}>
                  <a.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">You're the owner of this account</p>
            <p className="text-sm text-gray-500">As the owner, you have full access and control over all features, settings, billing, team, and integrations.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Transfer Ownership
          </Button>
          <Button size="sm" className="gap-2 bg-red-600 hover:bg-red-700 text-white">
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
