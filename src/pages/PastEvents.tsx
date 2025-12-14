import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, MapPin, Users } from "lucide-react";
import { pastEvents } from "@/data/events";

const PastEvents = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-secondary py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-heading text-4xl font-bold text-brand-primary-800 md:text-5xl">
                Past Events
              </h1>
              <p className="text-lg text-brand-primary-800/80 md:text-xl">
                Highlights from recent gatherings and milestones.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container space-y-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-3 font-heading text-xl font-bold">{event.title}</h3>
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PastEvents;



