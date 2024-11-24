import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // React verzió automatikus felismerése
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // JSX esetén ne várja el a React importját
    },
  },
  {
    files: ["**/*.test.js"], // Csak tesztfájlokra vonatkozó konfiguráció
    plugins: {
      jest: pluginJest,
    },
    rules: pluginJest.configs.recommended.rules,
  },
];
