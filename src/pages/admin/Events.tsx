import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Events = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { toast } = useToast();

    // Mock events data
    const events = [
        {
            id: 1,
            title: "Monthly General Meeting",
            description: "Regular monthly meeting to discuss community matters",
            date: "2024-02-15",
            time: "6:00 PM - 8:00 PM",
            location: "NCA Hall, Juba",
            type: "upcoming",
            attendees: 45,
            status: "active"
        },
        {
            id: 2,
            title: "Executive Committee Elections",
            description: "Annual elections for Executive Committee positions",
            date: "2024-03-20",
            time: "9:00 AM - 5:00 PM",
            location: "NCA Hall, Juba",
            type: "upcoming",
            attendees: 150,
            status: "active"
        },
        {
            id: 3,
            title: "New Year Celebration",
            description: "Community celebration for the new year",
            date: "2024-01-01",
            time: "4:00 PM - 9:00 PM",
            location: "NCA Hall, Juba",
            type: "past",
            attendees: 180,
            status: "completed"
        },
    ];

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateEvent = () => {
        toast({
            title: "Event Created",
            description: "The event has been successfully created.",
        });
        setIsCreateDialogOpen(false);
    };

    const handleDelete = (id: number) => {
        toast({
            title: "Event Deleted",
            description: "The event has been deleted.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Event Management</h1>
                        <p className="text-muted-foreground">Create and manage NCA events</p>
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Event
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Event</DialogTitle>
                                <DialogDescription>Fill in the details to create a new event</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Event Title *</Label>
                                    <Input id="title" placeholder="Enter event title" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea id="description" placeholder="Enter event description" rows={4} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="date">Date *</Label>
                                        <Input id="date" type="date" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="time">Time *</Label>
                                        <Input id="time" placeholder="e.g., 6:00 PM - 8:00 PM" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Input id="location" placeholder="Enter event location" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateEvent}>Create Event</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Events Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Events</CardTitle>
                        <CardDescription>All upcoming and past events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Attendees</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEvents.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{event.title}</div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {event.description}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div>{event.date}</div>
                                                    <div className="text-muted-foreground">{event.time}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{event.location}</TableCell>
                                            <TableCell>
                                                {event.type === "upcoming" ? (
                                                    <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                                                ) : (
                                                    <Badge variant="outline">Past</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>{event.attendees}</TableCell>
                                            <TableCell>
                                                {event.status === "active" && (
                                                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                                                )}
                                                {event.status === "completed" && (
                                                    <Badge variant="outline">Completed</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-red-600"
                                                        onClick={() => handleDelete(event.id)}
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

export default Events;

