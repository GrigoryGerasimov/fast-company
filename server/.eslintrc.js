module.exports = {
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: "standard",
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
        "multiline-ternary": ["error", "never"],
        camelcase: ["off"],
        "no-useless-catch": ["off"]
    }
};
