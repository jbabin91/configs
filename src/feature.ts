import { promptCheckboxList } from "prompt-fns";
import type { JsonObject } from "type-fest";
import { eslintFeature } from "./features/eslint";
import { esmoFeature } from "./features/esmo";
import { prettierFeature } from "./features/prettier";
import { tailwindFeature } from "./features/tailwind";
import { tsupFeature } from "./features/tsup";
import { typescriptFeature } from "./features/typescript";
import { vitestFeature } from "./features/vitest";
import type { ProjectContext } from "./project-context";

export type Feature = {
  name: string;
  ignorePaths?: string[];
  gitIgnorePaths?: string[];
  lintIgnorePaths?: string[];
  typecheckIgnorePaths?: string[];
  formatIgnorePaths?: string[];
  initiallyChecked?: (context: ProjectContext) => boolean;
  installDependencies?: (context: ProjectContext) => string[];
  installDevDependencies?: (context: ProjectContext) => string[];
  copyFiles?: (
    context: ProjectContext,
  ) => Array<{ source: string; destination: string }>;
  writeFiles?: (
    context: ProjectContext,
  ) => Array<{ path: string; content: string | Iterable<string> }>;
  addScripts?: (
    context: ProjectContext,
  ) => Array<{ name: string; command: string }>;
  updatePackageJson?: (context: ProjectContext) => Array<{
    description: string;
    update: (PackageJson: JsonObject) => void;
  }>;
};

export const allFeatures: Feature[] = [
  eslintFeature,
  esmoFeature,
  prettierFeature,
  tailwindFeature,
  tsupFeature,
  typescriptFeature,
  vitestFeature,
];

export function promptFeatures(
  context: ProjectContext,
): Feature[] | PromiseLike<Feature[]> {
  return promptCheckboxList({
    message: "Choose your features:",
    choices: allFeatures.map((feature) => ({
      name: feature.name,
      value: feature,
    })),
    fallback: allFeatures.filter(
      (feature) => feature.initiallyChecked?.(context) ?? true,
    ),
  });
}
