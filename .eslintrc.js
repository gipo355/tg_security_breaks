module.exports = {
    plugins: [
        '@typescript-eslint',
        'import'
    ],
    parser: '@typescript-eslint/parser',
    // set environment global variables like document window etc
    env: {
        'node': true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',

    },
    extends: [
        'eslint:recommended', //! maybe not needed
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript'
    ],
    rules: {
        // place to specify ESLint rules - can be used to overwrite rules specified from the extended configs
        // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
        // 'for-direction': 'error',

        // ! rules that fuck up studying
        'no-unused-vars': 'off', //! default on
        '@typescript-eslint/no-unused-vars': 'off', //! default on
        '@typescript-eslint/no-var-requires': 'off', // ! fixes import problems when using require
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prefer-const': 'off', //! default on, useful at buildtime
        'no-empty': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        "no-use-before-define": [ "error", { "functions": true, "classes": true, "variables": true } ]
    }
};