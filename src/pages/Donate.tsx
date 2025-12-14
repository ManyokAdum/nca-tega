import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, DollarSign, CreditCard, Shield, CheckCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState<"USD" | "SSP">("USD");
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [donorPhone, setDonorPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("mobile");
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const amountInputRef = useRef<HTMLInputElement>(null);

    // #region agent log
    useEffect(() => {
        fetch('http://127.0.0.1:7242/ingest/f8629692-e1c6-43c6-b51b-0c7514937fad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Donate.tsx:useEffect',message:'Donate form state change',data:{amount,currency,donorName:donorName.length>0,donorEmail:donorEmail.length>0,paymentMethod},timestamp:Date.now(),sessionId:'debug-session',runId:'donate-form-fix',hypothesisId:'form-state'})}).catch(()=>{});
    }, [amount, currency, donorName, donorEmail, paymentMethod]);
    // #endregion

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const donationAmount = amount.replace(/,/g, "");
        const numericAmount = parseFloat(donationAmount);

        if (!donationAmount || isNaN(numericAmount) || numericAmount <= 0) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid donation amount.",
                variant: "destructive",
            });
            setIsProcessing(false);
            return;
        }

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/f8629692-e1c6-43c6-b51b-0c7514937fad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Donate.tsx:handleSubmit',message:'Donation form submitted',data:{amount:donationAmount,currency,numericAmount,donorName:donorName.length>0,donorEmail:donorEmail.length>0,paymentMethod},timestamp:Date.now(),sessionId:'debug-session',runId:'donate-form-fix',hypothesisId:'form-submit'})}).catch(()=>{});
        // #endregion

        // TODO: Implement actual payment processing
        setTimeout(() => {
            toast({
                title: "Thank You for Your Donation!",
                description: `Your donation of ${donationAmount} ${currency} has been received. We appreciate your support!`,
            });
            setIsProcessing(false);
            
            // Reset form
            setAmount("");
            setCurrency("USD");
            setDonorName("");
            setDonorEmail("");
            setDonorPhone("");
        }, 2000);
    };

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
                                    <Heart className="h-10 w-10 text-primary-foreground" />
                                </div>
                            </div>
                            <h1 className="mb-6 font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                                Support NCA
                            </h1>
                            <p className="text-lg text-primary-foreground/90 md:text-xl">
                                Your donation helps empower women from Twic East through education, welfare, and community development
                            </p>
                        </div>
                    </div>
                </section>

                {/* Donation Form Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
                            {/* Donation Form */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Gift className="h-5 w-5" />
                                            Make a Donation
                                        </CardTitle>
                                        <CardDescription>
                                            Fill in the details below to make your contribution
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Donation Amount */}
                                            <div className="space-y-4">
                                                <Label className="text-base font-semibold">Donation Amount *</Label>
                                                <div className="flex gap-3">
                                                    <div className="flex-1 space-y-2">
                                                        <Label htmlFor="donationAmount">Amount</Label>
                                                        <Input
                                                            id="donationAmount"
                                                            ref={amountInputRef}
                                                            type="text"
                                                            placeholder="Enter amount"
                                                            value={amount}
                                                            onChange={(e) => {
                                                                const value = e.target.value.replace(/[^\d.,]/g, "");
                                                                setAmount(value);
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="w-32 space-y-2">
                                                        <Label htmlFor="currency">Currency</Label>
                                                        <Select value={currency} onValueChange={(value: "USD" | "SSP") => setCurrency(value)}>
                                                            <SelectTrigger id="currency">
                                                                <SelectValue placeholder="Currency" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="USD">USD</SelectItem>
                                                                <SelectItem value="SSP">SSP</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* Donor Information */}
                                            <div className="space-y-4">
                                                <h3 className="font-semibold">Your Information</h3>
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="donorName">Full Name *</Label>
                                                        <Input
                                                            id="donorName"
                                                            placeholder="Your name"
                                                            value={donorName}
                                                            onChange={(e) => setDonorName(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="donorEmail">Email *</Label>
                                                        <Input
                                                            id="donorEmail"
                                                            type="email"
                                                            placeholder="your.email@example.com"
                                                            value={donorEmail}
                                                            onChange={(e) => setDonorEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="donorPhone">Phone Number</Label>
                                                    <Input
                                                        id="donorPhone"
                                                        type="tel"
                                                        placeholder="+211 XXX XXX XXX"
                                                        value={donorPhone}
                                                        onChange={(e) => setDonorPhone(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* Payment Method */}
                                            <div className="space-y-4">
                                                <h3 className="font-semibold">Payment Method *</h3>
                                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center space-x-2 rounded-lg border border-border bg-card p-4">
                                                            <RadioGroupItem value="mobile" id="mobile" />
                                                            <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                                                                <div className="flex items-center gap-2">
                                                                    <CreditCard className="h-5 w-5" />
                                                                    <span className="font-medium">Mobile Money</span>
                                                                </div>
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2 rounded-lg border border-border bg-card p-4">
                                                            <RadioGroupItem value="bank" id="bank" />
                                                            <Label htmlFor="bank" className="flex-1 cursor-pointer">
                                                                <div className="flex items-center gap-2">
                                                                    <DollarSign className="h-5 w-5" />
                                                                    <span className="font-medium">Bank Transfer</span>
                                                                </div>
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>

                                                {paymentMethod === "bank" && (
                                                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                                                        <h4 className="mb-2 font-semibold text-sm">Bank Transfer Details</h4>
                                                        <div className="space-y-1 text-sm text-muted-foreground">
                                                            <p><strong>Bank:</strong> Commercial Bank of South Sudan</p>
                                                            <p><strong>Account Name:</strong> Nyan Cit Arialbeek</p>
                                                            <p><strong>Account Number:</strong> 1234567890</p>
                                                            <p className="mt-2 text-xs">
                                                                Please use your name as the payment reference
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                                                {isProcessing ? (
                                                    "Processing..."
                                                ) : (
                                                    <>
                                                        <Heart className="mr-2 h-5 w-5" />
                                                        Donate Now
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                {/* Impact Card */}
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Your Impact</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-sm">Education Support</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Scholarships for girls' education
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-sm">Welfare Programs</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Support during emergencies and bereavement
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-sm">Community Development</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Building stronger communities together
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Security Card */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-primary" />
                                            <CardTitle className="text-lg">Secure Donation</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                SSL encrypted transactions
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                Your information is protected
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-primary" />
                                                Transparent use of funds
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Contact Info */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Questions?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Have questions about donating? Contact us:
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Email:</strong> donations@ncatwiceast.org</p>
                                            <p><strong>Phone:</strong> +211 912 345 678</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Donate;

