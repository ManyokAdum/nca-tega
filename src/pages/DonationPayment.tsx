import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CreditCard, Shield, CheckCircle, ArrowLeft, Lock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface DonationData {
    amount: string;
    currency: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
}

const DonationPayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const donationData = location.state as DonationData;

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect back if no donation data
    if (!donationData) {
        navigate("/donate");
        return null;
    }

    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\s/g, '');
        const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
        return formatted.substring(0, 19); // Max 16 digits + 3 spaces
    };

    const formatExpiryDate = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length >= 2) {
            return numbers.substring(0, 2) + '/' + numbers.substring(2, 4);
        }
        return numbers;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        setExpiryDate(formatted);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numbers = e.target.value.replace(/\D/g, '');
        setCvv(numbers.substring(0, 4)); // Max 4 digits
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            toast({
                title: "Thank You for Your Donation!",
                description: `Your donation of ${donationData.amount} ${donationData.currency} has been successfully processed. We appreciate your support!`,
                duration: 5000,
            });
            
            // Redirect to home page
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gradient-hero py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
                                    <Heart className="h-8 w-8 text-primary-foreground" />
                                </div>
                            </div>
                            <h1 className="mb-4 font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
                                Complete Your Donation
                            </h1>
                            <p className="text-base text-primary-foreground/90 md:text-lg">
                                Secure payment processing for your generous contribution
                            </p>
                        </div>
                    </div>
                </section>

                {/* Payment Section */}
                <section className="py-12 md:py-16">
                    <div className="container">
                        <div className="mx-auto max-w-5xl">
                            <Button
                                variant="ghost"
                                className="mb-6"
                                onClick={() => navigate("/donate")}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Donation Form
                            </Button>

                            <div className="grid gap-8 lg:grid-cols-3">
                                {/* Order Summary */}
                                <div className="space-y-6 lg:col-span-1">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Donation Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Donor</p>
                                                <p className="font-semibold">{donationData.donorName}</p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Email</p>
                                                <p className="text-sm break-all">{donationData.donorEmail}</p>
                                            </div>
                                            {donationData.donorPhone && (
                                                <>
                                                    <Separator />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                                        <p className="text-sm">{donationData.donorPhone}</p>
                                                    </div>
                                                </>
                                            )}
                                            <Separator />
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm">Donation Amount</span>
                                                    <span className="font-semibold">
                                                        {donationData.amount} {donationData.currency}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center pt-2 border-t">
                                                    <span className="font-semibold">Total</span>
                                                    <span className="font-bold text-xl text-primary">
                                                        {donationData.amount} {donationData.currency}
                                                    </span>
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
                                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                    256-bit SSL encryption
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                    PCI-DSS Level 1 compliant
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                                    Your card data is protected
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Payment Form */}
                                <div className="lg:col-span-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Payment Details</CardTitle>
                                            <CardDescription>
                                                Enter your card information to complete the donation
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {/* Card Number */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Card Number *</Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="cardNumber"
                                                            placeholder="1234 5678 9012 3456"
                                                            value={cardNumber}
                                                            onChange={handleCardNumberChange}
                                                            required
                                                            maxLength={19}
                                                        />
                                                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </div>

                                                {/* Card Name */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardName">Cardholder Name *</Label>
                                                    <Input
                                                        id="cardName"
                                                        placeholder="Name on card"
                                                        value={cardName}
                                                        onChange={(e) => setCardName(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                {/* Expiry and CVV */}
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                                                        <Input
                                                            id="expiryDate"
                                                            placeholder="MM/YY"
                                                            value={expiryDate}
                                                            onChange={handleExpiryDateChange}
                                                            required
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cvv">CVV *</Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="cvv"
                                                                placeholder="123"
                                                                value={cvv}
                                                                onChange={handleCvvChange}
                                                                required
                                                                maxLength={4}
                                                                type="password"
                                                            />
                                                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <Separator />

                                                {/* Billing Information */}
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold">Billing Information</h3>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="billingEmail">Email *</Label>
                                                        <Input
                                                            id="billingEmail"
                                                            type="email"
                                                            value={donationData.donorEmail}
                                                            disabled
                                                        />
                                                    </div>
                                                    {donationData.donorPhone && (
                                                        <div className="space-y-2">
                                                            <Label htmlFor="billingPhone">Phone</Label>
                                                            <Input
                                                                id="billingPhone"
                                                                type="tel"
                                                                value={donationData.donorPhone}
                                                                disabled
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <div className="space-y-4">
                                                    <Button
                                                        type="submit"
                                                        size="lg"
                                                        className="w-full"
                                                        disabled={isProcessing}
                                                    >
                                                        {isProcessing ? (
                                                            <>Processing Payment...</>
                                                        ) : (
                                                            <>
                                                                <Lock className="mr-2 h-5 w-5" />
                                                                Complete Donation
                                                            </>
                                                        )}
                                                    </Button>
                                                    <p className="text-center text-xs text-muted-foreground">
                                                        By completing this donation, you agree to our{" "}
                                                        <a href="/terms" className="text-primary hover:underline">
                                                            Terms of Service
                                                        </a>{" "}
                                                        and{" "}
                                                        <a href="/privacy" className="text-primary hover:underline">
                                                            Privacy Policy
                                                        </a>
                                                    </p>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    {/* Help Text */}
                                    <div className="mt-6 rounded-lg border border-border bg-card p-6">
                                        <h3 className="mb-3 font-semibold">Need Help?</h3>
                                        <p className="mb-3 text-sm text-muted-foreground">
                                            If you encounter any issues with payment processing, please contact us:
                                        </p>
                                        <div className="space-y-1 text-sm">
                                            <p>
                                                <strong>Email:</strong> nyancitarialbeek.juba@gmail.com
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> +211 910 900 467
                                            </p>
                                        </div>
                                    </div>
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

export default DonationPayment;

