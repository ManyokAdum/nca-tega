import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { electionProcess } from "@/data/elections";

export const ElectionsPreview = () => {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Elections
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Transparent, auditable elections with full democratic participation
                    </p>
                </div>

                {/* Election Process */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto mb-12">
                    {electionProcess.map((item) => (
                        <div key={item.step} className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="mb-2 font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="Learn more about elections"
                    >
                        <Link to="/elections">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

