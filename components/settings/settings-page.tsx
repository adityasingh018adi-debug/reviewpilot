"use client";

import { useState } from "react";
import {
  Building2, Settings, Star, Sparkles, Bell, Palette, Users, Shield,
  Code2, Database, Trash2, ChevronRight, Upload, Globe, MapPin,
  Phone, Mail, Instagram, Twitter, Facebook, Save, Camera, Link2,
  Plus, CheckCircle2, AlertCircle, HelpCircle, Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SettingsSection =
  | "business_profile" | "general" | "review_settings" | "ai_preferences"
  | "notifications" | "branding" | "users_permissions" | "security"
  | "api_webhooks" | "data_export" | "danger_zone";

interface NavItem {
  id: SettingsSection;
  label: string;
  subtitle: string;
  icon: typeof Building2;
  danger?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "business_profile", label: "Business Profile", subtitle: "Basic information about your business", icon: Building2 },
  { id: "general", label: "General Settings", subtitle: "Manage general preferences", icon: Settings },
  { id: "review_settings", label: "Review Settings", subtitle: "Set review rules and preferences", icon: Star },
  { id: "ai_preferences", label: "AI Preferences", subtitle: "Configure AI reply behavior", icon: Sparkles },
  { id: "notifications", label: "Notifications", subtitle: "Manage email and alerts", icon: Bell },
  { id: "branding", label: "Branding", subtitle: "Customize your brand identity", icon: Palette },
  { id: "users_permissions", label: "Users & Permissions", subtitle: "Manage team and access", icon: Users },
  { id: "security", label: "Security", subtitle: "Password and security settings", icon: Shield },
  { id: "api_webhooks", label: "API & Webhooks", subtitle: "Developer settings and API keys", icon: Code2 },
  { id: "data_export", label: "Data & Export", subtitle: "Export or manage your data", icon: Database },
  { id: "danger_zone", label: "Danger Zone", subtitle: "Delete account or data", icon: Trash2, danger: true },
];

// ─── Business Profile ─────────────────────────────────────────────────────────

