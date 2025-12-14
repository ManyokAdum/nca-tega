import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { executiveCommittee } from "@/data/leadership";

export const LeadershipPreview = () => {
    // Display only the top 3 executive committee members
    // This data is sourced from the centralized leadership data
    const topThreeLeaders = executiveCommittee.slice(0, 3);

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                        Executive Leadership
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Meet the top leaders guiding NCA towards excellence and empowerment
                    </p>
                </div>

                {/* Leadership Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto max-w-5xl">
                    {topThreeLeaders.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/30 p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Gradient overlay matching Leadership page style */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                                <div className="relative">
                                    {/* Image or Icon */}
                                    <div className="mb-4 flex justify-center">
                                        {member.image ? (
                                            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-border shadow-lg">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${member.color} shadow-lg`}>
                                                <Icon className="h-10 w-10 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h3 className="mb-2 text-center font-heading text-xl font-bold">
                                        {member.name}
                                    </h3>

                                    {/* Position */}
                                    <p className={`mb-3 text-center font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                                        {member.position}
                                    </p>

                                    {/* Description */}
                                    <p className="text-center text-sm text-muted-foreground">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* See More Button */}
                <div className="mt-12 flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group hover:border-primary/50 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label="View all leadership members"
                    >
                        <Link to="/leadership">
                            See More
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

