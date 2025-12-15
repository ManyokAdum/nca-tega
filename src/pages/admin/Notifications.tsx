import { useNavigate } from "react-router-dom";
import { 
    Bell, 
    Users, 
    Vote, 
    DollarSign, 
    MessageSquare, 
    Calendar,
    Clock,
    CheckCircle,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { useAdminData } from "@/contexts/AdminDataContext";
import { cn } from "@/lib/utils";

const Notifications = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { notifications, markNotificationRead, markAllNotificationsRead } = useAdminData();

    const unreadNotifications = notifications.filter(n => n.unread);
    const readNotifications = notifications.filter(n => !n.unread);

    const handleMarkAsRead = (id: string) => {
        markNotificationRead(id);
        toast({
            title: "Notification marked as read",
            description: "The notification has been marked as read.",
        });
    };

    const handleMarkAllAsRead = () => {
        markAllNotificationsRead();
        toast({
            title: "All notifications marked as read",
            description: "All notifications have been marked as read.",
        });
    };

    const handleNotificationClick = (notification: AdminNotification) => {
        // Mark as read when clicked
        if (notification.unread) {
            handleMarkAsRead(notification.id);
        }
        navigate(notification.link);
    };

    const NotificationItem = ({ notification }: { notification: AdminNotification }) => {
        const Icon = notification.type === "approval" ? CheckCircle : MessageSquare;
        const iconColor = notification.type === "approval" 
            ? "text-[hsl(var(--brand-primary-600))]" 
            : "text-[hsl(var(--brand-secondary-600))]";
        return (
            <div
                className={cn(
                    "flex items-start gap-4 rounded-lg border p-4 transition-colors cursor-pointer hover:bg-muted/50",
                    notification.unread && "bg-primary/5 border-primary/20"
                )}
                onClick={() => handleNotificationClick(notification)}
            >
                <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0",
                    notification.unread && "bg-primary/10"
                )}>
                    <Icon className={cn("h-5 w-5", iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className={cn(
                                    "text-sm font-medium",
                                    notification.unread && "font-semibold"
                                )}>
                                    {notification.title}
                                </p>
                                {notification.unread && (
                                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                    {notification.time}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {notification.unread && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notification.id);
                                    }}
                                >
                                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            )}
                            <Badge 
                                variant={notification.type === "approval" ? "default" : "secondary"}
                                className="text-xs"
                            >
                                {notification.type === "approval" ? "Approval" : "Message"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Notifications</h1>
                        <p className="text-muted-foreground">View and manage all your notifications</p>
                    </div>
                    {unreadNotifications.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle className="h-4 w-4" />
                            Mark All as Read
                        </Button>
                    )}
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{notifications.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Unread</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[hsl(var(--brand-secondary-600))]">{unreadNotifications.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Read</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-muted-foreground">{readNotifications.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Unread Notifications */}
                {unreadNotifications.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-[hsl(var(--brand-secondary-600))]" />
                                Unread Notifications
                                <Badge variant="secondary" className="ml-2">
                                    {unreadNotifications.length}
                                </Badge>
                            </CardTitle>
                            <CardDescription>Notifications that require your attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {unreadNotifications.map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Read Notifications */}
                {readNotifications.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                                Read Notifications
                                <Badge variant="outline" className="ml-2">
                                    {readNotifications.length}
                                </Badge>
                            </CardTitle>
                            <CardDescription>Previously viewed notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {readNotifications.map((notification) => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {notifications.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium text-muted-foreground">No notifications</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                You're all caught up! New notifications will appear here.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
};

export default Notifications;

