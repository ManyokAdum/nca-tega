import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
    LayoutDashboard, 
    Users, 
    Calendar, 
    FileText, 
    DollarSign, 
    Vote, 
    Crown,
    Settings,
    Menu,
    X,
    LogOut,
    Shield,
    Bell,
    CheckCircle,
    XCircle,
    MessageSquare,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ncaLogo from "@/images/final-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Members", href: "/admin/members", icon: Users },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Elections", href: "/admin/elections", icon: Vote },
    { name: "Leadership", href: "/admin/leadership", icon: Crown },
    { name: "Documents", href: "/admin/documents", icon: FileText },
    { name: "Payments", href: "/admin/payments", icon: DollarSign },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { logout, user } = useAuth();

    // Mock notifications data - in production, this would come from an API
    // This should fetch pending approvals and new messages
    const notifications = [
        {
            id: 1,
            type: "approval",
            title: "23 Membership Applications",
            description: "New membership applications pending approval",
            time: "2 hours ago",
            unread: true,
            link: "/admin/members",
            icon: Users,
            color: "text-amber-600"
        },
        {
            id: 2,
            type: "approval",
            title: "5 Election Nominations",
            description: "Election nominations awaiting verification",
            time: "4 hours ago",
            unread: true,
            link: "/admin/elections",
            icon: Vote,
            color: "text-blue-600"
        },
        {
            id: 3,
            type: "approval",
            title: "15 Pending Payments",
            description: "Payment confirmations needed",
            time: "1 day ago",
            unread: true,
            link: "/admin/payments",
            icon: DollarSign,
            color: "text-green-600"
        },
        {
            id: 4,
            type: "message",
            title: "New Message from Member",
            description: "Nyakong Deng sent a message regarding membership",
            time: "3 hours ago",
            unread: true,
            link: "/admin/members",
            icon: MessageSquare,
            color: "text-purple-600"
        },
        {
            id: 5,
            type: "message",
            title: "Event Registration Question",
            description: "Member inquiry about upcoming event registration",
            time: "5 hours ago",
            unread: true,
            link: "/admin/events",
            icon: Calendar,
            color: "text-indigo-600"
        },
        {
            id: 6,
            type: "message",
            title: "Payment Inquiry",
            description: "Member has a question about payment status",
            time: "6 hours ago",
            unread: false,
            link: "/admin/payments",
            icon: DollarSign,
            color: "text-emerald-600"
        }
    ];

    // Calculate counts for pending approvals and new messages
    const pendingApprovals = notifications.filter(n => n.type === "approval" && n.unread).length;
    const newMessages = notifications.filter(n => n.type === "message" && n.unread).length;
    const unreadCount = notifications.filter(n => n.unread).length;

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        });
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center gap-3 border-b border-border px-6">
                        <img
                            src={ncaLogo}
                            alt="NCA Logo"
                            className="h-10 w-auto object-contain"
                        />
                        <div>
                            <p className="font-heading text-sm font-bold">NCA Admin</p>
                            <p className="text-xs text-muted-foreground">Control Panel</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                        {navigation.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href || 
                                          (item.href !== "/admin" && location.pathname.startsWith(item.href));
                            
                            // Insert notifications button after Dashboard (index 0) and before Members (index 1)
                            const showNotifications = index === 0;
                            
                            return (
                                <div key={item.name}>
                                    <Link
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                    {showNotifications && (
                                        <div className="py-1">
                                            <Button 
                                                variant="ghost"
                                                className="w-full justify-between relative h-auto py-2 px-3"
                                                onClick={() => {
                                                    navigate("/admin/notifications");
                                                    setSidebarOpen(false);
                                                }}
                                            >
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Bell className="h-5 w-5" />
                                                    <span className="text-sm font-medium">Notifications</span>
                                                    {unreadCount > 0 && (
                                                        <Badge 
                                                            className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600 ml-auto"
                                                        >
                                                            {unreadCount > 9 ? "9+" : unreadCount}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-border p-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Administrator Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="relative"
                                onClick={() => navigate("/admin/notifications")}
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <Badge 
                                        className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600"
                                    >
                                        {unreadCount > 9 ? "9+" : unreadCount}
                                    </Badge>
                                )}
                            </Button>

                            <div className="text-right">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-muted-foreground">{user?.email || "admin@ncatwiceast.org"}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

