const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "node .husky/helpers/rws.js",
    "prettier --write --config ./package.json --log-level silent",
    "prettier --write --plugin=prettier-plugin-organize-imports --log-level silent",
    buildEslintCommand,
  ],
};
