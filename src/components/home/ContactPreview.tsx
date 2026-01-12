import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { contactInformation } from "@/data/contact";

export const ContactPreview = () => {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Contact Us
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Get in touch with the NCAA leadership team
                    </p>
                </div>

                {/* Contact Information */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto mb-12">
                    {contactInformation.map((contact, index) => {
                        const Icon = contact.icon;
                        return (
                            <div
                                key={index}
                                className="flex gap-4 rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-semibold">{contact.title}</h3>
                                    {contact.link ? (
                                        <a
                                            href={contact.link}
                                            className="text-sm text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline break-all"
                                        >
                                            {contact.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {contact.value}
                                        </p>
                                    )}
                                </div>
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
                        aria-label="View full contact information"
                    >
                        <Link to="/contact">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

