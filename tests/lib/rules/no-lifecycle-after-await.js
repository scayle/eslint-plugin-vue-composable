const rule = require('../../../lib/rules/no-lifecycle-after-await')
const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2020 } })
ruleTester.run('no-lifecycle-after-await', rule, {
  valid: [
    {
      code: `
async function useSomething() {
  onMounted(() => { /* */ })
  const foo = await useSomethingElse()
}
`,
    },
    {
      code: `
const useSomething = async function () {
  onMounted(() => { /* */ })
  const foo = await useSomethingElse()
}
`,
    },
    {
      code: `
const useSomething = async () => {
  onMounted(() => { /* */ })
  const foo = await useSomethingElse()
}
`,
    },
    {
      code: `
async function useSomething() {
  const foo = await useSomethingElse()
  onMounted(() => { /* */ }, instance)
}
  `,
    },
  ],
  invalid: [
    {
      code: `
async function useSomething() {
  const foo = await useSomethingElse()
  onMounted(() => { /* */ })
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
  onMounted(() => { /* */ })
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
  onMounted(() => { /* */ })
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
