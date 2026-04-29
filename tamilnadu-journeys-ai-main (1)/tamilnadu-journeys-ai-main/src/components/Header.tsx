import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Mountain, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const baseLinks = [
  { to: "/destinations", label: "Destinations" },
  { to: "/trip-planner", label: "Plan Maker" },
  { to: "/hot-plans", label: "Hot Plans" },
  { to: "/my-trips", label: "My Trips" },
  { to: "/bookings", label: "Bookings" },
  { to: "/safety", label: "Safety" },
  { to: "/community", label: "Community" },
];

export function Header() {
  const { user, signOut, isAdmin, isGuide } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Mountain className="h-6 w-6 text-primary" />
          <span>Travel <span className="text-primary">Together</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {baseLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-accent bg-secondary" }}>
              <Shield className="mr-1 inline h-3 w-3" /> Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  {user.email?.split("@")[0]}
                  {isAdmin && <Badge className="ml-2 bg-accent text-accent-foreground">Admin</Badge>}
                  {!isAdmin && isGuide && <Badge className="ml-2">Guide</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link to="/my-trips">My Trips</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/bookings">My Bookings</Link></DropdownMenuItem>
                {!isGuide && !isAdmin && (
                  <DropdownMenuItem asChild><Link to="/become-guide">Apply as Guide</Link></DropdownMenuItem>
                )}
                {isAdmin && <DropdownMenuItem asChild><Link to="/admin">Admin Panel</Link></DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden gap-2 md:flex">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {baseLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-semibold text-accent hover:bg-secondary">
                <Shield className="mr-1 inline h-3 w-3" /> Admin
              </Link>
            )}
            {user && !isAdmin && !isGuide && (
              <Link to="/become-guide" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                Apply as Guide
              </Link>
            )}
            {user ? (
              <Button variant="outline" onClick={handleLogout} className="mt-2">Sign out</Button>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button asChild variant="outline" className="flex-1"><Link to="/login">Log in</Link></Button>
                <Button asChild className="flex-1 bg-gradient-hero text-primary-foreground"><Link to="/signup">Sign up</Link></Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
