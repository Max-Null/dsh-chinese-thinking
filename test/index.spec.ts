import { describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import SystemPrompt, { renderPrompt } from '@deepseek-ai/dsh-system-prompt'
import * as plugin from '../src/index.ts'

describe('dsh-chinese-thinking plugin', () => {
  it('injects the fixed Chinese section into the assembled prompt', async () => {
    const ctx = new Context()
    await ctx.plugin(SystemPrompt)
    const fiber = await ctx.plugin(plugin)

    const assembly = await ctx.systemPrompt.assemble()
    expect(assembly.sections.some(section => section.name === 'chinese-thinking')).toBe(true)
    expect(renderPrompt(assembly)).toContain('始终使用中文进行思考和回复')

    await fiber.dispose()
    expect((await ctx.systemPrompt.assemble()).sections.some(section => section.name === 'chinese-thinking')).toBe(false)
  })
})
