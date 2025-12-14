import type { Preview } from "@storybook/react";
import { brandTheme } from "./theme";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    docs: {
      theme: brandTheme,
    },
    backgrounds: {
      default: "Brand Surface",
      values: [
        { name: "Brand Surface", value: "hsl(var(--background))" },
        { name: "Card", value: "hsl(var(--card))" },
        { name: "Primary Deep", value: "hsl(var(--brand-primary-900))" },
      ],
    },
    options: {
      storySort: {
        order: ["Branding", "Components"],
      },
    },
  },
};

export default preview;

