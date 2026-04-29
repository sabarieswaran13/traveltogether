import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Phone, Trash2, Send, MapPin, NotebookPen } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/safety")({
  head: () => ({ meta: [{ title: "Safety For You — Travel Together" }, { name: "description", content: "Add two guardians to receive your location twice daily while you travel." }] }),
  component: SafetyPage,
});

interface Guardian { id: string; name: string; phone: string; }

function SafetyPage() {
  const { user } = useAuth();
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dayPlan, setDayPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("guardians").select("*").order("created_at");
    setGuardians(data || []);
  };
  useEffect(() => { load(); }, [user]);

  // Persist day plan locally so it survives page reloads
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tt_day_plan") : null;
    if (saved) setDayPlan(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("tt_day_plan", dayPlan);
  }, [dayPlan]);

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <Shield className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-display text-3xl font-bold">Safety For You</h1>
        <p className="mt-2 text-muted-foreground">Log in to set up guardian alerts.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link to="/login">Log in</Link></Button>
          <Button asChild variant="outline"><Link to="/signup">Sign up</Link></Button>
        </div>
      </div>
    );
  }

  const addGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guardians.length >= 2) { toast.error("Maximum 2 guardians allowed"); return; }
    if (!/^\+?\d{10,15}$/.test(phone.replace(/\s/g, ""))) { toast.error("Enter a valid phone number"); return; }
    setLoading(true);
    const { error } = await supabase.from("guardians").insert({ user_id: user.id, name, phone });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`${name} added as guardian`);
    setName(""); setPhone("");
    load();
  };

  const removeGuardian = async (id: string) => {
    const { error } = await supabase.from("guardians").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Guardian removed");
    load();
  };


  const buildMessage = (g: Guardian, mapsUrl: string) => {
    const planLine = dayPlan.trim()
      ? `\n\nToday's plan:\n${dayPlan.trim()}`
      : "";
    return `Vanakkam ${g.name}! 🙏\nI'm traveling with Travel Together.\n\nMy current location: ${mapsUrl}${planLine}\n\n— Sent via Travel Together`;
  };

  const shareLocation = (g: Guardian) => {
    if (!navigator.geolocation) { toast.error("Location not available on this device"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const url = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        const wa = `https://wa.me/${g.phone.replace(/\D/g, "")}?text=${encodeURIComponent(buildMessage(g, url))}`;
        window.open(wa, "_blank");
      },
      () => toast.error("Couldn't get your location. Please allow location access.")
    );
  };

  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-hero p-3 text-primary-foreground shadow-soft"><Shield className="h-6 w-6" /></div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Safety For You</h1>
            <p className="text-muted-foreground">Add up to two guardians, write today's plan, and share both with one tap each morning and evening over WhatsApp.</p>
          </div>
        </div>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Add a guardian ({guardians.length}/2)</h2>
            {guardians.length < 2 && (
              <form onSubmit={addGuardian} className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Amma" />
                </div>
                <div>
                  <Label>Phone (with country code)</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 98765 43210" />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground">
                    <Phone className="mr-2 h-4 w-4" />Add
                  </Button>
                </div>
              </form>
            )}
            {guardians.length === 2 && <p className="text-sm text-muted-foreground">You've added the maximum of 2 guardians. Remove one to add another.</p>}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-card">
          <CardContent className="p-6">
            <h2 className="mb-2 flex items-center gap-2 font-display text-xl font-semibold">
              <NotebookPen className="h-5 w-5 text-primary" />
              Today's plan
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Briefly note where you're going today — temples, beaches, who you're with, return time. It will be sent to your guardians along with your location.
            </p>
            <Textarea
              value={dayPlan}
              onChange={(e) => setDayPlan(e.target.value.slice(0, 500))}
              placeholder="e.g. Meenakshi temple in the morning, lunch at Murugan Idli Shop, Thirumalai Nayakkar Mahal in the evening. Returning to lodge by 8 PM."
              rows={4}
              className="resize-none"
            />
            <div className="mt-1 text-right text-xs text-muted-foreground">{dayPlan.length}/500</div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4">
          {guardians.map((g) => (
            <Card key={g.id} className="bg-gradient-card">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <div className="font-semibold">{g.name}</div>
                  <div className="text-sm text-muted-foreground">{g.phone}</div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => shareLocation(g)} className="bg-gradient-hero text-primary-foreground">
                    <Send className="mr-2 h-4 w-4" />Share location & plan
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => removeGuardian(g.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-accent/20 border-accent">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div className="text-sm">
                <strong>Daily reminder:</strong> Tap "Share location now" once in the morning and once in the evening to send your guardians a WhatsApp message with a Google Maps link to your exact location.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
