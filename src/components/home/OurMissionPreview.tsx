import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { aboutData } from "@/data/about";

export const OurMissionPreview = () => {
    // This content is sourced directly from the centralized about data
    // Any changes to aboutData will automatically reflect here and on the About page
    const { heading: missionHeading, paragraphs } = aboutData.mission;
    const missionFirstParagraph = paragraphs[0];

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                <div className="mx-auto max-w-4xl">
                    {/* Section Header */}
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                            {missionHeading}
                        </h2>
                    </div>

                    {/* Mission Content */}
                    <div className="rounded-xl border border-border bg-background p-8 md:p-12 shadow-sm">
                        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                            {missionFirstParagraph}
                        </p>

                        {/* See More Button */}
                        <div className="flex justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="group"
                                aria-label="Learn more about NCAA's mission"
                            >
                                <Link to="/about" className="flex items-center gap-2">
                                    See More
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

