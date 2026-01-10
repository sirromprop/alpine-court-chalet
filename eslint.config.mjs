import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import astroPlugin from "eslint-plugin-astro";
import globals from "globals";

export default [
  // Global ignores
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // Disable base rules that TypeScript handles
      "no-unused-vars": "off",
      "no-undef": "off",

      // TypeScript strict rules - NO ANY TYPES
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",

      // Strict type checking
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",

      // Type annotations
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrowParameter: false,
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
        },
      ],

      // Code quality
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-redundant-type-constituents": "error",
      "@typescript-eslint/no-duplicate-type-constituents": "error",

      // Consistency
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/prefer-as-const": "error",

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "error",
      "react/jsx-key": "error",
      "react/no-array-index-key": "warn",
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // General code quality
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-debugger": "error",
      "no-alert": "error",
      "prefer-const": "error",
      "no-var": "error",
      curly: ["error", "all"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Astro files
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.browser,
        Astro: "readonly",
      },
    },
    rules: {
      // Astro-specific adjustments
      "no-unused-vars": "off",
    },
  },

  // JavaScript/MJS config files (less strict)
  {
    files: ["*.config.mjs", "*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
