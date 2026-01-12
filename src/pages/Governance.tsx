import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
    BookOpen,
    Vote,
    Users,
    FileCheck,
    Calendar,
    Scale,
    Download,
    CheckCircle
} from "lucide-react";
import { constitutionHighlights } from "@/data/governance";

const Governance = () => {

    const committees = [
        {
            name: "Education Committee",
            purpose: "Oversees scholarship programs and educational initiatives for members",
            members: "5-7 members"
        },
        {
            name: "Welfare Committee",
            purpose: "Provides support during times of need including bereavement and emergencies",
            members: "5-7 members"
        },
        {
            name: "Finance Committee",
            purpose: "Reviews budgets, audits accounts, and ensures financial accountability",
            members: "5-7 members"
        },
        {
            name: "Events & Programs Committee",
            purpose: "Plans and coordinates community events, fundraisers, and cultural programs",
            members: "5-7 members"
        },
        {
            name: "Membership Committee",
            purpose: "Manages registration, renewals, and member engagement",
            members: "3-5 members"
        },
        {
            name: "Communications Committee",
            purpose: "Handles public relations, social media, and internal communications",
            members: "3-5 members"
        }
    ];

    const membershipCategories = [
        {
            category: "Full Membership",
            requirements: [
                "Must be a woman from Twic East County",
                "Age 18 years and above",
                "Payment of annual membership dues",
                "Commitment to NCAA values and objectives"
            ],
            benefits: [
                "Voting rights in elections and general meetings",
                "Eligibility to hold office",
                "Access to welfare support",
                "Educational scholarship opportunities",
                "Participation in all NCAA events and programs"
            ]
        },
        {
            category: "Associate Membership",
            requirements: [
                "Supporters and friends of NCAA",
                "Payment of associate membership fee",
                "Endorsement by two full members"
            ],
            benefits: [
                "Attendance at NCAA events",
                "Limited participation in programs",
                "No voting rights",
                "No eligibility to hold office"
            ]
        }
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                                Governance & Regulations
                            </h1>
                            <p className="text-lg text-primary-foreground/90 md:text-xl">
                                Transparency, accountability, and democratic principles guide our operations
                            </p>
                        </div>
                    </div>
                </section>

                {/* Constitution Highlights */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Constitutional Framework
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Our constitution establishes the foundation for democratic governance and member rights
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {constitutionHighlights.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
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
                    </div>
                </section>

                {/* Membership Requirements */}
                <section className="bg-muted/50 py-16 md:py-24">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Membership Categories
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Different membership levels designed to serve our diverse community
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                            {membershipCategories.map((membership, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border-2 border-primary/20 bg-background p-6 shadow-lg"
                                >
                                    <h3 className="mb-4 font-heading text-2xl font-bold text-primary">
                                        {membership.category}
                                    </h3>

                                    <div className="mb-4">
                                        <h4 className="mb-2 font-semibold">Requirements:</h4>
                                        <ul className="space-y-1">
                                            {membership.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="mb-2 font-semibold">Benefits:</h4>
                                        <ul className="space-y-1">
                                            {membership.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Committees */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Standing Committees
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                                Specialized committees dedicated to specific areas of our mission
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {committees.map((committee, index) => (
                                <div
                                    key={index}
                                    className="group rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <h3 className="font-heading text-lg font-bold">
                                            {committee.name}
                                        </h3>
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="mb-3 text-sm text-muted-foreground">
                                        {committee.purpose}
                                    </p>
                                    <p className="text-xs font-medium text-primary">
                                        {committee.members}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Election Procedures */}
                <section className="bg-muted/50 py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <h2 className="mb-8 text-center font-heading text-3xl font-bold md:text-4xl">
                                Election Procedures
                            </h2>

                            <div className="space-y-6">
                                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-xl font-bold">
                                            Election Schedule
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Elections are held every <strong>three (3) years</strong>. Notice of elections
                                        must be given at least 60 days in advance. Nominations open 30 days before the
                                        election date, and all eligible members receive voting information.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                            <Vote className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-xl font-bold">
                                            Voting Rights
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        All full members in good standing are eligible to vote and be elected.
                                        Voting is conducted by secret ballot to ensure fairness and confidentiality.
                                        Each member has one vote per position.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                            <FileCheck className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-xl font-bold">
                                            Electoral Commission
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        An independent Electoral Commission is appointed by the General Assembly to
                                        oversee the election process, verify nominations, supervise voting, and
                                        announce results. The commission ensures transparency and fairness throughout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documents Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
                                    <BookOpen className="h-10 w-10 text-white" />
                                </div>
                            </div>
                            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                                Official Documents
                            </h2>
                            <p className="mb-8 text-lg text-muted-foreground">
                                Access our constitution, bylaws, and official regulations
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
                                    <Download className="h-5 w-5" />
                                    NCAA Constitution
                                </button>
                                <button className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-background px-6 py-3 font-semibold text-primary shadow-sm transition-all hover:bg-primary/5 hover:shadow-md">
                                    <Download className="h-5 w-5" />
                                    Regulations 2024
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Governance;
