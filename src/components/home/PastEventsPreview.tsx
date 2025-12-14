import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { pastEvents } from "@/data/events";

export const PastEventsPreview = () => {
    // Show only the first 2 past events
    const previewEvents = pastEvents.slice(0, 2);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Past Events
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Highlights from recent gatherings and milestones
                    </p>
                </div>

                {/* Events List */}
                <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto mb-12">
                    {previewEvents.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <h3 className="mb-3 font-heading text-lg font-bold">{event.title}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{event.attendees} attended</span>
                                </div>
                            </div>
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
                        aria-label="View all past events"
                    >
                        <Link to="/events/past">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

