// module.exports = {
//     root: true,
//     'extends': [
//         'plugin:vue/essential',
//         '@vue/standard'
//     ],
//     rules: {
//         // allow async-await
//         'generator-star-spacing': 'off',
//         // allow debugger during development
//         'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//         'vue/no-parsing-error': [2, {
//             'x-invalid-end-tag': false
//         }],
//         'no-undef': 'off',
//         'camelcase': 'off',
//         "indent": [1, 4],
//         "space-before-function-paren": 0
//     },
//     parserOptions: {
//         parser: 'babel-eslint'
//     }
// }
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': 'off',
        'indent': [2, 4],
        'space-before-function-paren': ['error', 'always'],
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
        // iview标签渲染模式
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: [
        'vuefix'
    ]
}
