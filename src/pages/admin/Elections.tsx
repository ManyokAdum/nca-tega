import { useState } from "react";
import { Vote, Plus, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdminData } from "@/contexts/AdminDataContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
    const { elections, nominations, addElection, approveNomination, rejectNomination } = useAdminData();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [electionForm, setElectionForm] = useState({
        title: "",
        positions: "",
        status: "Nomination Phase",
        startDate: "",
        endDate: "",
        totalVoters: 0,
    });

    const handleCreateElection = (e: React.FormEvent) => {
        e.preventDefault();
        if (!electionForm.title || !electionForm.startDate || !electionForm.endDate) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const positionsArray = electionForm.positions
            .split(",")
            .map(p => p.trim())
            .filter(p => p.length > 0);

        addElection({
            title: electionForm.title,
            positions: positionsArray.length > 0 ? positionsArray : ["All Executive Positions"],
            status: electionForm.status,
            startDate: electionForm.startDate,
            endDate: electionForm.endDate,
            totalVoters: electionForm.totalVoters,
        });

        toast({
            title: "Election Created",
            description: "The election has been successfully created.",
        });

        setElectionForm({
            title: "",
            positions: "",
            status: "Nomination Phase",
            startDate: "",
            endDate: "",
            totalVoters: 0,
        });
        setIsCreateDialogOpen(false);
    };

    const handleApproveNomination = (id: string) => {
        approveNomination(id);
        toast({
            title: "Nomination Approved",
            description: "The nomination has been approved.",
        });
    };

    const handleRejectNomination = (id: string) => {
        rejectNomination(id);
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
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Election
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Election</DialogTitle>
                                <DialogDescription>Fill in the details to create a new election</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateElection}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Election Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Executive Committee Elections 2026"
                                            value={electionForm.title}
                                            onChange={(e) => setElectionForm({ ...electionForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="positions">Open Positions (comma-separated) *</Label>
                                        <Input
                                            id="positions"
                                            placeholder="e.g., Chairlady, Deputy Chairlady, Secretary General"
                                            value={electionForm.positions}
                                            onChange={(e) => setElectionForm({ ...electionForm, positions: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="startDate">Start Date *</Label>
                                            <Input
                                                id="startDate"
                                                type="date"
                                                value={electionForm.startDate}
                                                onChange={(e) => setElectionForm({ ...electionForm, startDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="endDate">End Date *</Label>
                                            <Input
                                                id="endDate"
                                                type="date"
                                                value={electionForm.endDate}
                                                onChange={(e) => setElectionForm({ ...electionForm, endDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Input
                                            id="status"
                                            placeholder="e.g., Nomination Phase"
                                            value={electionForm.status}
                                            onChange={(e) => setElectionForm({ ...electionForm, status: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="totalVoters">Total Voters</Label>
                                        <Input
                                            id="totalVoters"
                                            type="number"
                                            min="0"
                                            value={electionForm.totalVoters}
                                            onChange={(e) => setElectionForm({ ...electionForm, totalVoters: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create Election</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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
                                                        ? "bg-[hsl(var(--brand-primary-100))] text-[hsl(var(--brand-primary-800))]"
                                                        : "bg-[hsl(var(--brand-secondary-100))] text-[hsl(var(--brand-secondary-800))]"
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
                                            <TableCell>
                                                {elections.find(e => e.id === nomination.electionId)?.title || "Unknown Election"}
                                            </TableCell>
                                            <TableCell>{new Date(nomination.submittedDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                {nomination.status === "approved" && (
                                                    <Badge className="bg-[hsl(var(--brand-primary-100))] text-[hsl(var(--brand-primary-800))]">Approved</Badge>
                                                )}
                                                {nomination.status === "pending" && (
                                                    <Badge className="bg-[hsl(var(--brand-secondary-100))] text-[hsl(var(--brand-secondary-800))]">Pending</Badge>
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

