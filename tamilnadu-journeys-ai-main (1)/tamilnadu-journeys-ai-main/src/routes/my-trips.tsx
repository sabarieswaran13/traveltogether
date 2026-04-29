import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, Trash2, Eye, Check, Sparkles, GitCompare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatINR } from "@/data/destinations";
import { PlanGuide, type Plan } from "@/components/PlanGuide";
import { toast } from "sonner";

export const Route = createFileRoute("/my-trips")({
  head: () => ({ meta: [{ title: "My Trips — Travel Together" }, { name: "description", content: "Saved Tamil Nadu plans, comparison & history." }] }),
  component: MyTripsPage,
});

interface TripRow {
  id: string; title: string; summary: string;
  total_cost_inr: number; days_count: number;
  start_city: string | null; interests: string | null;
  budget_inr: number | null; climate: string | null;
  plan_data: Plan; created_at: string; confirmed: boolean;
}

function MyTripsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<TripRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<TripRow | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [compare, setCompare] = useState<Set<string>>(new Set());

  const load = async () => {
    if (!user) { setLoading(false); return; }
    const { data } = await supabase.from("trip_plans").select("*").order("created_at", { ascending: false });
    setItems((data as unknown as TripRow[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [user]);

  const remove = async (id: string) => {
    const { error } = await supabase.from("trip_plans").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setItems((prev) => prev.filter((i) => i.id !== id));
    setCompare((prev) => { const n = new Set(prev); n.delete(id); return n; });
    toast.success("Removed");
  };

  const confirm = async (id: string) => {
    setConfirming(id);
    const { error } = await supabase.from("trip_plans").update({ confirmed: true }).eq("id", id);
    setConfirming(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Trip confirmed! Opening full guidance...");
    await load();
    const updated = items.find((i) => i.id === id);
    if (updated) setOpen({ ...updated, confirmed: true });
  };

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else if (n.size < 3) n.add(id);
      else { toast.info("Compare up to 3 trips"); return prev; }
      return n;
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Sign in to see your trips</h1>
        <p className="mt-2 text-muted-foreground">Plans you add are saved here.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link to="/login">Log in</Link></Button>
          <Button asChild variant="outline"><Link to="/signup">Sign up</Link></Button>
        </div>
      </div>
    );
  }

  const compared = items.filter((i) => compare.has(i.id));
  const pending = items.filter((i) => !i.confirmed);
  const history = items.filter((i) => i.confirmed);

  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 font-display text-4xl font-bold"><History className="h-8 w-8 text-primary" />My Trips</h1>
            <p className="mt-2 text-muted-foreground">Compare added plans, confirm one, and see your history.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/hot-plans">Hot Plans</Link></Button>
            <Button asChild className="bg-gradient-hero text-primary-foreground"><Link to="/trip-planner"><Sparkles className="mr-2 h-4 w-4" />Plan Maker</Link></Button>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <Card className="mt-8 bg-gradient-card">
            <CardContent className="p-10 text-center">
              <p className="text-muted-foreground">No plans yet. Add some from Hot Plans or Plan Maker.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {compared.length >= 2 && (
              <Card className="mt-6 border-accent/40 bg-accent/5">
                <CardContent className="p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                    <GitCompare className="h-5 w-5 text-accent" /> Comparing {compared.length} plans
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {compared.map((c) => (
                      <div key={c.id} className="rounded-lg border border-border bg-background/70 p-4">
                        <div className="font-semibold">{c.title}</div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {c.days_count} days · {c.climate || "—"}
                        </div>
                        <div className="mt-2 font-display text-xl font-bold text-primary">{formatINR(Number(c.total_cost_inr))}</div>
                        <div className="mt-1 text-xs">~{formatINR(Math.round(Number(c.total_cost_inr) / c.days_count))}/day</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {pending.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-3 font-display text-2xl font-bold">Plans to review</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {pending.map((t) => (
                    <PlanCard key={t.id} t={t} compare={compare} toggleCompare={toggleCompare}
                      onView={() => setOpen(t)} onRemove={() => remove(t.id)}
                      onConfirm={() => confirm(t.id)} confirming={confirming === t.id} />
                  ))}
                </div>
              </section>
            )}

            {history.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-3 font-display text-2xl font-bold">Trip history</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {history.map((t) => (
                    <PlanCard key={t.id} t={t} compare={compare} toggleCompare={toggleCompare}
                      onView={() => setOpen(t)} onRemove={() => remove(t.id)} confirmedView />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader><DialogTitle>{open?.confirmed ? "Confirmed trip — full guidance" : "Plan preview"}</DialogTitle></DialogHeader>
            {open && <PlanGuide plan={open.plan_data} />}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function PlanCard({ t, compare, toggleCompare, onView, onRemove, onConfirm, confirming, confirmedView }: {
  t: TripRow;
  compare: Set<string>;
  toggleCompare: (id: string) => void;
  onView: () => void;
  onRemove: () => void;
  onConfirm?: () => void;
  confirming?: boolean;
  confirmedView?: boolean;
}) {
  return (
    <Card className={`bg-gradient-card ${confirmedView ? "border-jungle/40" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Badge className={confirmedView ? "bg-jungle" : "bg-primary"}>
            {confirmedView ? "Confirmed" : `${t.days_count} day${t.days_count > 1 ? "s" : ""}`}
          </Badge>
          <span className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleDateString("en-IN")}</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-bold">{t.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.summary}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-bold text-primary">{formatINR(Number(t.total_cost_inr))}</div>
            <div className="text-xs text-muted-foreground">{t.climate || "—"}</div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {!confirmedView && (
              <Button size="sm" variant={compare.has(t.id) ? "default" : "outline"} onClick={() => toggleCompare(t.id)}>
                <GitCompare className="h-4 w-4" />
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onView}><Eye className="h-4 w-4" /></Button>
            <Button size="sm" variant="outline" onClick={onRemove}><Trash2 className="h-4 w-4" /></Button>
            {!confirmedView && onConfirm && (
              <Button size="sm" className="bg-gradient-hero text-primary-foreground" onClick={onConfirm} disabled={confirming}>
                <Check className="mr-1 h-4 w-4" />{confirming ? "..." : "Confirm"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
