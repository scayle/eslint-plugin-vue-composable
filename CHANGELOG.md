# @scayle/eslint-plugin-vue-composable

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
