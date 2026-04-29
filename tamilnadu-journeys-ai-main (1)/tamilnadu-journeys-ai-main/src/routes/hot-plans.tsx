import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Sun, Mountain, Waves, Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { formatINR } from "@/data/destinations";
import { toast } from "sonner";

export const Route = createFileRoute("/hot-plans")({
  head: () => ({ meta: [
    { title: "Hot Plans — Travel Together" },
    { name: "description", content: "The most popular Tamil Nadu travel plans, filtered by climate." },
  ]}),
  component: HotPlansPage,
});

interface HotPlan {
  id: string; title: string; summary: string; cover_image: string | null;
  climate: string; interests: string; budget_inr: number;
  days_count: number; total_cost_inr: number; popularity: number;
  rating: number; plan_data: any;
}

const climates = [
  { value: "all", label: "All climates", icon: Flame },
  { value: "cool", label: "Cool / Hills", icon: Mountain },
  { value: "warm", label: "Warm / Plains", icon: Sun },
  { value: "coastal", label: "Coastal / Beach", icon: Waves },
];

function HotPlansPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<HotPlan[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("hot_plans").select("*").order("popularity", { ascending: false }).then(({ data }) => {
      setPlans((data as unknown as HotPlan[]) || []);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() =>
    filter === "all" ? plans : plans.filter((p) => p.climate === filter),
    [plans, filter]
  );

  const addToMyPlans = async (p: HotPlan) => {
    if (!user) { toast.error("Log in to add to My Trips"); navigate({ to: "/login" }); return; }
    setAdding(p.id);
    const { error } = await supabase.from("trip_plans").insert({
      user_id: user.id,
      title: p.title,
      summary: p.summary,
      total_cost_inr: p.total_cost_inr,
      days_count: p.days_count,
      climate: p.climate,
      source_hot_plan_id: p.id,
      plan_data: p.plan_data,
      confirmed: false,
    });
    setAdding(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Added to My Trips!");
  };

  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <Badge className="bg-accent text-accent-foreground"><Flame className="mr-1 h-3 w-3" /> Trending</Badge>
          <h1 className="mt-3 font-display text-4xl font-bold">Hot Plans</h1>
          <p className="mt-2 text-muted-foreground">Hand-picked Tamil Nadu travel plans, ranked by popularity. Filter by climate, add to your trips, then confirm to unlock full guidance.</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {climates.map((c) => {
            const Icon = c.icon;
            const active = filter === c.value;
            return (
              <button key={c.value} onClick={() => setFilter(c.value)}
                className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"}`}>
                <Icon className="h-3 w-3" /> {c.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading plans...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card key={p.id} className="overflow-hidden bg-gradient-card transition-shadow hover:shadow-elegant">
                {p.cover_image && <img src={p.cover_image} alt={p.title} className="aspect-video w-full object-cover" />}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className="capitalize">{p.climate}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />{p.rating} · {p.popularity}+ travelers
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg font-bold text-primary">{formatINR(Number(p.total_cost_inr))}</div>
                      <div className="text-xs text-muted-foreground">{p.days_count} days</div>
                    </div>
                    <Button size="sm" onClick={() => addToMyPlans(p)} disabled={adding === p.id}
                      className="bg-gradient-hero text-primary-foreground">
                      {adding === p.id ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : "Add to My Trips"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
