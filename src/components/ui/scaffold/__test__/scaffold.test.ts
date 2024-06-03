import { describe, expect, test } from 'vitest'
import { resolveInitialForm } from '../../dynamic-form'

describe('scaffold', () => {
	test('resolveForm', () => {
		const form = resolveInitialForm([
			{ type: 'date-range', field: ['s', 'e'] },
			{ type: 'input', field: 'name' },
		])
		expect(form).toMatchInlineSnapshot(`
			{
			  "e": "",
			  "name": "",
			  "s": "",
			}
		`)
	})
})
