import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";
import { featuredDocuments } from "@/data/documents";

export const DocumentsPreview = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Document Center
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Access official NCA documents, regulations, and reports
                    </p>
                </div>

                {/* Featured Documents */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
                    {featuredDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-sm">{doc.title}</h3>
                                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {doc.date}
                                            </span>
                                        </div>
                                    </div>
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
                        aria-label="View all documents"
                    >
                        <Link to="/documents">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

