const path = require("node:path");
const stylelint = require("stylelint");

const ruleName = "nyan/no-raw-colors";
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (value) => `Unexpected raw hex color "${value}". Use design tokens instead.`,
});

module.exports = stylelint.createPlugin(ruleName, (enabled = true) => {
  return (root, result) => {
    if (!enabled) return;

    const filePath = root.source?.input?.file ?? "";
    if (filePath && path.normalize(filePath).includes(path.normalize("src/styles/branding.css"))) {
      return;
    }

    root.walkDecls((decl) => {
      const matches = decl.value.match(/#(?:[A-Fa-f0-9]{3,6})\b/g);
      if (!matches) return;

      matches.forEach((match) => {
        stylelint.utils.report({
          ruleName,
          result,
          message: messages.rejected(match),
          node: decl,
          word: match,
        });
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
