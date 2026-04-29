import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, type AppRole } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Travel Together" }, { name: "description", content: "Log in to Travel Together." }] }),
  component: LoginPage,
});

const ROLES: { key: AppRole; label: string }[] = [
  { key: "tourist", label: "Tourist" },
  { key: "guide", label: "Guide" },
  { key: "admin", label: "Admin" },
];

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<AppRole>("tourist");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin" && adminCode.trim() !== "1313") {
      toast.error("Invalid admin code");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) { setLoading(false); toast.error(error); return; }

    // Verify role membership matches the selected tab
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const userRoles = (roles ?? []).map((r: { role: string }) => r.role);
      if (!userRoles.includes(role)) {
        await supabase.auth.signOut();
        setLoading(false);
        toast.error(`This account is not registered as a ${role}.`);
        return;
      }
    }
    setLoading(false);
    toast.success("Welcome back!");
    navigate({ to: role === "admin" ? "/admin" : "/" });
  };

  return (
    <div className="bg-gradient-warm py-16 min-h-[80vh] flex items-center">
      <div className="container mx-auto max-w-md px-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Welcome back</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground">Log in to your account</h1>

            <div className="mt-6 grid grid-cols-3 gap-2 rounded-md border border-border p-1">
              {ROLES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={cn(
                    "rounded px-3 py-2 text-sm font-medium transition-colors",
                    role === r.key ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
              </div>

              {role === "admin" && (
                <div>
                  <Label htmlFor="adminCode" className="text-xs uppercase tracking-wider text-muted-foreground">Admin code</Label>
                  <Input
                    id="adminCode"
                    type="password"
                    required
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Enter the secret admin code"
                    className="mt-1.5"
                  />
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              No account? <Link to="/signup" className="text-primary font-medium underline underline-offset-2">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
