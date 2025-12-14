import { useState } from "react";
import { Users, Search, Filter, CheckCircle, XCircle, Eye, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const Members = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { toast } = useToast();

    // Mock member data
    const members = [
        {
            id: 1,
            name: "Nyakong Deng",
            email: "nyakong.deng@example.com",
            phone: "+211 912 345 001",
            payam: "Ajuong",
            status: "pending",
            membershipType: "Regular",
            appliedDate: "2024-01-15",
            paymentStatus: "pending"
        },
        {
            id: 2,
            name: "Achol Garang",
            email: "achol.garang@example.com",
            phone: "+211 912 345 002",
            payam: "Kongor",
            status: "approved",
            membershipType: "Life",
            appliedDate: "2024-01-10",
            paymentStatus: "paid"
        },
        {
            id: 3,
            name: "Nyandeng Majok",
            email: "nyandeng.majok@example.com",
            phone: "+211 912 345 003",
            payam: "Lith",
            status: "pending",
            membershipType: "Regular",
            appliedDate: "2024-01-20",
            paymentStatus: "pending"
        },
        {
            id: 4,
            name: "Alek Chol",
            email: "alek.chol@example.com",
            phone: "+211 912 345 004",
            payam: "Nyuak",
            status: "approved",
            membershipType: "Regular",
            appliedDate: "2023-12-05",
            paymentStatus: "paid"
        },
    ];

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || member.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleApprove = (id: number) => {
        toast({
            title: "Member Approved",
            description: "The member application has been approved.",
        });
    };

    const handleReject = (id: number) => {
        toast({
            title: "Member Rejected",
            description: "The member application has been rejected.",
        });
    };

    const stats = {
        total: members.length,
        approved: members.filter(m => m.status === "approved").length,
        pending: members.filter(m => m.status === "pending").length,
        rejected: members.filter(m => m.status === "rejected").length,
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Member Management</h1>
                    <p className="text-muted-foreground">Manage member applications and memberships</p>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Approved</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name or email..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Members Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Members</CardTitle>
                        <CardDescription>View and manage all member applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Payam</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Applied</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.name}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Mail className="h-3 w-3" />
                                                        {member.email}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {member.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{member.payam}</TableCell>
                                            <TableCell>{member.membershipType}</TableCell>
                                            <TableCell>
                                                {member.status === "approved" && (
                                                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                                )}
                                                {member.status === "pending" && (
                                                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                                )}
                                                {member.status === "rejected" && (
                                                    <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {member.paymentStatus === "paid" && (
                                                    <Badge variant="outline" className="border-green-500 text-green-700">Paid</Badge>
                                                )}
                                                {member.paymentStatus === "pending" && (
                                                    <Badge variant="outline" className="border-amber-500 text-amber-700">Pending</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{member.appliedDate}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {member.status === "pending" && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleApprove(member.id)}
                                                            >
                                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => handleReject(member.id)}
                                                            >
                                                                <XCircle className="h-4 w-4 text-red-600" />
                                                            </Button>
                                                        </>
                                                    )}
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
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

export default Members;

