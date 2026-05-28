"use client";

import { useState } from "react";
import {
  Building2,
  Settings,
  Star,
  Sparkles,
  Bell,
  Palette,
  Users,
  Shield,
  Code2,
  Database,
  Trash2,
  ChevronRight,
  Upload,
  Globe,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Save,
  Camera,
  Link2,
  Plus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Types ────────────────────────────────────────────────────────────────────

type SettingsSection =
  | "business_profile"
  | "general"
  | "review_settings"
  | "ai_preferences"
  | "notifications"
  | "branding"
  | "users_permissions"
  | "security"
  | "api_webhooks"
  | "data_export"
  | "danger_zone";

interface NavItem {
  id: SettingsSection;
  label: string;
  icon: typeof Building2;
  badge?: string;
  danger?: boolean;
}

// ─── Navigation Items ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "business_profile", label: "Business Profile", icon: Building2 },
  { id: "general", label: "General", icon: Settings },
  { id: "review_settings", label: "Review Settings", icon: Star },
  { id: "ai_preferences", label: "AI Preferences", icon: Sparkles },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "users_permissions", label: "Users & Permissions", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "api_webhooks", label: "API & Webhooks", icon: Code2 },
  { id: "data_export", label: "Data & Export", icon: Database },
  { id: "danger_zone", label: "Danger Zone", icon: Trash2, danger: true },
];

// ─── Business Profile Section ─────────────────────────────────────────────────

