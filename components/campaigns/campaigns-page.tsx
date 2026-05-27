"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Star,
} from "lucide-react";

const MOCK_CAMPAIGNS = [
  { id: "c1", type: "WHATSAPP", recipient: "+91 98765 43210", sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), clickedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(), reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "c2", type: "EMAIL", recipient: "rahul@example.com", sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), clickedAt: null, reviewedAt: null },
  { id: "c3", type: "WHATSAPP", recipient: "+91 87654 32109", sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), clickedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), reviewedAt: null },
];

type CampaignType = "WHATSAPP" | "EMAIL";

export function CampaignsPage() {
  const [recipient, setRecipient] = useState("");
  const [campaignType, setCampaignType] = useState<CampaignType>("WHATSAPP");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!recipient.trim()) return;
    setSending(true);

    try {
      const res = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: recipient.trim(), type: campaignType }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      toast({ title: "Request sent!", description: `Review request sent to ${recipient}.` });
      setRecipient("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send";
      toast({ title: "Failed to send", description: message, variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

  function getCampaignStatus(c: typeof MOCK_CAMPAIGNS[0]) {
    if (c.reviewedAt) return { label: "Reviewed", icon: Star, color: "success" as const };
    if (c.clickedAt) return { label: "Clicked", icon: CheckCircle2, color: "warning" as const };
    return { label: "Sent", icon: Clock, color: "secondary" as const };
  }

  // Stats
  const stats = {
    sent: MOCK_CAMPAIGNS.length,
    clicked: MOCK_CAMPAIGNS.filter((c) => c.clickedAt).length,
    reviewed: MOCK_CAMPAIGNS.filter((c) => c.reviewedAt).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Requests Sent", value: stats.sent, icon: Send },
          { label: "Link Clicked", value: stats.clicked, icon: CheckCircle2 },
          { label: "Reviews Left", value: stats.reviewed, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Send new campaign */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Send Review Request</CardTitle>
          <CardDescription>
            Ask a customer to leave a Google review. They&apos;ll get a direct link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={campaignType} onValueChange={(v) => setCampaignType(v as CampaignType)}>
            <TabsList className="mb-4">
              <TabsTrigger value="WHATSAPP" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="EMAIL" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="WHATSAPP">
              <form onSubmit={handleSend} className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="phone" className="sr-only">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={sending} className="gap-2">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send WhatsApp
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Available on Growth plan. Sent via Twilio WhatsApp Business.
              </p>
            </TabsContent>

            <TabsContent value="EMAIL">
              <form onSubmit={handleSend} className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={sending} className="gap-2">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Send Email
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                Available on Starter and Growth plans. Sent via Resend.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Campaign history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Campaign History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {MOCK_CAMPAIGNS.map((c) => {
              const status = getCampaignStatus(c);
              const StatusIcon = status.icon;
              return (
                <div key={c.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    {c.type === "WHATSAPP" ? (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{c.recipient}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(c.sentAt)}</p>
                    </div>
                  </div>
                  <Badge variant={status.color} className="gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
