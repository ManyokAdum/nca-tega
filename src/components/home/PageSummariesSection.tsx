import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Crown,
    Scale,
    UserPlus,
    Vote,
    Calendar,
    FileText,
    Mail,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractPagePreview, PagePreviewData } from "@/utils/pagePreviewExtractor";

// Import Page Components for extraction
import About from "@/pages/About";
import Leadership from "@/pages/Leadership";
import Governance from "@/pages/Governance";
import Membership from "@/pages/Membership";
import Elections from "@/pages/Elections";
import Events from "@/pages/Events";
import UpcomingEvents from "@/pages/UpcomingEvents";
import PastEvents from "@/pages/PastEvents";
import Documents from "@/pages/Documents";
import Contact from "@/pages/Contact";

interface PageConfig {
    component: React.ComponentType;
    route: string;
    icon: React.ElementType;
    color: string;
}

const pageConfigs: PageConfig[] = [
    {
        component: About,
        route: "/about",
        icon: Users,
        color: "from-blue-500 to-cyan-500"
    },
    {
        component: Leadership,
        route: "/leadership",
        icon: Crown,
        color: "from-purple-500 to-pink-500"
    },
    {
        component: Governance,
        route: "/governance",
        icon: Scale,
        color: "from-green-500 to-emerald-500"
    },
    {
        component: Membership,
        route: "/membership",
        icon: UserPlus,
        color: "from-amber-500 to-orange-500"
    },
    {
        component: Elections,
        route: "/elections",
        icon: Vote,
        color: "from-rose-500 to-pink-500"
    },
    {
        component: Events,
        route: "/events",
        icon: Calendar,
        color: "from-indigo-500 to-purple-500"
    },
    {
        component: UpcomingEvents,
        route: "/events/upcoming",
        icon: Calendar,
        color: "from-indigo-400 to-blue-500"
    },
    {
        component: PastEvents,
        route: "/events/past",
        icon: Calendar,
        color: "from-purple-400 to-fuchsia-500"
    },
    {
        component: Documents,
        route: "/documents",
        icon: FileText,
        color: "from-teal-500 to-green-500"
    },
    {
        component: Contact,
        route: "/contact",
        icon: Mail,
        color: "from-cyan-500 to-blue-500"
    }
];

interface ExtractedPreview extends PagePreviewData {
    icon: React.ElementType;
    color: string;
}

export const PageSummariesSection = () => {
    const [previews, setPreviews] = useState<ExtractedPreview[]>([]);

    useEffect(() => {
        // Feature flag for safety
        const enablePagePreviews = true; // Could be env var: import.meta.env.VITE_ENABLE_PAGE_PREVIEWS

        if (enablePagePreviews) {
            const loadPreviews = () => {
                const extractedData = pageConfigs.map(config => {
                    const preview = extractPagePreview(config.component, config.route);
                    return {
                        ...preview,
                        icon: config.icon,
                        color: config.color
                    };
                });
                setPreviews(extractedData);
            };

            // Non-blocking execution
            setTimeout(loadPreviews, 0);
        }
    }, []);

    if (previews.length === 0) {
        return null; // Don't render empty section while extracting or if disabled
    }

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Discover Our Community
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Explore the various aspects of our organization and how we work together.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {previews.map((page) => {
                        const Icon = page.icon;
                        return (
                            <div
                                key={page.url}
                                className="ag-page-preview group relative flex flex-col items-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background to-muted/30 p-6 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Gradient overlay effect similar to Leadership cards */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

                                <div className="relative z-10 flex flex-1 flex-col items-center text-center">
                                    <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${page.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                                        <Icon className="h-10 w-10 text-white" />
                                    </div>

                                    <h3 className="mb-3 font-heading text-xl font-bold">
                                        {page.title}
                                    </h3>

                                    <p className="mb-6 text-sm text-muted-foreground line-clamp-4">
                                        {page.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="group-hover:border-primary/50 group-hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                            aria-label={`See more about ${page.title}`}
                                        >
                                            <Link to={page.url} className="flex items-center gap-2">
                                                See more
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
