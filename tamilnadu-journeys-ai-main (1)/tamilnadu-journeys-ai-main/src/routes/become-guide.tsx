import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/become-guide")({
  head: () => ({ meta: [{ title: "Apply as Guide — Travel Together" }] }),
  component: BecomeGuidePage,
});

function BecomeGuidePage() {
  const { user, isGuide, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [existing, setExisting] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ full_name: "", city: "", languages: "Tamil, English", experience_years: 1, bio: "", contact_phone: "" });

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase.from("guide_applications").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      setExisting(data); setLoading(false);
    });
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Log in to apply</h1>
        <Button asChild className="mt-4"><Link to="/login">Log in</Link></Button>
      </div>
    );
  }

  if (isGuide || isAdmin) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <Users className="mx-auto h-10 w-10 text-jungle" />
        <h1 className="mt-3 font-display text-2xl font-bold">You're already a guide!</h1>
        <Button asChild className="mt-4"><Link to="/bookings">Go to bookings</Link></Button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.from("guide_applications").insert({ ...form, user_id: user.id });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Application submitted! Admin will review soon.");
    navigate({ to: "/" });
  };

  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold"><Users className="h-7 w-7 text-primary" />Become a Guide</h1>
        <p className="mt-2 text-muted-foreground">Apply to host travelers in your city. Admin reviews each application before approving.</p>

        {loading ? <p className="mt-6">Loading...</p> : existing ? (
          <Card className="mt-6 bg-gradient-card"><CardContent className="p-6">
            <Badge className={existing.status === "approved" ? "bg-jungle" : existing.status === "rejected" ? "bg-destructive" : ""}>
              {existing.status.toUpperCase()}
            </Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">Your application</h3>
            <p className="mt-1 text-sm">City: {existing.city} · Languages: {existing.languages}</p>
            <p className="mt-1 text-sm">{existing.bio}</p>
            <p className="mt-2 text-xs text-muted-foreground">Submitted {new Date(existing.created_at).toLocaleDateString("en-IN")}</p>
          </CardContent></Card>
        ) : (
          <Card className="mt-6 bg-gradient-card"><CardContent className="p-6">
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <div><Label>Full name</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
              <div><Label>City you guide in</Label><Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Madurai" /></div>
              <div><Label>Languages spoken</Label><Input required value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} /></div>
              <div><Label>Experience (years)</Label><Input type="number" min={0} max={50} value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: Number(e.target.value) })} /></div>
              <div className="sm:col-span-2"><Label>Phone</Label><Input required value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>About you</Label><Textarea required maxLength={500} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Specialties, certifications, what makes you a great guide..." /></div>
              <Button type="submit" disabled={busy} className="sm:col-span-2 bg-gradient-hero text-primary-foreground">
                {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Submit application
              </Button>
            </form>
          </CardContent></Card>
        )}
      </div>
    </div>
  );
}
