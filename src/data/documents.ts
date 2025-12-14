export interface Document {
    id: number;
    title: string;
    version: string;
    date: string;
    size: string;
    type: string;
}

export const featuredDocuments: Document[] = [
    {
        id: 1,
        title: "NCA Constitution",
        version: "v2.1",
        date: "January 2024",
        size: "2.5 MB",
        type: "PDF",
    },
    {
        id: 3,
        title: "Membership Regulations",
        version: "v1.3",
        date: "March 2024",
        size: "1.8 MB",
        type: "PDF",
    },
    {
        id: 8,
        title: "Annual Financial Report 2024",
        version: "Final",
        date: "March 2025",
        size: "3.2 MB",
        type: "PDF",
    }
];

