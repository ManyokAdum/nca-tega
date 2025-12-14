import { useState } from "react";
import { DollarSign, Search, Download, CheckCircle, XCircle, Filter } from "lucide-react";
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

const Payments = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { toast } = useToast();

    // Mock payment data
    const payments = [
        {
            id: 1,
            memberName: "Achol Garang",
            memberEmail: "achol.garang@example.com",
            amount: "100 SSP",
            type: "Regular Membership",
            date: "2024-01-15",
            status: "paid",
            method: "Mobile Money"
        },
        {
            id: 2,
            memberName: "Nyandeng Majok",
            memberEmail: "nyandeng.majok@example.com",
            amount: "5,000 SSP",
            type: "Life Membership",
            date: "2024-01-10",
            status: "paid",
            method: "Bank Transfer"
        },
        {
            id: 3,
            memberName: "Alek Chol",
            memberEmail: "alek.chol@example.com",
            amount: "100 SSP",
            type: "Regular Membership",
            date: "2024-01-20",
            status: "pending",
            method: "Mobile Money"
        },
        {
            id: 4,
            memberName: "Nyakong Deng",
            memberEmail: "nyakong.deng@example.com",
            amount: "100 SSP",
            type: "Regular Membership",
            date: "2024-01-18",
            status: "failed",
            method: "Bank Transfer"
        },
    ];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            payment.memberEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: "125,000 SSP",
        paid: "120,000 SSP",
        pending: "3,000 SSP",
        failed: "2,000 SSP",
    };

    const handleApprove = (id: number) => {
        toast({
            title: "Payment Approved",
            description: "The payment has been confirmed.",
        });
    };

    const handleReject = (id: number) => {
        toast({
            title: "Payment Rejected",
            description: "The payment has been rejected.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Payment Management</h1>
                    <p className="text-muted-foreground">Track and manage membership payments</p>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Paid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
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
                            <CardTitle className="text-sm font-medium">Failed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by member name or email..."
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
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payments</CardTitle>
                        <CardDescription>All payment transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPayments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{payment.memberName}</div>
                                                    <div className="text-sm text-muted-foreground">{payment.memberEmail}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">{payment.amount}</TableCell>
                                            <TableCell>{payment.type}</TableCell>
                                            <TableCell>{payment.method}</TableCell>
                                            <TableCell>{payment.date}</TableCell>
                                            <TableCell>
                                                {payment.status === "paid" && (
                                                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                                                )}
                                                {payment.status === "pending" && (
                                                    <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                                                )}
                                                {payment.status === "failed" && (
                                                    <Badge className="bg-red-100 text-red-800">Failed</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {payment.status === "pending" && (
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => handleApprove(payment.id)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => handleReject(payment.id)}
                                                        >
                                                            <XCircle className="h-4 w-4 text-red-600" />
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

export default Payments;

