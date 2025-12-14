import { useState } from "react";
import { FileText, Plus, Upload, Download, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Documents = () => {
    const { toast } = useToast();

    // Mock documents data
    const documents = [
        {
            id: 1,
            title: "NCA Constitution",
            category: "Constitution",
            version: "v2.1",
            date: "2024-01-05",
            size: "2.5 MB",
            type: "PDF",
            status: "published"
        },
        {
            id: 2,
            title: "Membership Regulations",
            category: "Regulations",
            version: "v1.3",
            date: "2024-03-15",
            size: "1.8 MB",
            type: "PDF",
            status: "published"
        },
        {
            id: 3,
            title: "Annual Financial Report 2024",
            category: "Reports",
            version: "Final",
            date: "2024-03-20",
            size: "3.2 MB",
            type: "PDF",
            status: "draft"
        },
    ];

    const handleUpload = () => {
        toast({
            title: "Document Upload",
            description: "Please select a file to upload.",
        });
    };

    const handleDelete = (id: number) => {
        toast({
            title: "Document Deleted",
            description: "The document has been deleted.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Document Management</h1>
                        <p className="text-muted-foreground">Upload and manage official documents</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Document
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Document
                        </Button>
                    </div>
                </div>

                {/* Documents Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>All official documents and files</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Version</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documents.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{doc.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{doc.category}</Badge>
                                            </TableCell>
                                            <TableCell>{doc.version}</TableCell>
                                            <TableCell>{doc.date}</TableCell>
                                            <TableCell>{doc.size}</TableCell>
                                            <TableCell>
                                                {doc.status === "published" && (
                                                    <Badge className="bg-green-100 text-green-800">Published</Badge>
                                                )}
                                                {doc.status === "draft" && (
                                                    <Badge className="bg-amber-100 text-amber-800">Draft</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-red-600"
                                                        onClick={() => handleDelete(doc.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
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

export default Documents;

