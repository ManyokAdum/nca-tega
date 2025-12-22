module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: ["./stylelint/no-raw-colors.js"],
  rules: {
    "nyan/no-raw-colors": true,
    "color-no-hex": null,
    "alpha-value-notation": "percentage",
    "selector-class-pattern": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "layer"],
      },
    ],
  },
  ignoreFiles: ["**/node_modules/**", "**/dist/**", "**/storybook-static/**"],
};

