# dsh-chinese-thinking

一个"小而美"的 DeepSeek Harness 插件，只做一件事：**注入一条固定的 system-prompt section，让 agent 始终用中文思考和回复**——无论用户用什么语言。

无存储、无工具、无状态。一条固定文本，前缀稳定、缓存安全。

## 注入的文案

> 始终使用中文进行思考和回复，无论用户使用什么语言。

## 用法

```bash
npm install @max-null/dsh-chinese-thinking
```

在你的 `cordis.yml` 加一条（`system-prompt` 由宿主已有）：

```yaml
- id: chinese-thinking
  name: '@max-null/dsh-chinese-thinking'
```

## 实现

```ts
ctx.systemPrompt.section({
  name: 'chinese-thinking',
  order: -90,   // persona 之前（身份声明 -100 之后），每轮最先读到
  text: '始终使用中文进行思考和回复，无论用户使用什么语言。',
})
```

## 依赖（peerDependencies，由宿主提供）

`@deepseek-ai/cordis`、`@deepseek-ai/dsh-system-prompt`
