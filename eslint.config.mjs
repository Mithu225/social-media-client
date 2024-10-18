import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
];
