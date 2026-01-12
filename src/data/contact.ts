import { Mail, Phone, MapPin } from "lucide-react";

export interface ContactInfo {
    icon: React.ElementType;
    title: string;
    value: string;
    link?: string;
}

export const contactInformation: ContactInfo[] = [
    {
        icon: Mail,
        title: "Email",
        value: "nyancitarialbeek.juba@gmail.com",
        link: "mailto:nyancitarialbeek.juba@gmail.com"
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+211 910 900 467",
        link: "tel:+211910900467"
    },
    {
        icon: MapPin,
        title: "Headquarters",
        value: "NCAA Hall, Juba, South Sudan"
    }
];

