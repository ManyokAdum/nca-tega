import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User, CreditCard, Calendar, FileText, Award, Settings, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MemberPortal = () => {
    // This would be replaced with actual authentication state
    const isLoggedIn = false;

    const portalFeatures = [
        {
            icon: User,
            title: "Member Profile",
            description: "View and update your personal information and membership details",
            link: "/profile"
        },
        {
            icon: CreditCard,
            title: "Pay Dues",
            description: "Make secure payments for membership dues and contributions",
            link: "/payments"
        },
        {
            icon: Calendar,
            title: "Event Registration",
            description: "RSVP to upcoming events and view your event history",
            link: "/events"
        },
        {
            icon: FileText,
            title: "Documents",
            description: "Access official documents, meeting minutes, and reports",
            link: "/documents"
        },
        {
            icon: Award,
            title: "Certificates",
            description: "View and download your membership certificates",
            link: "/certificates"
        },
        {
            icon: Settings,
            title: "Account Settings",
            description: "Manage your account preferences and notifications",
            link: "/settings"
        }
    ];

    if (!isLoggedIn) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-gradient-hero py-16 md:py-24">
                        <div className="container">
                            <div className="mx-auto max-w-3xl text-center">
                                <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                                    Member Portal
                                </h1>
                                <p className="text-lg text-primary-foreground/90 md:text-xl">
                                    Access your NCA member account and manage your membership
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Login Prompt */}
                    <section className="py-16 md:py-24">
                        <div className="container">
                            <div className="mx-auto max-w-md">
                                <Card>
                                    <CardHeader className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                                <LogIn className="h-8 w-8 text-primary" />
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl">Sign In Required</CardTitle>
                                        <CardDescription>
                                            Please sign in to access your member portal
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button className="w-full" size="lg" asChild>
                                            <Link to="/login">
                                                <LogIn className="mr-2 h-5 w-5" />
                                                Sign In
                                            </Link>
                                        </Button>
                                        <div className="text-center text-sm text-muted-foreground">
                                            Not a member yet?{" "}
                                            <Link to="/membership" className="text-primary hover:underline">
                                                Join NCA
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Portal Features Preview */}
                                <div className="mt-12">
                                    <h3 className="mb-6 text-center font-heading text-xl font-bold">
                                        What You Can Do
                                    </h3>
                                    <div className="space-y-3">
                                        {portalFeatures.map((feature, index) => {
                                            const Icon = feature.icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                                                >
                                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                        <Icon className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-1 font-semibold">{feature.title}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    // Logged in view (for future implementation)
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Dashboard content would go here */}
            </main>
            <Footer />
        </div>
    );
};

export default MemberPortal;

