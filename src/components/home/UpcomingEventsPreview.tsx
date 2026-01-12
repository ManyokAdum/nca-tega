import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { upcomingEvents } from "@/data/events";

export const UpcomingEventsPreview = () => {
    // Show only the first 2 upcoming events
    const previewEvents = upcomingEvents.slice(0, 2);

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Upcoming Events
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Stay connected with NCAA meetings, celebrations, and community gatherings
                    </p>
                </div>

                {/* Events List */}
                <div className="space-y-6 max-w-4xl mx-auto mb-12">
                    {previewEvents.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <h3 className="mb-3 font-heading text-xl font-bold">{event.title}</h3>
                            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>{event.location}</span>
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
                        className="group"
                        aria-label="View all upcoming events"
                    >
                        <Link to="/events/upcoming">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

