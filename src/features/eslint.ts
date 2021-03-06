import type { Feature } from "../feature";
import { formatWithPrettier } from "../format";

export const eslintFeature: Feature = {
  name: "ESLint (Linting)",
  installDevDependencies: () => [
    "eslint",
    "@types/eslint",
    "prettier",
    "@rushstack/eslint-patch",
  ],
  addScripts: () => [
    { name: "lint", command: "eslint --ext js,jsx,ts,tsx" },
    { name: "lint-fix", command: "pnpm lint -- --fix" },
  ],
  writeFiles: (context) => {
    const ignorePatterns = [
      ...context.ignoredPaths,
      ...context.lintIgnoredPaths,
    ].map((path) => `**/${path}/**`);

    const moduleString = `${context.selfPackageName}/eslint`;

    const eslintFile = [
      `// @ts-expect-error: the eslint patch doesn't have types`,
      `require("@rushstack/eslint-patch/modern-module-resolution")`,
      ``,
      `/** @type {import("eslint").Linter.Config} */`,
      `module.exports = {`,
      `  extends: [require.resolve(${JSON.stringify(moduleString)})],`,
      `  ignorePatterns: ${JSON.stringify(ignorePatterns)},`,
      `  parserOptions: {`,
      `    project: require.resolve("./tsconfig.json"),`,
      `  },`,
      `};`,
    ];

    return [
      {
        path: ".eslintrc.cjs",
        content: formatWithPrettier(eslintFile.join("\n"), ".eslintrc.cjs"),
      },
    ];
  },
};
