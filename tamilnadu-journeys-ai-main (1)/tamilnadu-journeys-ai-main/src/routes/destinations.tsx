import { createFileRoute, Link } from "@tanstack/react-router";
import { cities } from "@/data/destinations";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations in Tamil Nadu — Travel Together" },
      { name: "description", content: "Explore iconic and hidden destinations across Tamil Nadu — from temple cities to misty hill stations." },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <div className="bg-gradient-warm">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Destinations</h1>
          <p className="mt-3 text-muted-foreground">
            Every corner of Tamil Nadu tells a story. Pick a city to discover its temples, hills, beaches, and hidden corners.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
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
                  <h2 className="mt-1 font-display text-2xl font-bold">{c.name}</h2>
                  <p className="text-sm text-primary-foreground/80">{c.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
