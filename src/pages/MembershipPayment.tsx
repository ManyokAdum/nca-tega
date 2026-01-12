import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CreditCard, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const MembershipPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    const membershipData = location.state || {};
    const { membershipType, amount, currency, memberName, memberEmail, memberPhone } = membershipData;

    useEffect(() => {
        if (!amount) {
            toast({
                title: "No Membership Information",
                description: "Please start from the membership page.",
                variant: "destructive",
            });
            navigate("/membership");
        }
    }, [amount, navigate, toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            toast({
                title: "Payment Successful!",
                description: `Your ${membershipType} payment of ${amount} ${currency} has been processed. Welcome to NCAA!`,
            });
            setIsProcessing(false);
            navigate("/");
        }, 2000);
    };

    if (!amount) {
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/10">
                                    <CreditCard className="h-10 w-10 text-primary-foreground" />
                                </div>
                            </div>
                            <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                                Complete Your Membership
                            </h1>
                            <p className="text-lg text-primary-foreground/90 md:text-xl">
                                Secure payment processing for your membership registration
                            </p>
                        </div>
                    </div>
                </section>

                {/* Payment Form Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto max-w-4xl">
                            <Button
                                variant="ghost"
                                onClick={() => navigate("/membership")}
                                className="mb-6"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Membership Form
                            </Button>

                            <div className="grid gap-8 lg:grid-cols-3">
                                {/* Payment Form */}
                                <div className="lg:col-span-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Payment Details</CardTitle>
                                            <CardDescription>
                                                Enter your card information to complete the membership payment
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {/* Card Information */}
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold">Card Information</h3>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardNumber">Card Number *</Label>
                                                        <Input
                                                            id="cardNumber"
                                                            placeholder="1234 5678 9012 3456"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardName">Cardholder Name *</Label>
                                                        <Input
                                                            id="cardName"
                                                            placeholder="Name on card"
                                                            defaultValue={memberName}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="expiry">Expiry Date *</Label>
                                                            <Input
                                                                id="expiry"
                                                                placeholder="MM/YY"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="cvv">CVV *</Label>
                                                            <Input
                                                                id="cvv"
                                                                placeholder="123"
                                                                maxLength={4}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <Separator />

                                                {/* Billing Address */}
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold">Billing Address</h3>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="address">Street Address *</Label>
                                                        <Input
                                                            id="address"
                                                            placeholder="123 Main Street"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="city">City *</Label>
                                                            <Input id="city" required />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="country">Country *</Label>
                                                            <Input id="country" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                                                    {isProcessing ? (
                                                        "Processing Payment..."
                                                    ) : (
                                                        <>
                                                            <CreditCard className="mr-2 h-5 w-5" />
                                                            Complete Payment of {amount} {currency}
                                                        </>
                                                    )}
                                                </Button>

                                                <p className="text-center text-xs text-muted-foreground">
                                                    Your payment information is secure and encrypted
                                                </p>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Order Summary & Security */}
                                <div className="space-y-6">
                                    {/* Order Summary */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Payment Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3 text-sm">
                                                {membershipType && (
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Membership:</span>
                                                        <span className="font-semibold">{membershipType}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Amount:</span>
                                                    <span className="font-semibold">{amount} {currency}</span>
                                                </div>
                                                {memberName && (
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Member:</span>
                                                        <span className="font-medium">{memberName}</span>
                                                    </div>
                                                )}
                                                {memberEmail && (
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Email:</span>
                                                        <span className="font-medium text-xs">{memberEmail}</span>
                                                    </div>
                                                )}
                                                <Separator />
                                                <div className="flex justify-between text-base">
                                                    <span className="font-semibold">Total:</span>
                                                    <span className="font-bold text-primary">{amount} {currency}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Security Info */}
                                    <Card className="border-primary/20 bg-primary/5">
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-5 w-5 text-primary" />
                                                <CardTitle className="text-base">Secure Payment</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    256-bit SSL encryption
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    PCI-DSS compliant
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Your data is protected
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    {/* Membership Benefits */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Your Benefits</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Full voting rights
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Access to member portal
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Event participation
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary" />
                                                    Community support
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MembershipPayment;
