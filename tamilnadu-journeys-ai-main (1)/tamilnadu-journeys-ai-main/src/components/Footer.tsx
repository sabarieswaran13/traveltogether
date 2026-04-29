import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <Mountain className="h-5 w-5 text-primary" />
            Travel Together
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Discover the soul of Tamil Nadu — temples, hills, beaches, and hidden corners worth your time.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/destinations" className="hover:text-foreground">Destinations</Link></li>
            <li><Link to="/trip-planner" className="hover:text-foreground">AI Trip Planner</Link></li>
            <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/bookings" className="hover:text-foreground">Bus & Lodge Booking</Link></li>
            <li><Link to="/bookings" className="hover:text-foreground">Tourist Guides</Link></li>
            <li><Link to="/safety" className="hover:text-foreground">Safety For You</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Contact</h4>
          <p className="text-sm text-muted-foreground">help@traveltogether.in</p>
          <p className="text-sm text-muted-foreground">+91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Travel Together · Made with love for Tamil Nadu
      </div>
    </footer>
  );
}
