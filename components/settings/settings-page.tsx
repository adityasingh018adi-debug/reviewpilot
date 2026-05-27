"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink } from "lucide-react";

export function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [businessName, setBusinessName] = useState("Sharma's Kitchen");
  const [category, setCategory] = useState("Restaurant");
  const [location, setLocation] = useState("Connaught Place, New Delhi");
  const [whatsappPhone, setWhatsappPhone] = useState("+91 98765 43210");
  const [emailDigest, setEmailDigest] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const { toast } = useToast();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          category,
          location,
          alerts: {
            emailDigest,
            whatsappAlerts,
            whatsappPhone: whatsappAlerts ? whatsappPhone : null,
          },
        }),
      });
      toast({ title: "Settings saved" });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Business profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Profile</CardTitle>
          <CardDescription>How your business appears in AI-generated replies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Restaurant, Salon, Shop…"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Area"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Google Business Profile</CardTitle>
          <CardDescription>Connect to sync reviews and post replies automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <div>
                <p className="text-sm font-medium">Google My Business</p>
                <p className="text-xs text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button type="button" size="sm" variant="outline" asChild>
              <a href="/api/auth/google" className="gap-2">
                <ExternalLink className="h-3.5 w-3.5" />
                Connect
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>How you get alerted about new reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Daily email digest</p>
              <p className="text-xs text-muted-foreground">
                9:00 AM IST — new reviews and pending replies
              </p>
            </div>
            <Switch
              checked={emailDigest}
              onCheckedChange={setEmailDigest}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm font-medium">WhatsApp alerts for negative reviews</p>
                  <p className="text-xs text-muted-foreground">
                    Instant alert when a 1–2 star review comes in
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">Growth plan</Badge>
              </div>
              <Switch
                checked={whatsappAlerts}
                onCheckedChange={setWhatsappAlerts}
              />
            </div>

            {whatsappAlerts && (
              <div className="space-y-2 pl-0">
                <Label htmlFor="whatsappPhone">WhatsApp number</Label>
                <Input
                  id="whatsappPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save settings
        </Button>
      </div>
    </form>
  );
}
