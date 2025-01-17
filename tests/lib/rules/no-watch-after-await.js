const rule = require('../../../lib/rules/no-watch-after-await')
const { RuleTester } = require('eslint')

const ruleTester = new RuleTester({ languageOptions: { ecmaVersion: 2020 } })
ruleTester.run('no-watch-after-await', rule, {
  valid: [
    {
      code: `
function useSomething() {
  const foo = useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
    },
    {
      code: `
const useSomething = function () {
  const foo = useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
    },
    {
      code: `
const useSomething = () => {
  const foo = useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
    },
  ],
  invalid: [
    {
      code: `async function useSomething() {
  const foo = await useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 3,
        },
      ],
    },
    {
      code: `const useSomething = async function() {
  const foo = await useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 3,
        },
      ],
    },
    {
      code: `const useSomething = async () => {
  const foo = await useSomethingElse()
  watch(foo, () => { console.log('change') })
}
`,
      errors: [
        {
          messageId: 'forbidden',
          line: 3,
        },
      ],
    },
  ],
})
