import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, type AppRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Travel Together" }, { name: "description", content: "Create your Travel Together account." }] }),
  component: SignupPage,
});

const ROLES: { key: AppRole; label: string }[] = [
  { key: "tourist", label: "Tourist" },
  { key: "guide", label: "Guide" },
  { key: "admin", label: "Admin" },
];

function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<AppRole>("tourist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (role === "admin" && adminCode.trim() !== "1313") { toast.error("Invalid admin code"); return; }
    setLoading(true);
    const { error } = await signUp(email, password, name, role, role === "admin" ? adminCode : undefined);
    setLoading(false);
    if (error) { toast.error(error); return; }
    toast.success(
      role === "guide"
        ? "Account created! You can now apply with full guide details."
        : role === "admin"
        ? "Admin account created!"
        : "Account created! Welcome aboard."
    );
    navigate({ to: "/" });
  };

  return (
    <div className="bg-gradient-warm py-16 min-h-[80vh] flex items-center">
      <div className="container mx-auto max-w-md px-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Begin your journey</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground">Create your account</h1>

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
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Full name</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
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
                  <p className="mt-1 text-xs text-muted-foreground">Required to register as an administrator.</p>
                </div>
              )}

              {role === "guide" && (
                <p className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                  After signup, complete your guide application from the "Become a guide" page so admins can verify your profile.
                </p>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Have an account? <Link to="/login" className="text-primary font-medium underline underline-offset-2">Log in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
