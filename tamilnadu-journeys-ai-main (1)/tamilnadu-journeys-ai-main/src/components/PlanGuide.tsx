import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/data/destinations";
import { IndianRupee, MapPin, Sun, Cloud, Moon, Hotel, Lightbulb, Backpack, Bus, ShieldCheck, Wallet, Languages, Phone } from "lucide-react";

export interface DayPlan {
  day: number; city: string; title: string;
  morning: string; afternoon: string; evening: string;
  stay: string; estimatedCost: number; tips: string;
}
export interface Plan {
  title: string; summary: string; totalEstimatedCost: number;
  days: DayPlan[]; packing: string[];
}

export function PlanGuide({ plan, headerSlot }: { plan: Plan; headerSlot?: React.ReactNode }) {
  const cities = Array.from(new Set(plan.days.map((d) => d.city)));
  const avgPerDay = Math.round(plan.totalEstimatedCost / Math.max(plan.days.length, 1));

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{plan.title}</h2>
              <p className="mt-2 text-primary-foreground/90">{plan.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Stat icon={<IndianRupee className="h-3 w-3" />} label={`${formatINR(plan.totalEstimatedCost)} total`} />
                <Stat icon={<Wallet className="h-3 w-3" />} label={`${formatINR(avgPerDay)} / day avg`} />
                <Stat icon={<MapPin className="h-3 w-3" />} label={`${cities.length} cit${cities.length > 1 ? "ies" : "y"}`} />
                <Stat icon={<Sun className="h-3 w-3" />} label={`${plan.days.length} day${plan.days.length > 1 ? "s" : ""}`} />
              </div>
            </div>
            {headerSlot}
          </div>
        </CardContent>
      </Card>

      {/* Travel guidance */}
      <Card className="bg-gradient-card">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-bold">Full travel guidance</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Guide icon={<Bus className="h-4 w-4 text-primary" />} title="Getting around" text={`Use TNSTC / private buses between ${cities.slice(0, 3).join(", ")}. Pre-book on Bookings tab for the cheapest 8 options. Auto-rickshaws inside cities — agree on fare before boarding.`} />
            <Guide icon={<Hotel className="h-4 w-4 text-primary" />} title="Where to stay" text="Each day's stay is suggested below. Top-rated lodges per city are listed in Bookings → Lodge. Book at least 1 day in advance during weekends." />
            <Guide icon={<ShieldCheck className="h-4 w-4 text-primary" />} title="Safety" text="Add guardians in Safety For You and share your live location + day plan via WhatsApp. Carry a printed copy of bookings. Avoid late-night travel between cities." />
            <Guide icon={<Languages className="h-4 w-4 text-primary" />} title="Language & culture" text="Tamil is primary; English widely understood in tourist zones. Cover shoulders/knees at temples. Remove footwear before entering shrines." />
            <Guide icon={<Wallet className="h-4 w-4 text-primary" />} title="Money" text="UPI is accepted almost everywhere (GPay/PhonePe). Carry ₹1,000–₹2,000 cash for small lodges, autos, temple offerings." />
            <Guide icon={<Phone className="h-4 w-4 text-primary" />} title="Emergency" text="Police 100 · Ambulance 108 · Tourist helpline 1363. Save offline maps for hill regions (Ooty, Kodaikanal, Yercaud)." />
          </div>
        </CardContent>
      </Card>

      {plan.days.map((d) => (
        <Card key={d.day} className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge className="mb-2 bg-primary">Day {d.day} · {d.city}</Badge>
                <h3 className="font-display text-xl font-bold">{d.title}</h3>
              </div>
              <div className="text-right">
                <div className="font-display text-lg font-bold text-primary">{formatINR(d.estimatedCost)}</div>
                <div className="text-xs text-muted-foreground">day cost</div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Slot icon={<Sun className="h-4 w-4 text-accent" />} label="Morning" value={d.morning} />
              <Slot icon={<Cloud className="h-4 w-4 text-primary" />} label="Afternoon" value={d.afternoon} />
              <Slot icon={<Moon className="h-4 w-4 text-jungle" />} label="Evening" value={d.evening} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-secondary/60 p-3 text-sm"><Hotel className="mr-1 inline h-4 w-4 text-primary" /><span className="font-semibold">Stay: </span>{d.stay}</div>
              <div className="rounded-lg bg-accent/20 p-3 text-sm"><Lightbulb className="mr-1 inline h-4 w-4 text-accent" /><span className="font-semibold">Tip: </span>{d.tips}</div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-card">
        <CardContent className="p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold"><Backpack className="h-5 w-5 text-primary" />Packing list</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {plan.packing.map((i, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {i}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1">{icon}{label}</span>;
}
function Slot({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">{icon}{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}
function Guide({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 p-4">
      <div className="flex items-center gap-2 font-semibold">{icon}{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
