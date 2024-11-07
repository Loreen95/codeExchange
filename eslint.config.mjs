import { fileURLToPath } from "url";
import path from "path";
import { defaults, rules } from "@hboictcloud/eslint-plugin";
import { rules as codeExchangeRules } from "@hboictcloud/eslint-plugin-code-exchange";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    // Ignores
    {
        ignores: [
            "eslint.config.mjs",
            "**/dist/"
        ],
    },
    // Defaults
    ...defaults,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        },
    },
    // Rules
    ...rules,
    ...codeExchangeRules,
];
