import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, Hotel, Bed, Bus, Flame, Users, UserPlus, Trash2, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="container mx-auto py-20 text-center">Loading...</div>;

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-3 font-display text-2xl font-bold">Admin access required</h1>
        <Button asChild className="mt-4"><Link to="/login">Log in</Link></Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <Shield className="mx-auto h-12 w-12 text-destructive" />
        <h1 className="mt-3 font-display text-2xl font-bold">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">This panel is for administrators only.</p>
        <Button asChild className="mt-4" variant="outline"><Link to="/">Back home</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-warm py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 font-display text-4xl font-bold">
            <Shield className="h-8 w-8 text-accent" /> Admin Panel
          </h1>
          <p className="mt-2 text-muted-foreground">Manage hotels, lodges, buses, hot plans, guides and admins.</p>
        </div>

        <Tabs defaultValue="hotels">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="hotels"><Hotel className="mr-1 h-3 w-3" />Hotels</TabsTrigger>
            <TabsTrigger value="lodges"><Bed className="mr-1 h-3 w-3" />Lodges</TabsTrigger>
            <TabsTrigger value="buses"><Bus className="mr-1 h-3 w-3" />Buses</TabsTrigger>
            <TabsTrigger value="plans"><Flame className="mr-1 h-3 w-3" />Plans</TabsTrigger>
            <TabsTrigger value="guides"><Users className="mr-1 h-3 w-3" />Guides</TabsTrigger>
            <TabsTrigger value="admins"><UserPlus className="mr-1 h-3 w-3" />Admins</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels"><HotelsAdmin /></TabsContent>
          <TabsContent value="lodges"><LodgesAdmin /></TabsContent>
          <TabsContent value="buses"><BusesAdmin /></TabsContent>
          <TabsContent value="plans"><PlansAdmin /></TabsContent>
          <TabsContent value="guides"><GuideApplicationsAdmin /></TabsContent>
          <TabsContent value="admins"><AdminsAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ------------------ HOTELS ------------------ */
function HotelsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", city: "", price_per_night: 2000, rating: 4.0, amenities: "", contact: "", image_url: "", description: "" });
  const [busy, setBusy] = useState(false);

  const load = () => supabase.from("admin_hotels").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.from("admin_hotels").insert(form);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Hotel added"); setForm({ name: "", city: "", price_per_night: 2000, rating: 4.0, amenities: "", contact: "", image_url: "", description: "" }); load();
  };
  const remove = async (id: string) => {
    const { error } = await supabase.from("admin_hotels").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Removed"); load();
  };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6">
      <form onSubmit={add} className="grid gap-3 md:grid-cols-3">
        <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>City</Label><Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
        <div><Label>Price/night (₹)</Label><Input type="number" required value={form.price_per_night} onChange={(e) => setForm({ ...form, price_per_night: Number(e.target.value) })} /></div>
        <div><Label>Rating</Label><Input type="number" step="0.1" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
        <div><Label>Contact</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
        <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
        <div className="md:col-span-3"><Label>Amenities</Label><Input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="WiFi, Pool, Breakfast" /></div>
        <div className="md:col-span-3"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <Button type="submit" disabled={busy} className="md:col-span-3 bg-gradient-hero text-primary-foreground">{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Add hotel</Button>
      </form>
      <div className="mt-6 space-y-2">
        {items.map((h) => (
          <div key={h.id} className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
            <div><div className="font-semibold">{h.name} <span className="text-xs text-muted-foreground">· {h.city}</span></div><div className="text-xs text-muted-foreground">₹{h.price_per_night}/night · ★{h.rating}</div></div>
            <Button size="sm" variant="outline" onClick={() => remove(h.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}

/* ------------------ LODGES ------------------ */
function LodgesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", city: "", price_per_night: 1200, rating: 4.0, amenities: "", contact: "", image_url: "", description: "" });
  const [busy, setBusy] = useState(false);

  const load = () => supabase.from("admin_lodges").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);
  const add = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.from("admin_lodges").insert(form);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Lodge added"); setForm({ name: "", city: "", price_per_night: 1200, rating: 4.0, amenities: "", contact: "", image_url: "", description: "" }); load();
  };
  const remove = async (id: string) => { await supabase.from("admin_lodges").delete().eq("id", id); load(); };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6">
      <form onSubmit={add} className="grid gap-3 md:grid-cols-3">
        <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>City</Label><Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
        <div><Label>Price/night (₹)</Label><Input type="number" required value={form.price_per_night} onChange={(e) => setForm({ ...form, price_per_night: Number(e.target.value) })} /></div>
        <div><Label>Rating</Label><Input type="number" step="0.1" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
        <div><Label>Contact</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
        <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
        <div className="md:col-span-3"><Label>Amenities</Label><Input value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} /></div>
        <div className="md:col-span-3"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <Button type="submit" disabled={busy} className="md:col-span-3 bg-gradient-hero text-primary-foreground">{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Add lodge</Button>
      </form>
      <div className="mt-6 space-y-2">
        {items.map((h) => (
          <div key={h.id} className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
            <div><div className="font-semibold">{h.name} <span className="text-xs text-muted-foreground">· {h.city}</span></div><div className="text-xs text-muted-foreground">₹{h.price_per_night}/night · ★{h.rating}</div></div>
            <Button size="sm" variant="outline" onClick={() => remove(h.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}

/* ------------------ BUSES ------------------ */
function BusesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ operator: "", from_city: "", to_city: "", departure_time: "21:00", arrival_time: "06:00", price: 800, bus_type: "AC Sleeper", total_seats: 40, contact: "" });
  const [busy, setBusy] = useState(false);

  const load = () => supabase.from("admin_buses").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);
  const add = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.from("admin_buses").insert(form);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Bus added"); load();
  };
  const remove = async (id: string) => { await supabase.from("admin_buses").delete().eq("id", id); load(); };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6">
      <form onSubmit={add} className="grid gap-3 md:grid-cols-3">
        <div><Label>Operator</Label><Input required value={form.operator} onChange={(e) => setForm({ ...form, operator: e.target.value })} /></div>
        <div><Label>From</Label><Input required value={form.from_city} onChange={(e) => setForm({ ...form, from_city: e.target.value })} /></div>
        <div><Label>To</Label><Input required value={form.to_city} onChange={(e) => setForm({ ...form, to_city: e.target.value })} /></div>
        <div><Label>Departure</Label><Input type="time" value={form.departure_time} onChange={(e) => setForm({ ...form, departure_time: e.target.value })} /></div>
        <div><Label>Arrival</Label><Input type="time" value={form.arrival_time} onChange={(e) => setForm({ ...form, arrival_time: e.target.value })} /></div>
        <div><Label>Price (₹)</Label><Input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
        <div><Label>Type</Label><Input value={form.bus_type} onChange={(e) => setForm({ ...form, bus_type: e.target.value })} /></div>
        <div><Label>Total seats</Label><Input type="number" value={form.total_seats} onChange={(e) => setForm({ ...form, total_seats: Number(e.target.value) })} /></div>
        <div><Label>Contact</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
        <Button type="submit" disabled={busy} className="md:col-span-3 bg-gradient-hero text-primary-foreground">{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Add bus</Button>
      </form>
      <div className="mt-6 space-y-2">
        {items.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
            <div><div className="font-semibold">{b.operator} · {b.from_city} → {b.to_city}</div><div className="text-xs text-muted-foreground">{b.departure_time}–{b.arrival_time} · {b.bus_type} · ₹{b.price}</div></div>
            <Button size="sm" variant="outline" onClick={() => remove(b.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}

/* ------------------ HOT PLANS ------------------ */
function PlansAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => supabase.from("hot_plans").select("*").order("popularity", { ascending: false }).then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);
  const remove = async (id: string) => { await supabase.from("hot_plans").delete().eq("id", id); load(); };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6">
      <p className="mb-4 text-sm text-muted-foreground">Hot plans are seeded curated content. You can remove plans here. To add new hot plans contact your data team — they require structured day-by-day JSON.</p>
      <div className="space-y-2">
        {items.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
            <div><div className="font-semibold">{p.title}</div><div className="text-xs text-muted-foreground">{p.climate} · {p.days_count}d · ₹{p.total_cost_inr} · ★{p.rating}</div></div>
            <Button size="sm" variant="outline" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}

/* ------------------ GUIDE APPLICATIONS ------------------ */
function GuideApplicationsAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const load = () => supabase.from("guide_applications").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems(data || []));
  useEffect(() => { load(); }, []);

  const decide = async (app: any, approved: boolean) => {
    const { error: updErr } = await supabase.from("guide_applications").update({
      status: approved ? "approved" : "rejected",
      reviewed_at: new Date().toISOString(),
    }).eq("id", app.id);
    if (updErr) { toast.error(updErr.message); return; }
    if (approved) {
      const { error: roleErr } = await supabase.from("user_roles").insert({ user_id: app.user_id, role: "guide" });
      if (roleErr && !roleErr.message.includes("duplicate")) { toast.error(roleErr.message); return; }
    }
    toast.success(approved ? "Approved as guide" : "Rejected"); load();
  };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6 space-y-3">
      {items.length === 0 && <p className="text-sm text-muted-foreground">No applications yet.</p>}
      {items.map((a) => (
        <div key={a.id} className="rounded-lg border border-border bg-background/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold">{a.full_name} <Badge variant="outline" className="ml-2">{a.status}</Badge></div>
              <div className="text-xs text-muted-foreground">{a.city} · {a.languages} · {a.experience_years}y exp · {a.contact_phone}</div>
              <p className="mt-2 text-sm">{a.bio}</p>
            </div>
            {a.status === "pending" && (
              <div className="flex flex-col gap-2">
                <Button size="sm" onClick={() => decide(a, true)} className="bg-jungle text-jungle-foreground"><CheckCircle2 className="mr-1 h-4 w-4" />Approve</Button>
                <Button size="sm" variant="outline" onClick={() => decide(a, false)}><XCircle className="mr-1 h-4 w-4" />Reject</Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </CardContent></Card>
  );
}

/* ------------------ ADMINS ------------------ */
function AdminsAdmin() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("user_roles").select("user_id, created_at, profiles:profiles!inner(display_name)").eq("role", "admin");
    setAdmins(data || []);
  };
  useEffect(() => { load(); }, []);

  const promote = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // look up by profiles.display_name (public table). We can't query auth.users from client.
    // Workflow: ask user to first sign up; we then promote by their user_id from profile fetch.
    const { data: profile } = await supabase.from("profiles").select("user_id, display_name").ilike("display_name", email.split("@")[0]).maybeSingle();
    if (!profile) { setBusy(false); toast.error("User not found. Ask them to sign up first."); return; }
    const { error } = await supabase.from("user_roles").insert({ user_id: profile.user_id, role: "admin" });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Promoted to admin"); setEmail(""); load();
  };

  return (
    <Card className="mt-4 bg-gradient-card"><CardContent className="p-6">
      <form onSubmit={promote} className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[240px]"><Label>Promote user (email)</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" /></div>
        <Button type="submit" disabled={busy} className="bg-gradient-hero text-primary-foreground">{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}Make admin</Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">User must sign up first. Lookup is done via their profile display name (the part before @).</p>

      <h3 className="mt-6 mb-2 font-semibold">Current admins</h3>
      <div className="space-y-2">
        {admins.map((a: any) => (
          <div key={a.user_id} className="rounded-lg border border-border bg-background/60 p-3 text-sm">
            <Shield className="mr-1 inline h-4 w-4 text-accent" />
            {a.profiles?.display_name || a.user_id} <span className="text-xs text-muted-foreground">· since {new Date(a.created_at).toLocaleDateString("en-IN")}</span>
          </div>
        ))}
      </div>
    </CardContent></Card>
  );
}
