import { create } from "@storybook/theming/create";

export const brandTheme = create({
  base: "light",
  brandTitle: "Nyan Connect Hub",
  brandUrl: "https://github.com/",
  colorPrimary: "hsl(var(--brand-primary-600))",
  colorSecondary: "hsl(var(--brand-secondary-500))",
  appBg: "hsl(var(--background))",
  appContentBg: "hsl(var(--card))",
  appBorderColor: "hsl(var(--border))",
  appBorderRadius: 12,
  textColor: "hsl(var(--foreground))",
  textInverseColor: "hsl(var(--brand-primary-50))",
});

