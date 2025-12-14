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
        value: "info@nca-twiceast.org",
        link: "mailto:info@nca-twiceast.org"
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+211 123 456 789",
        link: "tel:+211123456789"
    },
    {
        icon: MapPin,
        title: "Headquarters",
        value: "NCA Hall, Juba, South Sudan"
    }
];

