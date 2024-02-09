module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true
    },
    parserOptions: {
        sourceType: "module",
    },
    rules: {
        'prettier/prettier': 0
    },
    plugins: ['prettier'],
    extends: ['prettier']
}