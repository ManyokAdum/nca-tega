export type UpcomingEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
};

export type PastEvent = {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Monthly General Meeting",
    date: "December 15, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "NCA Hall, Juba",
    attendees: 45,
    description: "Regular monthly meeting to discuss community matters and upcoming initiatives.",
  },
  {
    id: 2,
    title: "Executive Committee Elections",
    date: "January 20, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "NCA Hall, Juba",
    attendees: 150,
    description: "Annual elections for Executive Committee positions. All members encouraged to participate.",
  },
  {
    id: 3,
    title: "Education Fund Fundraiser",
    date: "February 5, 2026",
    time: "4:00 PM - 9:00 PM",
    location: "Community Center",
    attendees: 200,
    description: "Annual fundraising event to support educational scholarships for members.",
  },
];

export const pastEvents: PastEvent[] = [
  {
    id: 4,
    title: "New Year Celebration",
    date: "January 1, 2025",
    location: "NCA Hall, Juba",
    attendees: 180,
  },
  {
    id: 5,
    title: "Quarterly Financial Review",
    date: "November 30, 2025",
    location: "Virtual Meeting",
    attendees: 65,
  },
];



