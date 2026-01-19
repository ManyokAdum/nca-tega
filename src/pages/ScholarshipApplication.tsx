import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, Upload, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ScholarshipApplication = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Application Submitted Successfully!",
                description: "We've received your scholarship application. You'll receive a confirmation email shortly.",
            });
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <Link
                                to="/scholarship"
                                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Scholarship Information
                            </Link>
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">
                                    <div className="rounded-full bg-primary/10 p-4">
                                        <GraduationCap className="h-12 w-12 text-primary md:h-14 md:w-14" />
                                    </div>
                                </div>
                                <h1 className="mb-4 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                                    Scholarship Application
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Complete the form below to apply for an NCAA scholarship
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Requirements Alert */}
                <section className="py-8">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Before You Begin</AlertTitle>
                                <AlertDescription>
                                    Please ensure you have the following documents ready to upload:
                                    <ul className="mt-2 list-inside list-disc space-y-1">
                                        <li>Recent academic transcript or report card</li>
                                        <li>Letter of acceptance or enrollment confirmation</li>
                                        <li>Proof of NCAA membership (parent or applicant)</li>
                                        <li>Financial need statement or documentation</li>
                                        <li>Two letters of recommendation (for secondary and vocational scholarships)</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section className="pb-16 md:pb-24">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <form onSubmit={handleSubmit}>
                                {/* Personal Information */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>
                                            Please provide your personal details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input id="firstName" required placeholder="Enter your first name" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input id="lastName" required placeholder="Enter your last name" />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                                <Input id="dateOfBirth" type="date" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="gender">Gender *</Label>
                                                <Select required>
                                                    <SelectTrigger id="gender">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input id="email" type="email" required placeholder="your.email@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number *</Label>
                                            <Input id="phone" type="tel" required placeholder="+211 920 287 970" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Residential Address *</Label>
                                            <Textarea id="address" required placeholder="Enter your full address" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="payam">Payam *</Label>
                                            <Select required>
                                                <SelectTrigger id="payam">
                                                    <SelectValue placeholder="Select your payam" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ajuong">Ajuong</SelectItem>
                                                    <SelectItem value="kongor">Kongor</SelectItem>
                                                    <SelectItem value="lith">Lith</SelectItem>
                                                    <SelectItem value="nyuak">Nyuak</SelectItem>
                                                    <SelectItem value="pakeer">Pakeer</SelectItem>
                                                    <SelectItem value="pawuoi">Pawuoi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* NCAA Membership Information */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>NCAA Membership Information</CardTitle>
                                        <CardDescription>
                                            Provide details about NCAA membership
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="membershipStatus">Membership Status *</Label>
                                            <Select required>
                                                <SelectTrigger id="membershipStatus">
                                                    <SelectValue placeholder="Select membership status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="applicant">I am an NCAA member</SelectItem>
                                                    <SelectItem value="parent">My parent/guardian is an NCAA member</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="memberName">NCAA Member Full Name *</Label>
                                            <Input id="memberName" required placeholder="Full name of NCAA member" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="membershipNumber">Membership Number (if known)</Label>
                                            <Input id="membershipNumber" placeholder="NCAA membership number" />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Scholarship Details */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Scholarship Program Details</CardTitle>
                                        <CardDescription>
                                            Select the scholarship program you're applying for
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="scholarshipType">Scholarship Program *</Label>
                                            <Select required>
                                                <SelectTrigger id="scholarshipType">
                                                    <SelectValue placeholder="Select scholarship program" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="primary">Primary School Scholarship</SelectItem>
                                                    <SelectItem value="secondary">Secondary School Scholarship</SelectItem>
                                                    <SelectItem value="vocational">TEYA Vocational Institute Scholarship</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="schoolName">School/Institution Name *</Label>
                                            <Input id="schoolName" required placeholder="Name of your school or institution" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="currentLevel">Current Level/Grade *</Label>
                                            <Input id="currentLevel" required placeholder="e.g., P5, S2, Year 1" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="academicYear">Academic Year *</Label>
                                            <Input id="academicYear" required placeholder="e.g., 2026" />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Academic Information */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Academic Information</CardTitle>
                                        <CardDescription>
                                            Provide details about your academic performance
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="previousGrade">Previous Grade/Year Average (%)</Label>
                                            <Input id="previousGrade" type="number" min="0" max="100" placeholder="e.g., 75" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="achievements">Academic Achievements or Awards</Label>
                                            <Textarea 
                                                id="achievements" 
                                                placeholder="List any academic achievements, awards, or recognitions"
                                                rows={3}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Financial Need Statement */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Financial Need Statement</CardTitle>
                                        <CardDescription>
                                            Explain why you need this scholarship
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="financialNeed">
                                                Please describe your financial situation and why you need this scholarship *
                                            </Label>
                                            <Textarea 
                                                id="financialNeed" 
                                                required
                                                placeholder="Explain your family's financial circumstances and how this scholarship would help you..."
                                                rows={6}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Document Uploads */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Required Documents</CardTitle>
                                        <CardDescription>
                                            Upload all required supporting documents
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="transcript">Academic Transcript/Report Card *</Label>
                                            <Input id="transcript" type="file" required accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="enrollment">Enrollment Confirmation/Acceptance Letter *</Label>
                                            <Input id="enrollment" type="file" required accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="membershipProof">Proof of NCAA Membership *</Label>
                                            <Input id="membershipProof" type="file" required accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="financialDoc">Financial Need Documentation</Label>
                                            <Input id="financialDoc" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">Optional - PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="recommendation1">First Letter of Recommendation</Label>
                                            <Input id="recommendation1" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">Required for secondary and vocational - PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="recommendation2">Second Letter of Recommendation</Label>
                                            <Input id="recommendation2" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                                            <p className="text-xs text-muted-foreground">Required for secondary and vocational - PDF, JPG, or PNG (Max 5MB)</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Declaration */}
                                <Card className="mb-6">
                                    <CardHeader>
                                        <CardTitle>Declaration</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="declaration"
                                                    required
                                                    className="mt-1"
                                                />
                                                <Label htmlFor="declaration" className="font-normal">
                                                    I hereby declare that all the information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may result in the rejection of my application or revocation of any scholarship awarded. *
                                                </Label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Success Message */}
                                <Alert className="mb-6 border-green-200 bg-green-50">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-900">Application Review</AlertTitle>
                                    <AlertDescription className="text-green-800">
                                        Your application will be reviewed by the NCAA Education Committee. 
                                        Successful applicants will be notified by May 15th. You will receive 
                                        a confirmation email once your application is submitted.
                                    </AlertDescription>
                                </Alert>

                                {/* Submit Button */}
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="mr-2">Submitting...</span>
                                                <span className="animate-spin">⏳</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-5 w-5" />
                                                Submit Application
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        size="lg"
                                        variant="outline"
                                        asChild
                                        className="w-full sm:w-auto"
                                    >
                                        <Link to="/scholarship">Cancel</Link>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ScholarshipApplication;
