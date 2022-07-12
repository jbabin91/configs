import type { Feature } from "../feature";

export const tailwindFeature: Feature = {
  name: "Tailwind CSS (Styling)",
  initiallyChecked: (context) =>
    context.environment.isBrowser && context.environment.isApplication,
  installDependencies: () => ["tailwindcss", "postcss", "autoprefixer"],
  copyFiles: () => [{ source: "assets/tailwindcss/*", destination: "." }],
};
