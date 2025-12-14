import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PaletteItem = {
  label: string;
  token: string;
  foreground?: string;
};

const palette: PaletteItem[] = [
  { label: "Primary 800 (brand base)", token: "--brand-primary-800", foreground: "--brand-primary-foreground" },
  { label: "Primary 400 (surface fill)", token: "--brand-primary-400", foreground: "--brand-primary-foreground" },
  { label: "Secondary 600 (accent base)", token: "--brand-secondary-600", foreground: "--brand-secondary-foreground" },
  { label: "Secondary 200 (soft wash)", token: "--brand-secondary-200", foreground: "--brand-primary-900" },
  { label: "Feminine 400 (micro)", token: "--brand-feminine-400", foreground: "--brand-feminine-foreground" },
];

const textPairings: PaletteItem[] = [
  { label: "Primary CTA text", token: "--brand-primary-800", foreground: "--brand-primary-foreground" },
  { label: "Secondary CTA text", token: "--brand-secondary-600", foreground: "--brand-secondary-foreground" },
  { label: "Soft surface body", token: "--brand-secondary-50", foreground: "--brand-primary-900" },
  { label: "Feminine micro text", token: "--brand-feminine-300", foreground: "--brand-feminine-foreground" },
];

const meta: Meta = {
  title: "Branding/Showcase",
};

export default meta;

const Swatch = ({ item }: { item: PaletteItem }) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-soft">
    <div
      className="h-12 w-20 rounded-lg border border-border shadow-inner"
      style={{
        backgroundColor: `hsl(var(${item.token}))`,
        color: item.foreground ? `hsl(var(${item.foreground}))` : "hsl(var(--foreground))",
      }}
    />
    <div className="text-sm leading-tight">
      <div className="font-semibold text-foreground">{item.label}</div>
      <div className="text-muted-foreground">{item.token.replace("--", "")}</div>
    </div>
  </div>
);

const TextPairing = ({ item }: { item: PaletteItem }) => (
  <div
    className="flex h-28 flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-soft"
    style={{
      backgroundColor: `hsl(var(${item.token}))`,
      color: `hsl(var(${item.foreground ?? "--foreground"}))`,
    }}
  >
    <div className="text-sm font-semibold">{item.label}</div>
    <div className="text-xs opacity-80">
      {`Use text-[hsl(var(${item.foreground ?? "--foreground"}))] on ${item.token.replace("--", "")} surfaces.`}
    </div>
  </div>
);

export const TokenShowcase: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-brand-primary-900 p-10 text-primary-foreground shadow-elevated">
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Badge className="bg-brand-feminine-300 text-brand-feminine-foreground">Tokenized branding</Badge>
            <span className="rounded-full border border-brand-secondary-200/60 bg-brand-secondary-50/50 px-3 py-1 text-xs font-semibold text-brand-primary-900">
              No raw hex values
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">Indigo-led, aqua-assisted, with a soft accent</h1>
          <p className="max-w-3xl text-primary-foreground/85">
            Primary actions sit on the deep indigo scale, secondary highlights use aqua, and the feminine accent is reserved
            for micro-interactions only.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="hero" size="lg">
              Primary CTA <ArrowRight className="ml-1" />
            </Button>
            <Button variant="heroOutline" size="lg">
              Secondary CTA
            </Button>
            <Button variant="accent" size="lg">
              Feminine micro-accent
            </Button>
            <Button variant="link" size="lg">
              Tokenized link
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {palette.map((item) => (
          <Swatch key={item.token} item={item} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {textPairings.map((item) => (
          <TextPairing key={item.token} item={item} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-brand-primary-800">Card surface</CardTitle>
            <CardDescription>Use `bg-card` + `border-border` + `shadow-card`.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Text on card surfaces should be `text-foreground`; muted copy uses `text-muted-foreground`.
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-secondary-100 px-3 py-1 text-sm font-semibold text-brand-primary-800">
                Soft badge
              </span>
              <span className="rounded-full bg-brand-feminine-300/60 px-3 py-1 text-sm font-semibold text-brand-feminine-foreground">
                Micro accent
              </span>
            </div>
            <Button variant="outline" size="sm">
              Tertiary action
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-brand-secondary-200 bg-brand-secondary-50/60 shadow-soft">
          <CardHeader>
            <CardTitle className="text-brand-primary-800">Gradient header</CardTitle>
            <CardDescription>Use `bg-gradient-secondary` for light highlights.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-16 rounded-xl bg-gradient-secondary p-4 text-brand-primary-800 shadow-soft">
              Soft gradient surface for banners, chips, or inline callouts.
            </div>
            <Button variant="secondary" size="sm">
              Secondary CTA
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

