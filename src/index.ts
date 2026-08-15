/**
 * `dsh-chinese-thinking`: inject one stable system-prompt section so the agent
 * thinks and replies in Chinese, regardless of the user's language. It owns no
 * storage, tools, or state — one fixed section, prefix-stable and cache-safe.
 */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-system-prompt'

export const name = 'dsh-chinese-thinking'
export const inject = ['systemPrompt']

/** The fixed instruction injected into every assembled system prompt. */
export const PROMPT_TEXT = '始终使用中文进行思考和回复，无论用户使用什么语言。'

export function apply(ctx: Context): void {
  ctx.systemPrompt.section({
    name: 'chinese-thinking',
    // Before the deployment persona so the instruction is read first every turn.
    order: -90,
    text: PROMPT_TEXT,
  })
}
