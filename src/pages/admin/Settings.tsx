import { useState } from "react";
import { Settings as SettingsIcon, Save, Bell, Shield, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
    });

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your settings have been successfully saved.",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage system settings and preferences</p>
                </div>

                <Tabs defaultValue="general" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>

                    {/* General Settings */}
                    <TabsContent value="general" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization Information</CardTitle>
                                <CardDescription>Update organization details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="orgName">Organization Name</Label>
                                        <Input id="orgName" placeholder="Enter organization name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Contact Email</Label>
                                        <Input id="email" type="email" placeholder="contact@example.org" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea id="address" placeholder="Enter organization address" rows={2} />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="+211 000 000 000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input id="website" placeholder="https://example.org" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Membership Settings</CardTitle>
                                <CardDescription>Configure membership options</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="regularFee">Regular Membership Fee (SSP)</Label>
                                        <Input id="regularFee" type="number" defaultValue={0} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lifeFee">Life Membership Fee (SSP)</Label>
                                        <Input id="lifeFee" type="number" defaultValue={0} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="autoApprove">Auto-approve Memberships</Label>
                                        <p className="text-sm text-muted-foreground">Automatically approve membership applications</p>
                                    </div>
                                    <Switch id="autoApprove" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Manage how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="emailNotif">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        id="emailNotif"
                                        checked={notifications.email}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="smsNotif">SMS Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                                    </div>
                                    <Switch
                                        id="smsNotif"
                                        checked={notifications.sms}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="pushNotif">Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                                    </div>
                                    <Switch
                                        id="pushNotif"
                                        checked={notifications.push}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage security and access controls</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Switch id="twoFactor" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Email */}
                    <TabsContent value="email" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Configuration</CardTitle>
                                <CardDescription>Configure email server settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="smtpHost">SMTP Host</Label>
                                        <Input id="smtpHost" placeholder="smtp.example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="smtpPort">SMTP Port</Label>
                                        <Input id="smtpPort" type="number" defaultValue={0} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpUser">SMTP Username</Label>
                                    <Input id="smtpUser" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                                    <Input id="smtpPassword" type="password" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;

