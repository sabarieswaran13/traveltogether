import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cities, formatINR } from "@/data/destinations";
import { Bus, Hotel, User, Loader2, Star, Clock, ArrowRight, Search, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — Travel Together" }, { name: "description", content: "Book buses, lodges and tourist guides across Tamil Nadu." }] }),
  component: BookingsPage,
});

interface AdminBus { id: string; operator: string; from_city: string; to_city: string; departure_time: string; arrival_time: string; price: number; bus_type: string; total_seats: number; }
interface AdminLodge { id: string; name: string; city: string; price_per_night: number; rating: number; amenities: string | null; }
interface AdminHotel { id: string; name: string; city: string; price_per_night: number; rating: number; amenities: string | null; }

interface BookingDraft {
  type: "bus" | "lodge" | "hotel" | "guide";
  itemName: string;
  city: string;
  amount: number;
  notes: string;
  defaultDate?: string;
  travelers?: number;
  serviceId?: string;
}

function BookingsPage() {
  const { user } = useAuth();
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Sign in to book</h1>
        <p className="mt-2 text-muted-foreground">Free account. Book buses, lodges, hotels and guides.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><Link to="/login">Log in</Link></Button>
          <Button asChild variant="outline"><Link to="/signup">Sign up</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="font-display text-4xl font-bold">Bookings</h1>
        <p className="mt-2 text-muted-foreground">Search buses by route, find lodges and hotels by destination, or hire a guide.</p>

        <Tabs defaultValue="bus" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bus"><Bus className="mr-2 h-4 w-4" />Bus</TabsTrigger>
            <TabsTrigger value="lodge"><Hotel className="mr-2 h-4 w-4" />Lodge</TabsTrigger>
            <TabsTrigger value="hotel"><Hotel className="mr-2 h-4 w-4" />Hotel</TabsTrigger>
            <TabsTrigger value="guide"><User className="mr-2 h-4 w-4" />Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="bus"><BusSearch onBook={setDraft} /></TabsContent>
          <TabsContent value="lodge"><LodgeSearch type="lodge" onBook={setDraft} /></TabsContent>
          <TabsContent value="hotel"><LodgeSearch type="hotel" onBook={setDraft} /></TabsContent>
          <TabsContent value="guide"><GuideForm onBook={setDraft} /></TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold">Your bookings</h2>
          <BookingsList />
        </div>
      </div>

      {draft && <BookingFormDialog draft={draft} onClose={() => setDraft(null)} />}
    </div>
  );
}

