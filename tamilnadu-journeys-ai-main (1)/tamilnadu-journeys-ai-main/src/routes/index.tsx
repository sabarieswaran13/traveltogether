import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cities } from "@/data/destinations";
import { Sparkles, MapPin, Bus, Shield, Users, Compass, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Travel Together — Discover Tamil Nadu" },
      { name: "description", content: "Plan your Tamil Nadu trip with AI. Book private buses, lodges & guides. Stay safe with guardian alerts." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const heroBg = cities[0]?.image;
  const features = [
    { icon: Sparkles, title: "AI Trip Planner", desc: "Tell us your budget & days — we'll craft a Tamil Nadu itinerary in seconds.", to: "/trip-planner" },
    { icon: Bus, title: "Private Bookings", desc: "Reserve private buses, lodges, and tourist guides — pay in INR.", to: "/bookings" },
    { icon: Shield, title: "Safety For You", desc: "Two guardians get your live location every morning & evening.", to: "/safety" },
    { icon: Users, title: "Community", desc: "Share photos, videos, ratings & reviews from fellow travelers.", to: "/community" },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/85 via-foreground/70 to-primary/60" />
        <div className="container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
              <Sparkles className="h-3 w-3" /> AI-powered tourism for Tamil Nadu
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-balance md:text-6xl">
              Travel <em className="text-accent not-italic">together.</em><br />
              Discover the soul of <span className="text-accent">Tamil Nadu</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-primary-foreground/90">
              From Chola temples to misty hill stations, hidden waterfalls to French cafés —
              plan your perfect trip with AI, book everything in one place, and travel with peace of mind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-warm">
                <Link to="/trip-planner">
                  <Sparkles className="mr-2 h-4 w-4" /> Plan with AI
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 bg-primary-foreground/10 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20">
                <Link to="/destinations">
                  <Compass className="mr-2 h-4 w-4" /> Explore Destinations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-warm py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Everything for your journey</h2>
            <p className="mt-3 text-muted-foreground">Plan, book, share, stay safe — all in one place.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link key={f.title} to={f.to}>
                <Card className="group h-full bg-gradient-card transition-all hover:-translate-y-1 hover:shadow-warm">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS PREVIEW */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Iconic destinations</h2>
              <p className="mt-2 text-muted-foreground">Handpicked cities across Tamil Nadu — each with hidden gems.</p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex">
              <Link to="/destinations">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cities.slice(0, 6).map((c) => (
              <Link key={c.slug} to="/cities/$slug" params={{ slug: c.slug }}>
                <div className="group relative overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-warm">
                  <div
                    className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${c.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                    <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-accent">
                      <MapPin className="h-3 w-3" /> Tamil Nadu
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-bold">{c.name}</h3>
                    <p className="text-sm text-primary-foreground/80">{c.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/destinations">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready for your Tamil Nadu adventure?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Sign up free and let our AI craft a personalised trip in under 30 seconds.
          </p>
          <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/signup">Get started — it's free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
