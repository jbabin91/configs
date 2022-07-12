import type { Feature } from "../feature";

export const vitestFeature: Feature = {
  name: "Vitest (Testing)",
  ignorePaths: ["coverage"],
  installDevDependencies: () => ["vitest", "c8"],
  addScripts: () => [
    { name: "test", command: "vitest" },
    { name: "coverage", command: "vitest --run --coverage" },
  ],
};
