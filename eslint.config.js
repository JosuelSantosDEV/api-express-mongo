import globals  from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    env:
    {
      browser: true,
      es2021: true,
      node:true,
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest", 
      sourceType: "module",
    },
  },
  
  pluginJs.configs.recommended,

  {
    rules: {
      "comma-dangle": ["error", "always-multiline"], 
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "quote-props": ["error", "consistent-as-needed"],
    },
  },
];
