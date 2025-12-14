import { useState } from "react";
import { Vote, Plus, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Elections = () => {
    const { toast } = useToast();

    // Mock election data
    const elections = [
        {
            id: 1,
            title: "Executive Committee Elections 2026",
            positions: ["Chairperson", "Deputy Chairperson", "Secretary General"],
            status: "Nomination Phase",
            startDate: "2026-01-20",
            endDate: "2026-01-25",
            totalVoters: 2500,
            nominationsReceived: 15,
            votesCast: 0
        },
        {
            id: 2,
            title: "Executive Committee Elections 2025",
            positions: ["All Executive Positions"],
            status: "Completed",
            startDate: "2025-01-15",
            endDate: "2025-01-20",
            totalVoters: 2300,
            nominationsReceived: 20,
            votesCast: 2116
        },
    ];

    const nominations = [
        {
            id: 1,
            candidateName: "Ahou Abit Arok",
            position: "Chairperson",
            electionId: 1,
            status: "pending",
            submittedDate: "2024-01-18"
        },
        {
            id: 2,
            candidateName: "Yar Kuir Mabior",
            position: "Deputy Chairperson",
            electionId: 1,
            status: "approved",
            submittedDate: "2024-01-17"
        },
    ];

    const handleApproveNomination = (id: number) => {
        toast({
            title: "Nomination Approved",
            description: "The nomination has been approved.",
        });
    };

    const handleRejectNomination = (id: number) => {
        toast({
            title: "Nomination Rejected",
            description: "The nomination has been rejected.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Election Management</h1>
                        <p className="text-muted-foreground">Manage elections and nominations</p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Election
                    </Button>
                </div>

                {/* Elections List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Elections</CardTitle>
                        <CardDescription>Current and upcoming elections</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {elections.map((election) => (
                                <div key={election.id} className="rounded-lg border border-border p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold">{election.title}</h3>
                                                <Badge className={
                                                    election.status === "Completed" 
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }>
                                                    {election.status}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Start Date</p>
                                                    <p className="font-medium">{election.startDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">End Date</p>
                                                    <p className="font-medium">{election.endDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Voters</p>
                                                    <p className="font-medium">{election.totalVoters}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Nominations</p>
                                                    <p className="font-medium">{election.nominationsReceived}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-sm text-muted-foreground mb-2">Open Positions:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {election.positions.map((position, idx) => (
                                                        <Badge key={idx} variant="outline">{position}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Nominations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Nominations</CardTitle>
                        <CardDescription>Review and approve election nominations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Candidate</TableHead>
                                        <TableHead>Position</TableHead>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Submitted</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {nominations.map((nomination) => (
                                        <TableRow key={nomination.id}>
                                            <TableCell className="font-medium">{nomination.candidateName}</TableCell>
                                            <TableCell>{nomination.position}</TableCell>
                                            <TableCell>Executive Committee Elections 2026</TableCell>
                                            <TableCell>{nomination.submittedDate}</TableCell>
                                            <TableCell>
                                                {nomination.status === "approved" && (
                                                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                                )}
                                                {nomination.status === "pending" && (
                                                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {nomination.status === "pending" && (
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleApproveNomination(nomination.id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleRejectNomination(nomination.id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Elections;

