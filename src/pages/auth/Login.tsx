import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const { login } = useAuth();

    // Get the page user was trying to access, or default to /admin
    const from = (location.state as { from?: string })?.from || "/admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(email, password);
            
            if (success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome back to NCAA!",
                });
                // Navigate to the page user was trying to access, or admin dashboard
                navigate(from, { replace: true });
            } else {
                setError("Invalid email or password. Please try again.");
                toast({
                    title: "Login Failed",
                    description: "Invalid email or password.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast({
                title: "Error",
                description: "An error occurred during login.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 font-heading text-3xl font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to your NCAA account</p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@ncatwiceast.org"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-muted-foreground cursor-pointer"
                                >
                                    Remember me for 30 days
                                </label>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/register" className="font-medium text-primary hover:underline">
                                    Join NCAA
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">
                            Need help? Contact us at{" "}
                            <a href="mailto:support@nca-twiceast.org" className="text-primary hover:underline">
                                support@nca-twiceast.org
                            </a>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Demo credentials: admin@ncatwiceast.org / admin123
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
