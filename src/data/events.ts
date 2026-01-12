import annualImage from "@/images/annual.jpg";
import nca2Image from "@/images/nca2.jpg";
import ncaReportImage from "@/images/nca-report.jpeg";

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
  image?: string;
  description?: string;
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: "Monthly General Meeting",
    date: "December 15, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "NCAA Hall, Juba",
    attendees: 45,
    description: "Regular monthly meeting to discuss community matters and upcoming initiatives.",
  },
  {
    id: 2,
    title: "Executive Committee Elections",
    date: "January 20, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "NCAA Hall, Juba",
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
    id: 3,
    title: "NCAA Annual Trade Fair",
    date: "December 15, 2024",
    location: "NCAA Hall, Juba",
    attendees: 250,
    image: annualImage,
    description: "A vibrant showcase of local businesses and entrepreneurs from the Nuer community. The event featured over 50 vendors displaying traditional crafts, modern products, and services. Attendees enjoyed cultural performances, networking opportunities, and business development workshops. The fair successfully promoted economic empowerment and strengthened community bonds.",
  },
  {
    id: 4,
    title: "New Year Celebration",
    date: "January 1, 2025",
    location: "NCAA Hall, Juba",
    attendees: 180,
    image: nca2Image,
    description: "A joyous gathering to welcome the new year with traditional Nuer music, dance, and cultural performances. The celebration brought together community members of all ages to reflect on the past year's achievements and set intentions for the year ahead. Traditional foods were served, and elders shared blessings and wisdom with younger generations.",
  },
  {
    id: 5,
    title: "Quarterly Financial Review",
    date: "November 30, 2025",
    location: "Virtual Meeting",
    attendees: 65,
    image: ncaReportImage,
    description: "A comprehensive review of the association's financial performance for the quarter. Members received detailed reports on income, expenditures, and fund allocations. The session included presentations on budget updates, fundraising progress, and financial projections for upcoming initiatives. Members had the opportunity to ask questions and provide feedback on financial decisions.",
  },
];



