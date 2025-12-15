import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin } from "lucide-react";
import { executiveCommittee, payamRepresentatives } from "@/data/leadership";

// Single shared gradient for all leadership accents
const leadershipGradient = "from-[hsl(278_42%_34%)] to-[hsl(276_46%_30%)]";

const Leadership = () => {

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                                Our Leadership
                            </h1>
                            <p className="text-lg text-primary-foreground/90 md:text-xl">
                                Meet the dedicated leaders guiding NCA towards excellence and empowerment
                            </p>
                        </div>
                    </div>
                </section>

                {/* Executive Committee Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Executive Committee
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Our executive committee comprises dedicated leaders committed to serving
                                the NCA community with transparency and excellence
                            </p>
                        </div>

                        {/* Chairperson - Featured at Top */}
                        {(() => {
                            const chairperson = executiveCommittee.find(m => m.position === "Chairperson");
                            const otherMembers = executiveCommittee.filter(m => m.position !== "Chairperson");
                            
                            if (!chairperson) return null;
                            
                            const ChairpersonIcon = chairperson.icon;
                            
                            return (
                                <>
                                    <div className="mb-12 flex justify-center">
                                        <div className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-background to-muted/30 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                                            {/* Gradient overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${leadershipGradient} opacity-5 transition-opacity duration-300 group-hover:opacity-10`} />
                                            
                                            <div className="relative flex flex-col items-center text-center">
                                                {/* Image or Icon */}
                                                <div className="mb-6 flex justify-center">
                                                    {chairperson.image ? (
                                                        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-border shadow-xl">
                                                            <img
                                                                src={chairperson.image}
                                                                alt={chairperson.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className={`flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${leadershipGradient} shadow-xl`}>
                                                            <ChairpersonIcon className="h-16 w-16 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Name */}
                                                <h3 className="mb-3 font-heading text-2xl font-bold md:text-3xl">
                                                    {chairperson.name}
                                                </h3>

                                                {/* Position */}
                                                <p className={`mb-4 text-lg font-semibold bg-gradient-to-r ${leadershipGradient} bg-clip-text text-transparent`}>
                                                    {chairperson.position}
                                                </p>

                                                {/* Description */}
                                                <p className="text-base text-muted-foreground">
                                                    {chairperson.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other Executive Committee Members */}
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                        {otherMembers.map((member, index) => {
                                            const Icon = member.icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted/30 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                                >
                                                    {/* Gradient overlay */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${leadershipGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

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
                                                                <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${leadershipGradient} shadow-lg`}>
                                                                    <Icon className="h-10 w-10 text-white" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Name */}
                                                        <h3 className="mb-2 text-center font-heading text-xl font-bold">
                                                            {member.name}
                                                        </h3>

                                                        {/* Position */}
                                                        <p className={`mb-3 text-center font-semibold bg-gradient-to-r ${leadershipGradient} bg-clip-text text-transparent`}>
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
                                </>
                            );
                        })()}
                    </div>
                </section>

                {/* Payam Representatives Section */}
                <section className="bg-muted/50 py-16 md:py-24">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Payam Representatives
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Representatives from all 6 Payams ensuring every community voice is heard
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {payamRepresentatives.map((rep, index) => (
                                <div
                                    key={index}
                                    className="group rounded-lg border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="mb-1 font-heading text-base font-semibold">
                                                {rep.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {rep.payam} Payam
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Organizational Structure Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <h2 className="mb-8 text-center font-heading text-3xl font-bold md:text-4xl">
                                Organizational Structure
                            </h2>

                            <div className="space-y-6">
                                <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-lg">
                                    <h3 className="mb-3 font-heading text-xl font-bold text-primary">
                                        Leadership Hierarchy
                                    </h3>
                                    <div className="space-y-2 text-muted-foreground">
                                        <p className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            <strong>General Assembly:</strong> All registered members
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            <strong>Executive Committee:</strong> 13 elected officers
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            <strong>Payam Representatives:</strong> 6 payam delegates
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            <strong>Committees:</strong> Standing and ad-hoc committees
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                    <h3 className="mb-3 font-heading text-xl font-bold">
                                        Term of Office
                                    </h3>
                                    <p className="text-muted-foreground">
                                        All executive committee members serve a term of <strong>three (3) years</strong> and
                                        are eligible for re-election. Elections are conducted through transparent and
                                        democratic processes as outlined in the NCA Constitution.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                    <h3 className="mb-3 font-heading text-xl font-bold">
                                        Meetings & Governance
                                    </h3>
                                    <p className="text-muted-foreground">
                                        The Executive Committee meets regularly to oversee the organization's operations,
                                        make strategic decisions, and ensure accountability to our members. General Assembly
                                        meetings are held to discuss major organizational matters and conduct elections.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Leadership;
