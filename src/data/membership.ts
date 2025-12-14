export interface MembershipTier {
    name: string;
    price: string;
    features: string[];
}

export const membershipTiers: MembershipTier[] = [
    {
        name: "Regular Member",
        price: "100 SSP/year",
        features: [
            "Voting rights in elections",
            "Access to community events",
            "Member directory access",
            "Newsletter subscription",
            "Support from welfare fund",
        ],
    },
    {
        name: "Life Member",
        price: "5,000 SSP (one-time)",
        features: [
            "All Regular Member benefits",
            "Priority event registration",
            "Lifetime voting rights",
            "Recognition in annual report",
            "Special member badge",
            "No annual renewal required",
        ],
    },
];

