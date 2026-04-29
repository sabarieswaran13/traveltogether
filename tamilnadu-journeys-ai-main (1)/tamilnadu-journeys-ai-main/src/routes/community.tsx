import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cities } from "@/data/destinations";
import { Star, Image as ImageIcon, Video, Send, MessageSquare, Hotel, Bus, User as GuideIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — Travel Together" }, { name: "description", content: "Travelers' photos, videos, ratings, and service reviews from Tamil Nadu trips." }] }),
  component: CommunityPage,
});

interface Post { id: string; user_id: string; city: string; caption: string; media_url: string | null; media_type: string | null; rating: number | null; created_at: string; }
interface Review { id: string; user_id: string; service_type: string; service_name: string; city: string | null; rating: number; comment: string; created_at: string; }

function CommunityPage() {
  return (
    <div className="bg-gradient-warm py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold">Community</h1>
          <p className="mt-2 text-muted-foreground">See what other travelers experienced. Leave reviews on hotels, lodges, buses & guides — help everyone choose better.</p>
        </div>

        <Tabs defaultValue="reviews">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews"><MessageSquare className="mr-2 h-4 w-4" />Service Reviews</TabsTrigger>
            <TabsTrigger value="posts"><ImageIcon className="mr-2 h-4 w-4" />Trip Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6"><ReviewsTab /></TabsContent>
          <TabsContent value="posts" className="mt-6"><PostsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ------------------ REVIEWS ------------------ */
function ReviewsTab() {
  const { user } = useAuth();
  const [items, setItems] = useState<Review[]>([]);
  const [serviceType, setServiceType] = useState<"hotel" | "lodge" | "bus" | "guide">("hotel");
  const [serviceName, setServiceName] = useState("");
  const [city, setCity] = useState(cities[0].slug);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "hotel" | "lodge" | "bus" | "guide">("all");

  const load = () => supabase.from("trip_reviews").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems((data as Review[]) || []));
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please log in"); return; }
    if (!serviceName.trim() || !comment.trim()) { toast.error("Fill all fields"); return; }
    setLoading(true);
    const { error } = await supabase.from("trip_reviews").insert({
      user_id: user.id, service_type: serviceType, service_name: serviceName.trim(),
      city: cities.find((c) => c.slug === city)?.name || city,
      rating, comment: comment.trim(),
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Review posted!");
    setServiceName(""); setComment(""); setRating(5); load();
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.service_type === filter);

  return (
    <div className="space-y-6">
      {user && (
        <Card className="bg-gradient-card"><CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-semibold">Leave a service review</h2>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Service type</Label>
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value as any)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="hotel">Hotel</option><option value="lodge">Lodge</option><option value="bus">Bus</option><option value="guide">Guide</option>
              </select>
            </div>
            <div><Label>Service name</Label><Input required value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Hotel Sangam Madurai" /></div>
            <div>
              <Label>City</Label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <Label>Rating</Label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)}>
                    <Star className={`h-6 w-6 ${n <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2"><Label>Your review</Label><Textarea required maxLength={500} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What was great? What could be better?" /></div>
            <Button type="submit" disabled={loading} className="sm:col-span-2 bg-gradient-hero text-primary-foreground"><Send className="mr-2 h-4 w-4" />Post review</Button>
          </form>
        </CardContent></Card>
      )}

      <div className="flex flex-wrap gap-2">
        {(["all", "hotel", "lodge", "bus", "guide"] as const).map((t) => (
          <Button key={t} size="sm" variant={filter === t ? "default" : "outline"} onClick={() => setFilter(t)} className="capitalize">{t}</Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
        {filtered.map((r) => (
          <Card key={r.id} className="bg-gradient-card"><CardContent className="p-5">
            <div className="flex items-start justify-between gap-2">
              <Badge variant="outline" className="capitalize">
                {r.service_type === "hotel" ? <Hotel className="mr-1 h-3 w-3" /> : r.service_type === "bus" ? <Bus className="mr-1 h-3 w-3" /> : r.service_type === "guide" ? <GuideIcon className="mr-1 h-3 w-3" /> : <Hotel className="mr-1 h-3 w-3" />}
                {r.service_type}
              </Badge>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                ))}
              </div>
            </div>
            <h3 className="mt-2 font-display text-base font-bold">{r.service_name}</h3>
            {r.city && <p className="text-xs text-muted-foreground">{r.city}</p>}
            <p className="mt-2 text-sm">{r.comment}</p>
            <p className="mt-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------ POSTS ------------------ */
function PostsTab() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [city, setCity] = useState(cities[0].slug);
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"none" | "photo" | "video">("none");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please log in"); return; }
    if (!caption.trim()) { toast.error("Add a caption"); return; }
    setLoading(true);
    const { error } = await supabase.from("community_posts").insert({
      user_id: user.id, city, caption: caption.trim(),
      media_url: mediaUrl.trim() || null,
      media_type: mediaUrl.trim() ? mediaType : "none",
      rating,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Posted!");
    setCaption(""); setMediaUrl(""); setMediaType("none"); setRating(5); load();
  };

  return (
    <div className="space-y-6">
      {user ? (
        <Card className="bg-gradient-card"><CardContent className="p-6">
          <h2 className="mb-4 font-display text-xl font-semibold">Share an experience</h2>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>City</Label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <Label>Rating</Label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)}>
                    <Star className={`h-6 w-6 ${n <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2"><Label>Your story</Label><Textarea value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={500} required placeholder="What did you love?" /></div>
            <div><Label>Photo or video URL</Label><Input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://..." /></div>
            <div>
              <Label>Media type</Label>
              <div className="mt-2 flex gap-2">
                <Button type="button" variant={mediaType === "photo" ? "default" : "outline"} size="sm" onClick={() => setMediaType("photo")}><ImageIcon className="mr-1 h-3 w-3" />Photo</Button>
                <Button type="button" variant={mediaType === "video" ? "default" : "outline"} size="sm" onClick={() => setMediaType("video")}><Video className="mr-1 h-3 w-3" />Video</Button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="sm:col-span-2 bg-gradient-hero text-primary-foreground"><Send className="mr-2 h-4 w-4" />Share</Button>
          </form>
        </CardContent></Card>
      ) : (
        <Card className="bg-gradient-card"><CardContent className="p-6 text-center">
          <p>Log in to share your experiences.</p>
          <div className="mt-3 flex justify-center gap-2">
            <Button asChild><Link to="/login">Log in</Link></Button>
            <Button asChild variant="outline"><Link to="/signup">Sign up</Link></Button>
          </div>
        </CardContent></Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {posts.length === 0 && <p className="text-muted-foreground">Be the first to share!</p>}
        {posts.map((p) => {
          const cityName = cities.find((c) => c.slug === p.city)?.name ?? p.city;
          return (
            <Card key={p.id} className="overflow-hidden bg-gradient-card">
              {p.media_url && p.media_type === "photo" && <img src={p.media_url} alt={cityName} className="aspect-video w-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />}
              {p.media_url && p.media_type === "video" && <video src={p.media_url} controls className="aspect-video w-full object-cover" />}
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{cityName}</Badge>
                  {p.rating && (<div className="flex">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`h-3 w-3 ${i < (p.rating ?? 0) ? "fill-accent text-accent" : "text-muted-foreground"}`} />))}</div>)}
                </div>
                <p className="mt-3 text-sm">{p.caption}</p>
                <div className="mt-2 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
