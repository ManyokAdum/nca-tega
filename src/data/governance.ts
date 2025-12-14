import { BookOpen, Vote, Users, FileCheck, Scale, CheckCircle } from "lucide-react";

export interface ConstitutionHighlight {
    title: string;
    description: string;
    icon: React.ElementType;
}

export const constitutionHighlights: ConstitutionHighlight[] = [
    {
        title: "Organizational Structure",
        description: "Democratic governance with General Assembly, Executive Committee, and Payam Representatives",
        icon: Users
    },
    {
        title: "Elections & Voting",
        description: "Free, fair, and transparent elections conducted every three years",
        icon: Vote
    },
    {
        title: "Financial Management",
        description: "Transparent accounting and regular financial reports to members",
        icon: Scale
    },
    {
        title: "Member Rights",
        description: "Equal rights, voting privileges, and participation in all organizational activities",
        icon: CheckCircle
    }
];

