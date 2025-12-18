export interface MembershipTier {
    name: string;
    price: string;
    features: string[];
}

export const membershipTiers: MembershipTier[] = [
    {
        name: "Regular Member",
        price: "15,000 SSP/year",
        features: [
            "Voting rights in elections",
            "Access to community events",
            "Member directory access",
            "Newsletter subscription",
            "Support from welfare fund",
        ],
    },
    {
        name: "Executive Member",
        price: "50,000 SSP/year",
        features: [
            "All Regular Member benefits",
            "Priority event registration",
            "Lifetime voting rights",
            "Recognition in annual report",
            "Special member badge",
            "Executive committee eligibility",
        ],
    },
];

