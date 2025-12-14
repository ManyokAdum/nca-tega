import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { constitutionHighlights } from "@/data/governance";

export const GovernancePreview = () => {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Governance & Regulations
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Transparency, accountability, and democratic principles guide our operations
                    </p>
                </div>

                {/* Constitutional Framework */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                    {constitutionHighlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <h3 className="mb-2 text-center font-heading text-lg font-bold">
                                    {item.title}
                                </h3>
                                <p className="text-center text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* See More Button */}
                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="Learn more about NCA governance"
                    >
                        <Link to="/governance">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

