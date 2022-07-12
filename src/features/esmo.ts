import type { Feature } from "../feature";

export const esmoFeature: Feature = {
  name: "esmo (ES modules)",
  initiallyChecked: (context) =>
    context.environment.isNode && context.environment.isApplication,
  addScripts: () => [
    { name: "start", command: "esmo --no-warnings src/main.ts" },
    {
      name: "dev",
      command: "nodemon --exec esmo --no-warnings --inspect src/main.ts",
    },
  ],
  installDependencies: () => ["esmo", "esbuild"],
  installDevDependencies: () => ["nodemon"],
};
