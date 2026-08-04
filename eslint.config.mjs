/**
 * Flat config (ESLint 9).
 *
 * Note this does NOT use FlatCompat, unlike the ForTheRestOfUs studio site.
 * That site is on Next 15, whose eslint-config-next still ships in eslintrc
 * format and needs the compat shim. From Next 16, eslint-config-next exports
 * native flat-config arrays, and running them back through FlatCompat throws
 * "Converting circular structure to JSON" — so they are spread directly.
 *
 * When FTROU moves to Next 16, its config should be flattened the same way.
 */
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".claude/**",
      "next-env.d.ts",
      // Saved copy of a third-party site, kept as a local design reference.
      // Gitignored, but flat config does not read .gitignore, and its minified
      // bundle otherwise produces ~98 warnings that drown out our own.
      "Example/**",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
