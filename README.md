# @scayle/eslint-plugin-vue-composable

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Rules to avoid unpleasant composable problems

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

<!-- ## Configurations -->

<!-- begin auto-generated configs list -->

<!-- TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered). -->

<!-- end auto-generated configs list -->

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

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@scayle/eslint-plugin-vue-composable/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@scayle/eslint-plugin-vue-composable
[npm-downloads-src]: https://img.shields.io/npm/dm/@scayle/eslint-plugin-vue-composable.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@scayle/eslint-plugin-vue-composable
[license-src]: https://img.shields.io/npm/l/@scayle/eslint-plugin-vue-composable.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@scayle/eslint-plugin-vue-composable
