#!/usr/bin/env node
/**
 * 从 CHANGELOG.md 提取指定版本的段落，供 `gh release create --notes-file` 使用。
 *
 * 找不到时输出空并以 0 退出：notes 缺失不该阻断发布——workflow 会用
 * `--generate-notes` 兜底（见 publish.yml 的 `-s` 判断）。缺 CHANGELOG 这件事
 * 留给发版前的检查发现，而不是让一次已经成功的 npm publish 变成红色 job。
 * stderr 仍打一行警告，日志里看得见。
 *
 * 用法：node scripts/release-notes.mjs 0.17.0
 * 退出码：0 正常（包括缺 CHANGELOG / 缺版本段）；2 缺参数。
 */
import { existsSync, readFileSync } from 'node:fs'

const version = process.argv[2]
if (version === undefined || version === '') {
  console.error('usage: release-notes.mjs <version>')
  process.exit(2)
}

const changelog = new URL('../CHANGELOG.md', import.meta.url)
if (!existsSync(changelog)) {
  console.error('CHANGELOG.md not found; release body will be generated from commits')
  process.exit(0)
}

const text = readFileSync(changelog, 'utf8')
const lines = text.split(/\r?\n/)
const start = lines.findIndex(line => line.startsWith(`## [${version}]`))
if (start === -1) {
  console.error(`CHANGELOG: section for ${version} not found; release body will be generated from commits`)
  process.exit(0)
}

let end = lines.length
for (let i = start + 1; i < lines.length; i++) {
  if (lines[i].startsWith('## [')) {
    end = i
    break
  }
}

// 空 section 也走 generate-notes 兜底：workflow 的 `-s` 判断的是文件大小
process.stdout.write(`${lines.slice(start + 1, end).join('\n').trim()}\n`)
