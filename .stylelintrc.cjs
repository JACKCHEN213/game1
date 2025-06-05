module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-vue' // 专门用于 Vue 的配置
    ],
    customSyntax: 'postcss-html', // 明确指定语法解析器
    rules: {
        // 你的其他规则...
        'selector-class-pattern': null, // 允许任何类名格式
        'value-keyword-case': null, // 关闭属性值大小写检查
        'function-url-quotes': 'always', // 统一 URL 引号
        'no-descending-specificity': null // 允许特异性降序
    }
}