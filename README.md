# Vue 3 + TypeScript + Vite

### 解决跨域

- 常用的跨域方案

  - jsonp: <script> 不受同源策略限制
  - 跨源域资源共享 CORS: 允许Web应用服务器进行跨源访问控制
  - 使用不同的源变成同源

### 反向代理

- 代理: 请求转发

### rem 适配方案

- px 转 rem
  rem(css属性) = px(css属性)/px(body的fontSize)

### post-css

- css 转换工具
  - autoprefixer: 自动管理 css 属性的浏览器前缀
  - postcss-pxtorem: px 转换为 rem

### BEM 命名规范

- BEM是块(block)、元素(element)、修饰符(modifier)的简写
  - `-` 中划线: 仅作为连字符使用, 表示某个块或者某个子元素的多单词之间的连接记号
  - `__` 双下划线: 双下划线用来连接块和块的子元素
  - `--` 双中划线: 双中划线用来描述一个块或者块的子元素的一种状态
