import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCity, getPlacesByCity, getHotelsByCity, formatINR } from "@/data/destinations";
import { MapPin, Sparkles, Star, ArrowRight, Hotel as HotelIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => {
    const city = getCity(params.slug);
    if (!city) throw notFound();
    return { city, places: getPlacesByCity(params.slug), topHotels: getHotelsByCity(params.slug).slice(0, 6) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.city.name} — Travel Together` },
          { name: "description", content: loaderData.city.description },
          { property: "og:title", content: `${loaderData.city.name} — Tamil Nadu` },
          { property: "og:description", content: loaderData.city.description },
          { property: "og:image", content: loaderData.city.image },
        ]
      : [],
  }),
  component: CityPage,
});

function CityPage() {
  const { city, places, topHotels } = Route.useLoaderData();
  const popular = places.filter((p: typeof places[number]) => p.category === "popular");
  const underrated = places.filter((p: typeof places[number]) => p.category === "underrated");

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${city.image})` }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/85 via-foreground/60 to-primary/40" />
        <div className="container mx-auto px-4 py-20 text-primary-foreground md:py-28">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
            <MapPin className="h-3 w-3" /> Tamil Nadu
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-6xl">{city.name}</h1>
          <p className="mt-2 text-lg text-accent">{city.tagline}</p>
          <p className="mt-4 max-w-2xl text-primary-foreground/90">{city.description}</p>
        </div>
      </section>

      {/* HIDDEN GEMS first — they deserve the spotlight */}
      <section className="bg-gradient-warm py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="font-display text-3xl font-bold">Hidden Gems</h2>
          </div>
          <p className="mb-8 max-w-2xl text-muted-foreground">Off-the-tourist-trail spots locals love — quieter, deeper, and just as breathtaking.</p>
          <PlaceGrid places={underrated} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-3">
            <Star className="h-6 w-6 text-accent" />
            <h2 className="font-display text-3xl font-bold">Iconic Sights</h2>
          </div>
          <p className="mb-8 max-w-2xl text-muted-foreground">The places everyone talks about — and for good reason.</p>
          <PlaceGrid places={popular} />
        </div>
      </section>

      {/* Top-rated stays in this city */}
      {topHotels.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center gap-3">
              <HotelIcon className="h-6 w-6 text-primary" />
              <h2 className="font-display text-3xl font-bold">Top-Rated Stays in {city.name}</h2>
            </div>
            <p className="mb-8 max-w-2xl text-muted-foreground">Best lodges and hotels across {city.name}, sorted by guest rating.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {topHotels.map((h) => (
                <Card key={h.name} className="bg-gradient-card">
                  <CardContent className="flex items-center justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <div className="font-display text-base font-semibold">{h.name}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">Near {h.placeName}</div>
                      <div className="mt-1 flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-accent text-accent" /> {h.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-primary">{formatINR(h.pricePerNight)}</div>
                      <div className="text-xs text-muted-foreground">/ night</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button asChild className="mt-6 bg-gradient-hero text-primary-foreground">
              <Link to="/bookings">Search & book stays</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

function PlaceGrid({ places }: { places: ReturnType<typeof getPlacesByCity> }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {places.map((p) => (
        <Link key={p.slug} to="/places/$slug" params={{ slug: p.slug }}>
          <Card className="group h-full overflow-hidden bg-gradient-card transition-all hover:-translate-y-1 hover:shadow-warm">
            <div
              className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${p.image})` }}
            />
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <Badge variant={p.category === "underrated" ? "default" : "secondary"} className={p.category === "underrated" ? "bg-primary" : ""}>
                  {p.category === "underrated" ? "Hidden Gem" : "Iconic"}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.shortDesc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
