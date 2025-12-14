export interface ElectionProcess {
    step: number;
    title: string;
    description: string;
}

export const electionProcess: ElectionProcess[] = [
    {
        step: 1,
        title: "Nomination",
        description: "Members submit nominations for open positions"
    },
    {
        step: 2,
        title: "Campaign",
        description: "Candidates present their platforms to members"
    },
    {
        step: 3,
        title: "Voting",
        description: "Secure secret ballot voting period"
    },
    {
        step: 4,
        title: "Results",
        description: "Transparent tally with full audit trail"
    }
];

export interface ActiveElection {
    id: number;
    title: string;
    status: string;
    startDate: string;
    endDate: string;
    positions: string[];
    totalVoters: number;
    nominationsReceived: number;
}

export const activeElections: ActiveElection[] = [
    {
        id: 1,
        title: "Executive Committee Elections 2026",
        status: "Nomination Phase",
        startDate: "January 20, 2026",
        endDate: "January 25, 2026",
        positions: ["President", "Vice President", "Secretary General", "Treasurer"],
        totalVoters: 2500,
        nominationsReceived: 15,
    },
];

