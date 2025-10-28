# @scayle/eslint-plugin-vue-composable

<div align="center">
  <img src="https://cdn-prod.scayle.com/public/media/general/SCAYLE-Commerce-Engine-header.png" />
</div>

<div align="center">
  <h1>@scayle/eslint-plugin-vue-composable</h1>
</div>

<div align="center">
  <h4><a href="https://www.scayle.com/">Website</a></h4>
</div>

<div align="center">
  An ESLint plugin that enforces Vue 3 Composition API best practices by detecting composables,
  lifecycle hooks, watchers, and computed properties called after async operations.
  Prevents subtle reactivity bugs caused by losing component context after await statements.
</div>
<br/>
<div align="center">
  <a href="https://www.npmjs.com/package/@scayle/eslint-plugin-vue-composable"><img src="https://img.shields.io/npm/v/@scayle/eslint-plugin-vue-composable/latest.svg?style=flat&colorB=007ec6" /></a>
  <a href="https://www.npmjs.com/package/@scayle/eslint-plugin-vue-composable"><img src="https://img.shields.io/npm/dm/@scayle/eslint-plugin-vue-composable.svg?style=flat&colorB=007ec6" /></a>
  <a href="https://www.npmjs.com/package/@scayle/eslint-plugin-vue-composable"><img src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>
  <a href="https://nuxt.com"><img src="https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js" /></a>
</div>

## Why use this plugin?

When writing Vue 3 composables with async operations,
it's easy to accidentally lose the component context after an `await` statement.
This happens because the current instance is tracked and can become undefined after asynchronous operations.

For example, this code has a subtle bug:

```js
export const useExample = async () => {
  const data = await fetchData()

  // ❌ This can cause errors because component context might be lost
  const count = ref(0)
  onMounted(() => {
    console.log('mounted')
  })

  return { count }
}
```

This ESLint plugin catches these issues at development time,
preventing runtime errors and reactivity bugs that are difficult to debug in production.

## Installation

You'll need to install [ESLint](https://eslint.org/) along with this package:

```bash
# Using pnpm
pnpm add --dev eslint @scayle/eslint-plugin-vue-composable

# Using yarn
yarn add --dev eslint @scayle/eslint-plugin-vue-composable

# Using npm
npm install --save-dev eslint @scayle/eslint-plugin-vue-composable
```

## Usage

Add `@scayle/eslint-plugin-vue-composable` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": [
    "@scayle/vue-composable"
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@scayle/vue-composable/no-composable-after-await": "warn",
    "@scayle/vue-composable/no-lifecycle-after-await": "error",
    "@scayle/vue-composable/no-watch-after-await": "error",
    "@scayle/vue-composable/no-computed-after-await": "error"
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                                 | Description                                                                 |
| :------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| [no-composable-after-await](docs/rules/no-composable-after-await.md) | disallow asynchronously called composable functions in composables          |
| [no-computed-after-await](docs/rules/no-computed-after-await.md)     | disallow asynchronously registered `computed` in composables                |
| [no-lifecycle-after-await](docs/rules/no-lifecycle-after-await.md)   | disallow asynchronously registered lifecycle hooks in composables           |
| [no-watch-after-await](docs/rules/no-watch-after-await.md)           | disallow asynchronously registered `watch` and `watchEffect` in composables |

<!-- end auto-generated rules list -->

## License

Licensed under the [MIT License](https://opensource.org/license/mit/)

## What is SCAYLE?

[SCAYLE](https://scayle.com) is a full-featured e-commerce software solution that comes with flexible APIs.
Within SCAYLE, you can manage all aspects of your shop, such as products, stocks, customers, and transactions.

Learn more about [SCAYLE’s architecture](https://scayle.dev/en/core-documentation/welcome-to-scayle/getting-started) and commerce modules in the Docs.

## Other channels

- [LinkedIn](https://www.linkedin.com/company/scaylecommerce/)
- [Jobs](https://careers.smartrecruiters.com/ABOUTYOUGmbH/scayle)
