import type { Feature } from "../feature";

export const tsupFeature: Feature = {
  name: "tsup (Build)",
  ignorePaths: ["dist"],
  initiallyChecked: (context) =>
    context.environment.isNode && context.environment.isLibrary,
  installDevDependencies: () => ["tsup", "esbuild"],
  addScripts: (context) => {
    const command = [
      context.environment.isNode ? "tsup-node" : "tsup",
      "src/main.ts",
      "--clean",
      "--target node16",
      "--format esm",
      "--sourcemap",
      context.environment.isLibrary ? "--dts" : "",
    ].join(" ");

    return [{ name: "build", command }];
  },
};
