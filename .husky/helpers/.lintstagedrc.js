const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write --log-level warn --config ./package.json '!prisma/migrations'",
    "prettier --write --log-level warn --plugin=prettier-plugin-organize-imports '!prisma/migrations'",
    buildEslintCommand,
  ],
};
