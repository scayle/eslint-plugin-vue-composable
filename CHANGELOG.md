# @scayle/eslint-plugin-vue-composable

## 1.1.0

### Minor Changes

- All packages now require Node.js 22 or later, in line with the current Node.js LTS release schedule. See the [Node.js release schedule](https://nodejs.org/en/about/previous-releases#release-schedule) for details.

  If your project is still running an older Node.js version, now is a good time to upgrade to Node.js 22 at minimum, or ideally Node.js 24, for the latest security patches and stability improvements.

## 1.0.0

### Major Changes

- Upgraded the plugin to ESLint v10, ESM (`.mjs`), and flat config only. The package now exports a single ESM entry (`lib/index.mjs`) and no longer supports CommonJS or legacy eslintrc.

  - Requires ESLint `>=10` and flat config (`eslint.config.js` / `eslint.config.mjs`).
  - Plugin must be used via direct import and the object plugin form; `FlatCompat` and string plugin names are no longer supported.

  Consumers using `compat.config({ plugins: ['@scayle/vue-composable'], rules: ... })` must switch to direct import and object plugin. Example:

  - Before:

    ```js
    import { FlatCompat } from '@eslint/eslintrc'
    const compat = new FlatCompat()
    // ...
    ...compat.config({
      plugins: ['@scayle/vue-composable'],
      rules: {
        '@scayle/vue-composable/no-composable-after-await': 'error',
        '@scayle/vue-composable/no-lifecycle-after-await': 'error',
        '@scayle/vue-composable/no-watch-after-await': 'error',
        '@scayle/vue-composable/no-computed-after-await': 'error',
      },
    })
    ```

  - After:

    ```js
    import vueComposable from '@scayle/eslint-plugin-vue-composable'
    // ...
    {
      plugins: { '@scayle/vue-composable': vueComposable },
      rules: {
        '@scayle/vue-composable/no-composable-after-await': 'error',
        '@scayle/vue-composable/no-lifecycle-after-await': 'error',
        '@scayle/vue-composable/no-watch-after-await': 'error',
        '@scayle/vue-composable/no-computed-after-await': 'error',
      },
    }
    ```

## 0.2.3

### Patch Changes

- This is an internal change only. The packages now use the PNPM catalog feature to ensure dependencies use the identical version across packages.

## 0.2.2

### Patch Changes

- Cleaned up README.md and added CONTRIBUTING.md. No functional changes.

## 0.2.1

### Patch Changes

- Update to Eslint 9

## 0.2.0

### Minor Changes

- Add new rule `no-computed-after-await`

  This rule disallows calling `computed` after an `await` expression, ensuring that computed properties are properly coupled with the component lifecycle.

## 0.1.1

### Patch Changes

- Fix config example in README

## 0.1.0

### Minor Changes

- Add new rule `no-composable-after-await`

  Vue requires that all composables are called synchronously. This rule validates that a call to a composable does not occur after an `await` expression.

  See the [Vue Docs](https://vuejs.org/guide/reusability/composables.html#usage-restrictions) for more information

- Add new rule `no-lifecycle-after-await`

  Vue requires that all lifecycle hooks are called synchronously during a component's setup. This rule validates that when a lifecycle hook is called inside a composable, it is synchronous and does occur after an `await` expression. Because composables must also be called synchronously within a component's setup, this should ensure that the lifecycle hook is also called synchronously.

  See the [Vue Docs](https://vuejs.org/api/composition-api-lifecycle.html) for more information

- Add new rule `no-watch-after-await`

  In order for a watcher to be cleaned up automatically when its associated component is unmounted, it must be declared synchronously during the component's setup. Since this is typically the wanted behavior, this rule validates that `watch` and `watchEffect` are not called asynchronously by being placed after an `await` expression.

  See the [Vue Docs](https://vuejs.org/guide/essentials/watchers.html#stopping-a-watcher) for more information
