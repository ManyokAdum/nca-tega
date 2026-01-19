import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdminData } from "@/contexts/AdminDataContext";
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
    const { events, addEvent, deleteEvent } = useAdminData();
    const [eventForm, setEventForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "upcoming" as "upcoming" | "past",
        attendees: 0,
        status: "active" as "active" | "completed",
        image: "",
    });

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventForm.title || !eventForm.date || !eventForm.location) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }
        addEvent({
            title: eventForm.title,
            description: eventForm.description,
            date: eventForm.date,
            time: eventForm.time,
            location: eventForm.location,
            type: eventForm.type,
            attendees: eventForm.attendees,
            status: eventForm.status,
            image: eventForm.image || undefined,
        });
        toast({
            title: "Event Created",
            description: "The event has been successfully created.",
        });
        setEventForm({
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            type: "upcoming",
            attendees: 0,
            status: "active",
            image: "",
        });
        setIsCreateDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        deleteEvent(id);
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
                        <p className="text-muted-foreground">Create and manage NCAA events</p>
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
                            <form onSubmit={handleCreateEvent}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Event Title *</Label>
                                        <Input 
                                            id="title" 
                                            placeholder="Enter event title"
                                            value={eventForm.title}
                                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea 
                                            id="description" 
                                            placeholder="Enter event description" 
                                            rows={4}
                                            value={eventForm.description}
                                            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="date">Date *</Label>
                                            <Input 
                                                id="date" 
                                                type="date"
                                                value={eventForm.date}
                                                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="time">Time</Label>
                                            <Input 
                                                id="time" 
                                                placeholder="e.g., 6:00 PM - 8:00 PM"
                                                value={eventForm.time}
                                                onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <Input 
                                            id="location" 
                                            placeholder="Enter event location"
                                            value={eventForm.location}
                                            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Event Type</Label>
                                            <select
                                                id="type"
                                                title="Event Type"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                value={eventForm.type}
                                                onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as "upcoming" | "past" })}
                                            >
                                                <option value="upcoming">Upcoming</option>
                                                <option value="past">Past</option>
                                            </select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="attendees">Attendees</Label>
                                            <Input 
                                                id="attendees" 
                                                type="number"
                                                min="0"
                                                value={eventForm.attendees}
                                                onChange={(e) => setEventForm({ ...eventForm, attendees: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </div>
                                    {eventForm.type === "past" && (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="image">Image URL (for past events)</Label>
                                                <Input 
                                                    id="image" 
                                                    placeholder="Enter image URL"
                                                    value={eventForm.image}
                                                    onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create Event</Button>
                                </DialogFooter>
                            </form>
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
                                                    <Badge className="bg-[hsl(var(--brand-primary-100))] text-[hsl(var(--brand-primary-800))]">Upcoming</Badge>
                                                ) : (
                                                    <Badge variant="outline">Past</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {event.status === "active" && (
                                                    <Badge className="bg-[hsl(var(--brand-secondary-100))] text-[hsl(var(--brand-secondary-800))]">Active</Badge>
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
                                                        className="h-8 w-8 p-0 text-[hsl(var(--brand-feminine-600))]"
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

