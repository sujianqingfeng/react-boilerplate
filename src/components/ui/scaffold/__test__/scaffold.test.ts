import { describe, test, expect } from 'vitest'
import { resolveForm } from '../scaffold'

describe('scaffold', () => {
	test('resolveForm', () => {
		const form = resolveForm([
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
