import { useState } from "react";
import { Crown, Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { executiveCommittee, payamRepresentatives } from "@/data/leadership";

const Leadership = () => {
    const { toast } = useToast();

    const handleEdit = (id: string) => {
        toast({
            title: "Edit Leadership",
            description: "Opening edit dialog...",
        });
    };

    const handleDelete = (id: string) => {
        toast({
            title: "Delete Leadership",
            description: "Leadership member removed.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Leadership Management</h1>
                        <p className="text-muted-foreground">Manage executive committee and payam representatives</p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                    </Button>
                </div>

                {/* Executive Committee */}
                <Card>
                    <CardHeader>
                        <CardTitle>Executive Committee</CardTitle>
                        <CardDescription>Manage executive committee members</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {executiveCommittee.map((member, index) => {
                                const Icon = member.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${member.color}`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleEdit(`exec-${index}`)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-red-600"
                                                    onClick={() => handleDelete(`exec-${index}`)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <h3 className="mb-1 font-semibold">{member.name}</h3>
                                        <p className="mb-2 text-sm text-muted-foreground">{member.position}</p>
                                        <p className="text-xs text-muted-foreground">{member.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Payam Representatives */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payam Representatives</CardTitle>
                        <CardDescription>Manage representatives from all 6 Payams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {payamRepresentatives.map((rep, index) => (
                                <div
                                    key={index}
                                    className="group rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="mb-1 font-semibold">{rep.name}</h3>
                                                <p className="text-sm text-muted-foreground">{rep.payam} Payam</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleEdit(`payam-${index}`)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-600"
                                                onClick={() => handleDelete(`payam-${index}`)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Leadership;

