import chalk from "chalk";
import { promptFeatures } from "./feature";
import {
  applyEnabledFeatures,
  getInitalProjectContext,
} from "./project-context";

console.info(
  `${chalk.cyan`i`} Current working directory:`,
  chalk.bold.cyan(process.cwd()),
);

const context = await getInitalProjectContext();
context.enabledFeatures = await promptFeatures(context);
await applyEnabledFeatures(context);
