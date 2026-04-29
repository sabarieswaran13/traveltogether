import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, IndianRupee, Calendar, MapPin, Flame, Sun, Mountain, Waves, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { rankPlans, type ScorablePlan } from "@/lib/plan-scoring";
import { formatINR } from "@/data/destinations";
import { toast } from "sonner";

export const Route = createFileRoute("/trip-planner")({
  head: () => ({ meta: [
    { title: "Plan Maker — Travel Together" },
    { name: "description", content: "Find the best Tamil Nadu trip plan based on your budget, days, climate and interests." },
  ]}),
  component: PlannerPage,
});

interface HotPlanRow extends ScorablePlan {
  title: string;
  summary: string;
  cover_image: string | null;
  plan_data: any;
}

const climates = [
  { value: "any", label: "Any climate", icon: Sun },
  { value: "cool", label: "Cool / Hill", icon: Mountain },
  { value: "warm", label: "Warm / Plains", icon: Sun },
  { value: "coastal", label: "Coastal / Beach", icon: Waves },
];

function PlannerPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(4);
  const [interests, setInterests] = useState("");
  const [climate, setClimate] = useState("any");
  const [plans, setPlans] = useState<HotPlanRow[]>([]);
  const [searched, setSearched] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("hot_plans").select("*").then(({ data }) => {
      setPlans((data as unknown as HotPlanRow[]) || []);
    });
  }, []);

  const ranked = useMemo(() => {
    if (!searched) return [];
    return rankPlans(plans, { budget, days, interests, climate }).slice(0, 5);
  }, [plans, budget, days, interests, climate, searched]);

  const findPlans = (e: React.FormEvent) => {
    e.preventDefault();
    if (plans.length === 0) { toast.error("No plans available yet"); return; }
    setSearched(true);
  };

  const addToMyPlans = async (p: HotPlanRow) => {
    if (!user) { toast.error("Log in to add to My Trips"); navigate({ to: "/login" }); return; }
    setAdding(p.id);
    const { error } = await supabase.from("trip_plans").insert({
      user_id: user.id,
      title: p.title,
      summary: p.summary,
      total_cost_inr: p.total_cost_inr,
      days_count: p.days_count,
      budget_inr: budget,
      interests,
      climate,
      source_hot_plan_id: p.id,
      plan_data: p.plan_data,
      confirmed: false,
    });
    setAdding(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Added to My Trips. Open My Trips to compare and confirm.");
  };

  return (
    <div className="bg-gradient-warm py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <Badge className="bg-primary"><Sparkles className="mr-1 h-3 w-3" /> Plan Maker</Badge>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Find your perfect trip</h1>
          <p className="mt-2 text-muted-foreground">Tell us your budget, days, climate & interests. We score curated plans and pick the best matches — no AI required.</p>
        </div>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-6">
            <form onSubmit={findPlans} className="grid gap-4 md:grid-cols-3">
              <div>
                <Label className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />Budget (INR)</Label>
                <Input type="number" min={3000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
              </div>
              <div>
                <Label className="flex items-center gap-1"><Calendar className="h-3 w-3" />Days</Label>
                <Input type="number" min={1} max={14} value={days} onChange={(e) => setDays(Number(e.target.value))} />
              </div>
              <div>
                <Label className="flex items-center gap-1"><MapPin className="h-3 w-3" />Interests</Label>
                <Input value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="temples, hills, beach, food..." />
              </div>
              <div className="md:col-span-3">
                <Label>Preferred climate</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {climates.map((c) => {
                    const Icon = c.icon;
                    const active = climate === c.value;
                    return (
                      <button key={c.value} type="button" onClick={() => setClimate(c.value)}
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"}`}>
                        <Icon className="h-3 w-3" /> {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="md:col-span-3">
                <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground">
                  <Sparkles className="mr-2 h-4 w-4" />Find best plans
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {searched && (
          <div className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
              <Flame className="h-6 w-6 text-accent" /> Best matches for you
            </h2>
            {ranked.length === 0 ? (
              <p className="text-muted-foreground">No plans match yet. Try widening your budget or climate.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {ranked.map((p, i) => (
                  <Card key={p.id} className="overflow-hidden bg-gradient-card transition-shadow hover:shadow-elegant">
                    {p.cover_image && <img src={p.cover_image} alt={p.title} className="aspect-video w-full object-cover" />}
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <Badge className={i === 0 ? "bg-accent text-accent-foreground" : "bg-primary"}>
                          {i === 0 ? "Top match" : `${p.matchScore} pts`}
                        </Badge>
                        <Badge variant="outline" className="capitalize">{p.climate}</Badge>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="font-display text-lg font-bold text-primary">{formatINR(Number(p.total_cost_inr))}</span>
                          <span className="ml-2 text-xs text-muted-foreground">· {p.days_count} days</span>
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
            <div className="mt-6 text-center">
              <Button asChild variant="outline"><Link to="/hot-plans">Browse all Hot Plans</Link></Button>
              <Button asChild className="ml-3 bg-gradient-hero text-primary-foreground"><Link to="/my-trips">Go to My Trips</Link></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
