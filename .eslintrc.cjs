module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-prettier',
    // 'plugin:json/recommended', // 将 JSON 插件配置移到主 extends
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['json'], // 添加 json 插件
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // 'json/*': ['error', { allowComments: true }], // JSON 文件规则
  },
  overrides: [
    {
      files: ['*.json'],
      // parser: 'jsonc-eslint-parser', // 为 JSON 文件指定解析器
      // extends: ['plugin:json/recommended'],
      rules: {
        'json/unknown-property': 'off', // 可选：关闭未知属性检查
      },
    },
  ],
};
