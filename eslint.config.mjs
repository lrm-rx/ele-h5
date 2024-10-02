import antfu from '@antfu/eslint-config'

export default antfu({
  // 使用 prettier 格式化 css html 等
  formatters: true,
  // vue的 eslint 配置
  vue: true,
  // 保存删除未引入的代码
  // isInEditor: false,
  // @9.x 版本 忽略文件这种配置方式 废弃掉 eslintignore
  ignores: [
    '*.sh',
    'node_modules',
    '*.md',
    '*.woff',
    '*.ttf',
    '.idea',
    '/public',
    '/docs',
    '.husky',
    '.local',
    '/bin',
    'Dockerfile',
  ],
  rules: {
    'unused-imports/no-unused-vars': 'off',
    'ts/no-empty-object-type': 'off',
    'no-console': 'off',
    'ts/consistent-type-definitions': 'off',
    'unicorn/new-for-builtins': 'off',
    'ts/ban-ts-comment': 'off'
  },
})