function BusinessProfileSection() {
  const checkboxSettings = [
    { label: "Enable review request emails", desc: "Send automated emails to customers to collect reviews", defaultOn: true },
    { label: "Show only 4 and 5 star reviews on public pages", desc: "Filter low ratings from public widgets and pages", defaultOn: true },
    { label: "Require review approval", desc: "Approve reviews before they go live", defaultOn: true },
  ];

  return (
    <div className="flex gap-6">
      {/* Main form */}
      <div className="flex-1 space-y-8 min-w-0">
        {/* Business Profile */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Business Profile</h2>
          <p className="text-sm text-gray-500 mb-5">Update your business information. It will be used across the platform.</p>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Name</Label>
              <Input defaultValue="Cafe Delight" className="h-10 bg-white border-gray-300" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Email</Label>
              <Input defaultValue="hello@cafedelight.com" className="h-10 bg-white border-gray-300" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 h-10 bg-white cursor-pointer hover:bg-gray-50">
                  <span className="text-base">🇮🇳</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 rotate-90" />
                </div>
                <Input defaultValue="+91 98765 43210" className="flex-1 h-10 bg-white border-gray-300" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Website</Label>
              <Input defaultValue="https://www.cafedelight.com" className="h-10 bg-white border-gray-300" />
            </div>
          </div>
        </section>

        {/* General Settings */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">General Settings</h2>
          <p className="text-sm text-gray-500 mb-5">Manage your general preferences.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Language", value: "English" },
              { label: "Date Format", value: "May 31, 2024" },
              { label: "Time Format", value: "12 Hour (01:30 PM)" },
              { label: "Currency", value: "INR (₹) – Indian Rupee" },
            ].map((f) => (
              <div key={f.label}>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">{f.label}</Label>
                <div className="h-10 border border-gray-300 rounded-lg bg-white flex items-center justify-between px-3 cursor-pointer hover:bg-gray-50">
                  <span className="text-sm text-gray-700">{f.value}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Review Settings */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Review Settings</h2>
          <p className="text-sm text-gray-500 mb-5">Configure how reviews are collected and displayed.</p>
          <div className="space-y-4">
            {checkboxSettings.map((item) => (
              <label key={item.label} className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5">
                  <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultOn} />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors" />
                  <CheckCircle2 className="absolute inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Right panel */}
      <div className="w-72 flex-shrink-0 space-y-5">
        {/* Business Logo */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <Label className="text-sm font-semibold text-gray-700 mb-4 block">Business Logo</Label>
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-900 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                <span className="text-white font-bold text-lg">CD</span>
              </div>
              <button className="absolute -bottom-1 -right-1 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
                <Camera className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
            <div className="flex gap-2 w-full">
              <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs">
                <Upload className="h-3.5 w-3.5" />
                Change Logo
              </Button>
              <Button size="sm" variant="outline" className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Business Category + Timezone */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Category</Label>
            <div className="h-10 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between px-3 cursor-pointer">
              <span className="text-sm text-gray-700">Restaurant / Cafe</span>
              <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Time Zone</Label>
            <div className="h-10 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between px-3 cursor-pointer">
              <span className="text-sm text-gray-700">(GMT+05:30) Asia/Kolkata</span>
              <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
            <MapPin className="h-4 w-4 text-indigo-500" />
            Business Address
          </h4>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">Address</Label>
              <Input defaultValue="123, MG Road, Connaught Place" className="h-8 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">City</Label>
                <Input defaultValue="New Delhi" className="h-8 text-sm" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">State</Label>
                <div className="h-8 border border-gray-300 rounded-md bg-white flex items-center justify-between px-2 cursor-pointer">
                  <span className="text-sm text-gray-700">Delhi</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Postal Code</Label>
                <Input defaultValue="110001" className="h-8 text-sm" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Country</Label>
                <div className="h-8 border border-gray-300 rounded-md bg-white flex items-center justify-between px-2 cursor-pointer">
                  <span className="text-sm text-gray-700">India</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-indigo-500" />
            <h4 className="text-sm font-semibold text-gray-800">Social Profiles</h4>
          </div>
          <div className="space-y-3">
            {[
              { icon: "G", color: "bg-blue-500", label: "Google Business Profile", value: "https://g.page/cafedelight" },
              { icon: "f", color: "bg-blue-600", label: "Facebook", value: "https://facebook.com/cafedelight" },
              { icon: "In", color: "bg-gradient-to-br from-pink-500 to-purple-600", label: "Instagram", value: "https://instagram.com/cafedelight" },
              { icon: "▶", color: "bg-red-600", label: "YouTube", value: "https://youtube.com/@cafedelight" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`${s.color} w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-xs text-gray-700 truncate">{s.value}</p>
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex-shrink-0">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        <Settings className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{subtitle}</p>
      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Configure</Button>
    </div>
  );
}

function DangerSection() {
  return (
    <div className="max-w-xl space-y-4">
      <p className="text-sm text-gray-500 mb-6">These actions are permanent and cannot be undone.</p>
      {[
        { label: "Delete all reviews", desc: "Permanently delete all synced reviews.", btn: "Delete Reviews", red: true },
        { label: "Reset settings", desc: "Reset all settings to their defaults.", btn: "Reset Settings", red: true },
        { label: "Delete account", desc: "Permanently delete your account and data.", btn: "Delete Account", red: true },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-800">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">{item.btn}</Button>
        </div>
      ))}
    </div>
  );
}

function SectionContent({ id }: { id: SettingsSection }) {
  const nav = NAV_ITEMS.find((n) => n.id === id)!;
  if (id === "business_profile") return <BusinessProfileSection />;
  if (id === "danger_zone") return <DangerSection />;
  return <PlaceholderSection title={nav.label} subtitle={nav.subtitle} />;
}

export function SettingsPage() {
  const [active, setActive] = useState<SettingsSection>("business_profile");

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your business settings and preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 text-gray-600">
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </Button>
          <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left sidebar nav */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-2 sticky top-0">
            <nav className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? item.danger ? "bg-red-50" : "bg-indigo-50 border-l-2 border-indigo-600"
                        : item.danger ? "hover:bg-red-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                      isActive
                        ? item.danger ? "text-red-500" : "text-indigo-600"
                        : item.danger ? "text-red-400" : "text-gray-400"
                    }`} />
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${
                        isActive
                          ? item.danger ? "text-red-700" : "text-indigo-700"
                          : item.danger ? "text-red-600" : "text-gray-700"
                      }`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{item.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <SectionContent id={active} />
        </div>
      </div>
    </div>
  );
}
