const rule = require('../../../lib/rules/no-composable-after-await')
const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2020 } })
ruleTester.run('no-composable-after-await', rule, {
  valid: [
    {
      code: `
async function useSomething() {
  useSomethingElse()
  const foo = await useSomethingElse()
}
`,
    },
    {
      code: `
const useSomething = async function () {
  useSomethingElse()
  const foo = await useSomethingElse()
}
`,
    },
    {
      code: `
const useSomething = async () => {
  useSomethingElse()
  const foo = await useSomethingElse()
}
`,
    },
  ],
  invalid: [
    {
      code: `
async function useSomething() {
  const foo = await useSomethingElse()
  useSomethingElse()
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 4,
        },
      ],
    },
    {
      code: `
const useSomething = async function() {
  const foo = await useSomethingElse()
  useSomethingElse()
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 4,
        },
      ],
    },
    {
      code: `
const useSomething = async () => {
  const foo = await useSomethingElse()
  useSomethingElse()
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 4,
        },
      ],
    },
  ],
})