function BusinessProfileSection() {
  return (
    <div className="flex gap-6">
      {/* Main Form */}
      <div className="flex-1 space-y-6">
        {/* Logo Upload */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Business Logo</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                RP
              </div>
              <button className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50">
                <Camera className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Upload your business logo</p>
              <p className="text-xs text-gray-500 mb-3">Recommended size: 512×512px. Max 2MB. PNG or JPG.</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="h-3.5 w-3.5" />
                  Upload Logo
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-500">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-5">Business Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Name *</Label>
                <Input defaultValue="ReviewPilot Inc." className="h-9 bg-gray-50" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Type</Label>
                <select className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Restaurant</option>
                  <option>Retail</option>
                  <option>Healthcare</option>
                  <option>Hospitality</option>
                  <option>Services</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Description</Label>
              <textarea
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                defaultValue="AI-powered review management platform that helps businesses collect, manage, and respond to customer reviews."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Website URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input defaultValue="https://reviewpilot.app" className="pl-9 h-9 bg-gray-50" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input defaultValue="+91 98765 43210" className="pl-9 h-9 bg-gray-50" />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Business Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input defaultValue="hello@reviewpilot.app" className="pl-9 h-9 bg-gray-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-gray-900">Operating Hours</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm text-gray-600">Show on profile</span>
            </label>
          </div>
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => (
              <div key={day} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600">{day}</div>
                <label className="relative cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={i < 5} />
                  <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                </label>
                {i < 5 ? (
                  <div className="flex items-center gap-2">
                    <Input defaultValue="09:00 AM" className="w-28 h-7 text-xs bg-gray-50" />
                    <span className="text-gray-400 text-xs">to</span>
                    <Input defaultValue="06:00 PM" className="w-28 h-7 text-xs bg-gray-50" />
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 space-y-4">
        {/* Business Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-500" />
            Business Address
          </h3>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">Street Address</Label>
              <Input defaultValue="42 MG Road, Indiranagar" className="h-8 text-sm bg-gray-50" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">City</Label>
                <Input defaultValue="Bengaluru" className="h-8 text-sm bg-gray-50" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">State</Label>
                <Input defaultValue="Karnataka" className="h-8 text-sm bg-gray-50" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">PIN Code</Label>
                <Input defaultValue="560038" className="h-8 text-sm bg-gray-50" />
              </div>
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">Country</Label>
                <Input defaultValue="India" className="h-8 text-sm bg-gray-50" />
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5" />
              Verify on Map
            </Button>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Link2 className="h-4 w-4 text-indigo-500" />
              Social Profiles
            </h3>
            <button className="p-1 rounded hover:bg-gray-100">
              <Plus className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50">
                <Facebook className="h-4 w-4 text-blue-600" />
              </div>
              <Input placeholder="Facebook URL" defaultValue="facebook.com/reviewpilot" className="h-8 text-xs bg-gray-50 flex-1" />
              <button className="p-1 rounded hover:bg-gray-100">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-50">
                <Twitter className="h-4 w-4 text-sky-500" />
              </div>
              <Input placeholder="Twitter URL" defaultValue="twitter.com/reviewpilot" className="h-8 text-xs bg-gray-50 flex-1" />
              <button className="p-1 rounded hover:bg-gray-100">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-pink-50">
                <Instagram className="h-4 w-4 text-pink-500" />
              </div>
              <Input placeholder="Instagram URL" className="h-8 text-xs bg-gray-50 flex-1" />
              <button className="p-1 rounded hover:bg-gray-100">
                <AlertCircle className="h-4 w-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-4">
          <p className="text-sm font-semibold text-indigo-800 mb-1">Profile Completeness</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-indigo-500 rounded-full" />
            </div>
            <span className="text-sm font-bold text-indigo-700">78%</span>
          </div>
          <p className="text-xs text-indigo-600">Add Instagram profile to reach 85%</p>
        </div>
      </div>
    </div>
  );
}

// ─── General Section ──────────────────────────────────────────────────────────

function GeneralSection() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">General Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Language</Label>
              <select className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Timezone</Label>
              <select className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Asia/Kolkata (IST +5:30)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Date Format</Label>
              <select className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Currency</Label>
              <select className="w-full h-9 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ─── Review Settings Section ──────────────────────────────────────────────────

function ReviewSettingsSection() {
  const toggles = [
    { label: "Auto-reply to 5-star reviews", desc: "Automatically send AI-generated replies to positive reviews", defaultOn: true },
    { label: "Review request automation", desc: "Send review requests after purchase/visit completion", defaultOn: true },
    { label: "Negative review alerts", desc: "Get instant notifications for reviews below 3 stars", defaultOn: true },
    { label: "Review gating", desc: "Filter unhappy customers before asking for public reviews", defaultOn: false },
    { label: "Competitor monitoring", desc: "Track competitor reviews and ratings", defaultOn: false },
    { label: "Review widget on website", desc: "Show live review feed on your website", defaultOn: true },
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Review Settings</h3>
        <div className="space-y-4">
          {toggles.map((t) => (
            <div key={t.label} className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
              </div>
              <label className="relative cursor-pointer flex-shrink-0 mt-0.5">
                <input type="checkbox" className="sr-only peer" defaultChecked={t.defaultOn} />
                <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ─── Placeholder Section ──────────────────────────────────────────────────────

function PlaceholderSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        <Settings className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
        Configure
      </Button>
    </div>
  );
}

// ─── Danger Zone Section ──────────────────────────────────────────────────────

function DangerZoneSection() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h3 className="text-base font-semibold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-5">
          These actions are permanent and cannot be undone. Please proceed with extreme caution.
        </p>
        <div className="space-y-4">
          {[
            { label: "Export all data", desc: "Download all your business data as a CSV/JSON file.", action: "Export Data", danger: false },
            { label: "Reset all settings", desc: "Reset all settings to their default values.", action: "Reset Settings", danger: true },
            { label: "Delete all reviews", desc: "Permanently delete all synced reviews from the dashboard.", action: "Delete Reviews", danger: true },
            { label: "Delete account", desc: "Permanently delete your account and all associated data.", action: "Delete Account", danger: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <Button
                size="sm"
                variant={item.danger ? "destructive" : "outline"}
                className={item.danger ? "bg-red-600 hover:bg-red-700 text-white" : ""}
              >
                {item.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section Content Map ──────────────────────────────────────────────────────

function SectionContent({ section }: { section: SettingsSection }) {
  switch (section) {
    case "business_profile":
      return <BusinessProfileSection />;
    case "general":
      return <GeneralSection />;
    case "review_settings":
      return <ReviewSettingsSection />;
    case "danger_zone":
      return <DangerZoneSection />;
    case "ai_preferences":
      return <PlaceholderSection title="AI Preferences" description="Configure AI tone, response style, language preferences, and reply automation rules." />;
    case "notifications":
      return <PlaceholderSection title="Notifications" description="Set up email, SMS, and in-app notification preferences for review alerts and reports." />;
    case "branding":
      return <PlaceholderSection title="Branding" description="Customize colors, fonts, and email templates to match your brand identity." />;
    case "users_permissions":
      return <PlaceholderSection title="Users & Permissions" description="Manage team members, roles, and access permissions for your workspace." />;
    case "security":
      return <PlaceholderSection title="Security" description="Configure two-factor authentication, session management, and security policies." />;
    case "api_webhooks":
      return <PlaceholderSection title="API & Webhooks" description="Generate API keys and configure webhooks to integrate with external systems." />;
    case "data_export":
      return <PlaceholderSection title="Data & Export" description="Export your reviews, analytics, and customer data in various formats." />;
    default:
      return null;
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("business_profile");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your account and business preferences</p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar Navigation */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-2 sticky top-0">
            <nav className="space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? item.danger
                          ? "bg-red-50 text-red-700"
                          : "bg-indigo-50 text-indigo-700"
                        : item.danger
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? (item.danger ? "text-red-500" : "text-indigo-500") : "text-gray-400"}`} />
                    <span className="font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">{item.badge}</span>
                    )}
                    {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <SectionContent section={activeSection} />
        </div>
      </div>
    </div>
  );
}
