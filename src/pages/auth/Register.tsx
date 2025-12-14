import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [payam, setPayam] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate payam selection
        if (!payam) {
            toast({
                title: "Validation Error",
                description: "Please select your Payam of Origin.",
                variant: "destructive",
            });
            return;
        }
        
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        // Add payam value to formData since Select doesn't work with FormData directly
        formData.append("payam", payam);
        
        const formValues = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            dateOfBirth: formData.get("dateOfBirth") as string,
            placeOfBirth: formData.get("placeOfBirth") as string,
            payam: payam,
            currentLocation: formData.get("currentLocation") as string,
            idPassport: formData.get("idPassport") as File,
            terms: formData.get("terms") === "on",
            communications: formData.get("communications") === "on",
        };

        // TODO: Implement actual registration with backend API
        // This should create a pending member application
        // The application will appear in the admin dashboard for approval
        try {
            // Simulating API call - in production, this would POST to your backend
            // await fetch('/api/members/applications', {
            //     method: 'POST',
            //     body: formData
            // });
            
            setTimeout(() => {
                toast({
                    title: "Application Submitted!",
                    description: "Your membership application has been submitted for review. The admin team will review it and you'll receive an email notification once a decision is made.",
                });
                setIsLoading(false);
                // Reset form
                e.currentTarget.reset();
                setPayam("");
                // Navigate to home or confirmation page
                navigate("/");
            }, 2000);
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your application. Please try again.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-16 px-4">
                <div className="container max-w-2xl">
                    <div className="mb-8">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                        <h1 className="mt-4 mb-2 font-heading text-3xl font-bold">Join NCA</h1>
                        <p className="text-muted-foreground">
                            Create your account and become part of our community
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h2 className="font-heading text-xl font-semibold">Personal Information</h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input id="firstName" name="firstName" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input id="lastName" name="lastName" required />
                                </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="+211 XXX XXX XXX" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                    <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                                    <Input id="placeOfBirth" name="placeOfBirth" placeholder="City, Country" required />
                                </div>
                            </div>

                            {/* Location Information */}
                            <div className="space-y-4">
                                <h2 className="font-heading text-xl font-semibold">Location</h2>
                                <div className="space-y-2">
                                    <Label htmlFor="payam">Payam of Origin *</Label>
                                    <Select value={payam} onValueChange={setPayam} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your Payam" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ajuong">Ajuong Payam</SelectItem>
                                            <SelectItem value="kongor">Kongor Payam</SelectItem>
                                            <SelectItem value="lith">Lith Payam</SelectItem>
                                            <SelectItem value="nyuak">Nyuak Payam</SelectItem>
                                            <SelectItem value="pakeer">Pakeer Payam</SelectItem>
                                            <SelectItem value="pawuoi">Pawuoi Payam</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currentLocation">Current Location *</Label>
                                    <Input id="currentLocation" name="currentLocation" placeholder="City, Country" required />
                                </div>
                            </div>

                            {/* Identification */}
                            <div className="space-y-4">
                                <h2 className="font-heading text-xl font-semibold">Identification</h2>
                                <div className="space-y-2">
                                    <Label htmlFor="idPassport">Upload ID/Passport *</Label>
                                    <Input
                                        id="idPassport"
                                        name="idPassport"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Please upload a clear copy of your ID or Passport (PDF, JPG, or PNG)
                                    </p>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <Checkbox id="terms" name="terms" required />
                                    <label htmlFor="terms" className="text-sm leading-relaxed">
                                        I agree to the{" "}
                                        <Link to="/documents" className="text-primary hover:underline">
                                            NCA Constitution
                                        </Link>{" "}
                                        and regulations, and I understand that my application will be reviewed by
                                        the Executive Committee. *
                                    </label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Checkbox id="communications" name="communications" />
                                    <label htmlFor="communications" className="text-sm leading-relaxed">
                                        I want to receive emails about NCA events, meetings, and announcements
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Submit
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Your application will be reviewed by the admin team. You'll receive an
                                email notification once your application has been reviewed. Approved members will appear in the NCA member directory.
                            </p>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
