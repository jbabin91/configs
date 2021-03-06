// @ts-expect-error
require("@rushstack/eslint-patch/modern-module-resolution");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve("./eslint")],
  ignorePatterns: [
    "**/node_modues/**",
    "**/dist/**",
    "**/test/test-project/**",
  ],
  parserOptions: {
    project: require.resolve("./tsconfig.json"),
  },
};
