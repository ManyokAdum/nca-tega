import {
  Users,
  Vote,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  Shield,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Membership Management",
    description:
      "Register, verify, and manage member profiles with easy payment tracking and status updates.",
  },
  {
    icon: Vote,
    title: "Transparent Elections",
    description:
      "Conduct secure, auditable elections with secret ballots, runoff support, and full audit trails.",
  },
  {
    icon: Calendar,
    title: "Events & Meetings",
    description:
      "Organize events, track attendance, capture minutes, and manage agendas all in one place.",
  },
  {
    icon: FileText,
    title: "Document Center",
    description:
      "Access constitution, regulations, meeting minutes, and reports with version control.",
  },
  {
    icon: CreditCard,
    title: "Fee & Payment Tracking",
    description:
      "Record membership fees, subscriptions, and donations with mobile money support.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Stay informed with SMS and email alerts for meetings, elections, and announcements.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Secure permissions for members, executives, council, and IEC with full audit logs.",
  },
  {
    icon: MessageSquare,
    title: "Communications",
    description:
      "Send announcements, newsletters, and targeted messages to members and groups.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Platform Features
          </span>
          <h2 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Everything NCA Needs to Thrive
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive platform designed for efficient governance,
            transparent elections, and strong community connections.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
