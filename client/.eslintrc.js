module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4],
        semi: ["error", "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
        "multiline-ternary": ["error", "never"],
        "react/display-name": ["off"],
        camelcase: ["off"]
    }
};
