import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPlace, getCity, formatINR, getHotelsByCity } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, IndianRupee, Hotel as HotelIcon, ExternalLink, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/places/$slug")({
  loader: ({ params }) => {
    const place = getPlace(params.slug);
    if (!place) throw notFound();
    const city = getCity(place.city);
    const nearbyHotels = getHotelsByCity(place.city)
      .filter((h) => !place.hotels.some((ph) => ph.name === h.name))
      .slice(0, 6);
    return { place, city, nearbyHotels };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.place.name} — ${loaderData.city?.name} | Travel Together` },
          { name: "description", content: loaderData.place.shortDesc },
          { property: "og:title", content: loaderData.place.name },
          { property: "og:description", content: loaderData.place.shortDesc },
          { property: "og:image", content: loaderData.place.image },
        ]
      : [],
  }),
  component: PlacePage,
});

function PlacePage() {
  const { place, city, nearbyHotels } = Route.useLoaderData();

  return (
    <div className="bg-gradient-warm">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${place.image})` }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/85 via-foreground/55 to-primary/40" />
        <div className="container mx-auto px-4 py-20 text-primary-foreground md:py-28">
          <Link to="/cities/$slug" params={{ slug: place.city }} className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent hover:underline">
            <MapPin className="h-3 w-3" /> {city?.name}
          </Link>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{place.name}</h1>
          <Badge className={`mt-3 ${place.category === "underrated" ? "bg-primary" : "bg-accent text-accent-foreground"}`}>
            {place.category === "underrated" ? <><Sparkles className="mr-1 h-3 w-3" /> Hidden Gem</> : <><Star className="mr-1 h-3 w-3" /> Iconic</>}
          </Badge>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold">About this place</h2>
          <p className="mt-4 leading-relaxed text-foreground/90">{place.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoCard icon={Calendar} label="Best time" value={place.bestTime} />
            <InfoCard icon={IndianRupee} label="Entry fee" value={place.entryFee === 0 ? "Free" : formatINR(place.entryFee)} />
            <InfoCard icon={MapPin} label="Location" value={city?.name ?? ""} />
          </div>

          {/* Hotels & Lodges */}
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <HotelIcon className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">Suggested Stays</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {place.hotels.map((h: typeof place.hotels[number]) => (
                <Card key={h.name} className="bg-gradient-card">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-semibold">{h.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" /> {h.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-primary">{formatINR(h.pricePerNight)}</div>
                      <div className="text-xs text-muted-foreground">per night</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button asChild className="mt-4 bg-gradient-hero text-primary-foreground">
              <Link to="/bookings">Book a stay or guide</Link>
            </Button>
          </div>

          {/* Nearby Hotels in the same city, sorted by rating */}
          {nearbyHotels.length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-2">
                <HotelIcon className="h-5 w-5 text-accent" />
                <h2 className="font-display text-2xl font-bold">Nearby Hotels in {city?.name}</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">Top-rated stays close to {place.name}, sorted by guest rating.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {nearbyHotels.map((h) => (
                  <Card key={h.name} className="bg-gradient-card">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="min-w-0">
                        <div className="font-semibold">{h.name}</div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">Near {h.placeName}</div>
                        <div className="mt-1 flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-accent text-accent" /> {h.rating}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-base font-bold text-primary">{formatINR(h.pricePerNight)}</div>
                        <div className="text-xs text-muted-foreground">/ night</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/bookings">Search & book lodges</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Map sidebar */}
        <aside className="space-y-4">
          <Card className="bg-gradient-card">
            <CardContent className="p-5">
              <h3 className="mb-3 font-display text-lg font-semibold">Find on map</h3>
              <div className="rounded-lg border border-border bg-secondary/40 p-6 text-center">
                <MapPin className="mx-auto h-12 w-12 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{place.name}, {city?.name}</p>
                <Button asChild className="mt-4 w-full bg-gradient-hero text-primary-foreground">
                  <a href={place.mapsUrl} target="_blank" rel="noopener noreferrer">
                    View on Google Maps <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold">Plan a trip here</h3>
              <p className="mt-1 text-sm text-primary-foreground/90">Let our AI build a custom itinerary including this spot.</p>
              <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/trip-planner" search={{ place: place.slug } as any}>
                  <Sparkles className="mr-2 h-4 w-4" /> Plan with AI
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <Card className="bg-gradient-card">
      <CardContent className="flex items-start gap-3 p-4">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
          <div className="mt-0.5 text-sm font-medium">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
