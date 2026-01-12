module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["./stylelint/no-raw-colors.cjs"],
  rules: {
    "nyan/no-raw-colors": true,
    "color-no-hex": null,
    "alpha-value-notation": "percentage",
    "selector-class-pattern": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer", "screen"],
      },
    ],
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/storybook-static/**"],
};

