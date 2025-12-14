import { 
    Users, 
    Calendar, 
    FileText, 
    DollarSign, 
    Vote, 
    Crown,
    TrendingUp,
    UserCheck,
    Clock,
    AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    // Mock statistics - would come from API
    const stats = [
        {
            title: "Total Members",
            value: "2,547",
            change: "+12%",
            trend: "up",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Pending Applications",
            value: "23",
            change: "+5",
            trend: "up",
            icon: UserCheck,
            color: "text-amber-600"
        },
        {
            title: "Upcoming Events",
            value: "8",
            change: "2 this week",
            trend: "neutral",
            icon: Calendar,
            color: "text-green-600"
        },
        {
            title: "Total Revenue",
            value: "125,000 SSP",
            change: "+8%",
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-600"
        }
    ];

    const recentActivities = [
        { id: 1, type: "member", action: "New member application", name: "Nyakong Deng", time: "2 hours ago", status: "pending" },
        { id: 2, type: "payment", action: "Payment received", name: "Achol Garang", amount: "100 SSP", time: "4 hours ago", status: "completed" },
        { id: 3, type: "event", action: "Event created", name: "Monthly General Meeting", time: "1 day ago", status: "active" },
        { id: 4, type: "election", action: "Election nomination", name: "Executive Committee 2026", time: "2 days ago", status: "pending" },
    ];

    const quickActions = [
        { title: "Manage Members", icon: Users, path: "/admin/members", color: "bg-blue-500" },
        { title: "Create Event", icon: Calendar, path: "/admin/events", color: "bg-green-500" },
        { title: "View Payments", icon: DollarSign, path: "/admin/payments", color: "bg-emerald-500" },
        { title: "Manage Elections", icon: Vote, path: "/admin/elections", color: "bg-purple-500" },
        { title: "Upload Document", icon: FileText, path: "/admin/documents", color: "bg-orange-500" },
        { title: "Update Leadership", icon: Crown, path: "/admin/leadership", color: "bg-pink-500" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening with NCA today.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                                        <span className={stat.trend === "up" ? "text-green-500" : ""}>
                                            {stat.change}
                                        </span>
                                        {" "}from last month
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="h-auto flex-col items-start justify-start p-4 hover:bg-muted"
                                        onClick={() => navigate(action.path)}
                                    >
                                        <div className={`${action.color} mb-3 rounded-lg p-2`}>
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-semibold">{action.title}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest actions and updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                            {activity.type === "member" && <Users className="h-5 w-5" />}
                                            {activity.type === "payment" && <DollarSign className="h-5 w-5" />}
                                            {activity.type === "event" && <Calendar className="h-5 w-5" />}
                                            {activity.type === "election" && <Vote className="h-5 w-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            <p className="text-sm text-muted-foreground">{activity.name}</p>
                                            {activity.amount && (
                                                <p className="text-xs text-muted-foreground">Amount: {activity.amount}</p>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {activity.status === "pending" && (
                                                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                                    Pending
                                                </span>
                                            )}
                                            {activity.status === "completed" && (
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                    Completed
                                                </span>
                                            )}
                                            {activity.status === "active" && (
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Tasks */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Tasks</CardTitle>
                            <CardDescription>Items requiring your attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">23 Membership Applications</p>
                                        <p className="text-xs text-muted-foreground">Require review and approval</p>
                                        <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/admin/members")}>
                                            Review Now
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">5 Election Nominations</p>
                                        <p className="text-xs text-muted-foreground">Awaiting verification</p>
                                        <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/admin/elections")}>
                                            Verify Now
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">15 Pending Payments</p>
                                        <p className="text-xs text-muted-foreground">Need confirmation</p>
                                        <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/admin/payments")}>
                                            View Payments
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;