/* ---------- BUS SEARCH (uses admin_buses table) ---------- */
function BusSearch({ onBook }: { onBook: (d: BookingDraft) => void }) {
  const [from, setFrom] = useState(cities[0].slug);
  const [to, setTo] = useState(cities[1].slug);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<AdminBus[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) { toast.error("From and To must differ"); return; }
    if (!date) { toast.error("Pick a travel date"); return; }
    setLoading(true);
    const fromName = labelOf(from), toName = labelOf(to);
    const { data } = await supabase.from("admin_buses").select("*")
      .ilike("from_city", `%${fromName}%`).ilike("to_city", `%${toName}%`)
      .order("price", { ascending: true });
    setResults((data as AdminBus[]) || []);
    setSearched(true); setLoading(false);
  };

  return (
    <Card className="bg-gradient-card mt-4"><CardContent className="p-6">
      <form onSubmit={onSearch} className="grid gap-4 sm:grid-cols-5">
        <div><Label>From</Label><CitySelect value={from} onChange={setFrom} /></div>
        <div><Label>To</Label><CitySelect value={to} onChange={setTo} /></div>
        <div><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div><Label>Travelers</Label><Input type="number" min={1} max={20} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} /></div>
        <div className="flex items-end"><Button type="submit" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground">{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}Search</Button></div>
      </form>

      {searched && (
        <div className="mt-6">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-display text-lg font-semibold">{results.length} buses · {labelOf(from)} <ArrowRight className="inline h-4 w-4" /> {labelOf(to)}</h3>
            <span className="text-xs text-muted-foreground">Sorted by cheapest first</span>
          </div>
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No buses on this route yet. Admin can add buses in the admin panel.</p>
          ) : (
            <div className="space-y-3">
              {results.map((b, i) => {
                const total = b.price * travelers;
                return (
                  <div key={b.id} className="rounded-lg border border-border bg-background/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-semibold">{b.operator}</span>
                          {i === 0 && <Badge className="bg-jungle">Cheapest</Badge>}
                        </div>
                        <div className="mt-0.5 text-sm text-muted-foreground">{b.bus_type}</div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span className="font-medium">{b.departure_time}</span>
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{b.arrival_time}</span>
                          <span className="text-xs text-muted-foreground">{b.total_seats} total seats</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-display text-xl font-bold text-primary">{formatINR(b.price)}</div>
                          <div className="text-xs text-muted-foreground">per seat</div>
                        </div>
                        <Button onClick={() => onBook({
                          type: "bus", itemName: `${b.operator} · ${b.bus_type}`,
                          city: `${labelOf(from)} → ${labelOf(to)}`, amount: total, travelers,
                          notes: `${b.departure_time}–${b.arrival_time}`, defaultDate: date, serviceId: b.id,
                        })} className="bg-gradient-hero text-primary-foreground">
                          Book · {formatINR(total)}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </CardContent></Card>
  );
}

/* ---------- LODGE / HOTEL SEARCH (uses admin tables) ---------- */
function LodgeSearch({ type, onBook }: { type: "lodge" | "hotel"; onBook: (d: BookingDraft) => void }) {
  const [city, setCity] = useState(cities[0].slug);
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(1);
  const [travelers, setTravelers] = useState(2);
  const [items, setItems] = useState<AdminLodge[] | AdminHotel[]>([]);

  useEffect(() => {
    const cityName = labelOf(city);
    const tbl = type === "lodge" ? "admin_lodges" : "admin_hotels";
    supabase.from(tbl).select("*").ilike("city", `%${cityName}%`).order("rating", { ascending: false }).then(({ data }) => {
      setItems((data as any) || []);
    });
  }, [city, type]);

  return (
    <Card className="bg-gradient-card mt-4"><CardContent className="p-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div><Label>Destination</Label><CitySelect value={city} onChange={setCity} /></div>
        <div><Label>Check-in</Label><Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></div>
        <div><Label>Nights</Label><Input type="number" min={1} max={30} value={nights} onChange={(e) => setNights(Number(e.target.value))} /></div>
        <div><Label>Travelers</Label><Input type="number" min={1} max={20} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} /></div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-display text-lg font-semibold">Top-rated {type === "lodge" ? "lodges" : "hotels"} in {labelOf(city)}</h3>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No {type}s listed for this city yet.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((h: any) => {
              const total = h.price_per_night * nights;
              return (
                <div key={h.id} className="rounded-lg border border-border bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-base font-semibold">{h.name}</div>
                      {h.amenities && <div className="mt-0.5 text-xs text-muted-foreground">{h.amenities}</div>}
                      <div className="mt-2 flex items-center gap-1 text-sm"><Star className="h-3 w-3 fill-accent text-accent" /> {h.rating} / 5</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-primary">{formatINR(h.price_per_night)}</div>
                      <div className="text-xs text-muted-foreground">/ night</div>
                    </div>
                  </div>
                  <Button onClick={() => {
                    if (!checkIn) { toast.error("Pick a check-in date"); return; }
                    onBook({
                      type, itemName: h.name, city: labelOf(city), amount: total, travelers,
                      notes: `${nights} night(s)`, defaultDate: checkIn, serviceId: h.id,
                    });
                  }} className="mt-3 w-full bg-gradient-hero text-primary-foreground">
                    Book {nights} night{nights > 1 ? "s" : ""} · {formatINR(total)}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </CardContent></Card>
  );
}

/* ---------- GUIDE FORM ---------- */
function GuideForm({ onBook }: { onBook: (d: BookingDraft) => void }) {
  const [city, setCity] = useState(cities[0].slug);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const base = 1500;
  const amount = base * travelers;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { toast.error("Pick a date"); return; }
    onBook({
      type: "guide", itemName: "Tourist Guide (per day)",
      city: labelOf(city), amount, travelers, notes: "", defaultDate: date,
    });
  };
  return (
    <Card className="bg-gradient-card mt-4"><CardContent className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gradient-hero p-2 text-primary-foreground"><User className="h-5 w-5" /></div>
        <div>
          <div className="font-display text-lg font-semibold">Tourist Guide</div>
          <div className="text-sm text-muted-foreground">Starting from {formatINR(base)} per traveler / day</div>
        </div>
      </div>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <div><Label>City</Label><CitySelect value={city} onChange={setCity} /></div>
        <div><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div><Label>Travelers</Label><Input type="number" min={1} max={50} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} /></div>
        <div><Label>Total amount</Label><div className="mt-1 rounded-md border border-input bg-secondary px-3 py-2 font-semibold text-primary">{formatINR(amount)}</div></div>
        <Button type="submit" className="sm:col-span-2 bg-gradient-hero text-primary-foreground">Continue · {formatINR(amount)}</Button>
      </form>
    </CardContent></Card>
  );
}

/* ---------- BOOKING FORM DIALOG (the requested form) ---------- */
function BookingFormDialog({ draft, onClose }: { draft: BookingDraft; onClose: () => void }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(draft.defaultDate || "");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [idProof, setIdProof] = useState("Aadhaar");
  const [notes, setNotes] = useState(draft.notes);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please log in"); return; }
    if (!date) { toast.error("Pick a date"); return; }
    if (!/^\+?\d[\d\s-]{6,}$/.test(phone)) { toast.error("Enter a valid phone"); return; }
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: draft.type,
      item_name: draft.itemName,
      city: draft.city,
      travel_date: date,
      travelers: draft.travelers || 1,
      amount_inr: draft.amount,
      notes: notes || null,
      traveler_name: name,
      email,
      phone,
      payment_method: paymentMethod,
      id_proof: idProof,
      service_id: draft.serviceId || null,
      status: "confirmed",
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`Booking confirmed: ${draft.itemName}`);
    window.dispatchEvent(new CustomEvent("bookings-updated"));
    onClose();
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking details</DialogTitle>
          <p className="text-sm text-muted-foreground">{draft.itemName} · {draft.city} · <span className="font-semibold text-primary">{formatINR(draft.amount)}</span></p>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <div><Label>Full name</Label><Input required value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Email</Label><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label>Phone</Label><Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98XXXXXXXX" /></div>
          <div><Label>Travel date</Label><Input required type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          <div>
            <Label>Payment method</Label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>UPI</option><option>Credit Card</option><option>Debit Card</option><option>Net Banking</option><option>Cash on arrival</option>
            </select>
          </div>
          <div>
            <Label>ID proof type</Label>
            <select value={idProof} onChange={(e) => setIdProof(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Aadhaar</option><option>PAN</option><option>Driving License</option><option>Passport</option><option>Voter ID</option>
            </select>
          </div>
          <div className="sm:col-span-2"><Label>Notes (optional)</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Special requests, traveler details..." /></div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={submit} disabled={busy} className="bg-gradient-hero text-primary-foreground">
            {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
            Confirm booking · {formatINR(draft.amount)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CitySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
      {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
    </select>
  );
}
const labelOf = (slug: string) => cities.find((c) => c.slug === slug)?.name ?? slug;

function BookingsList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setItems(data || []); setLoading(false);
  };
  useEffect(() => {
    load();
    const h = () => load();
    window.addEventListener("bookings-updated", h);
    return () => window.removeEventListener("bookings-updated", h);
  }, []);
  if (loading) return <p className="mt-4 text-sm text-muted-foreground">Loading...</p>;
  if (!items.length) return <p className="mt-4 text-sm text-muted-foreground">No bookings yet.</p>;
  return (
    <div className="mt-4 space-y-3">
      {items.map((b) => (
        <Card key={b.id} className="bg-gradient-card">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="font-semibold">{b.item_name} · {b.city}</div>
              <div className="text-sm text-muted-foreground">{b.travel_date} · {b.travelers} traveler(s){b.notes ? ` · ${b.notes}` : ""}</div>
              {b.traveler_name && <div className="text-xs text-muted-foreground">{b.traveler_name} · {b.phone} · {b.payment_method}</div>}
            </div>
            <div className="text-right">
              <Badge className={b.status === "confirmed" ? "bg-jungle" : ""}>{b.status}</Badge>
              <div className="mt-1 font-display text-lg font-bold text-primary">{formatINR(Number(b.amount_inr))}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
