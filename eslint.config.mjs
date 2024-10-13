import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import js from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended,
  eslintConfigPrettier,
];
