# Disallow asynchronously registered `watch` and `watchEffect` in composables (`@scayle/vue-composable/no-watch-after-await`)

<!-- end auto-generated rule header -->

In order for a watcher to be cleaned up automatically when its associated component is unmounted, it must be declared synchronously during the component's setup. Since this is typically the wanted behavior, this rule validates that `watch` and `watchEffect` are not called asynchronously by being placed after an `await` expression.

See the [Vue Docs](https://vuejs.org/guide/essentials/watchers.html#stopping-a-watcher) for more information

## Fail

```ts
export async function useMyComposable() {
  const foo = await useSomeOtherComposable()
  watch(foo, () => console.log('foo changed'))
}
```

## Pass

```ts
export async function useMyComposable() {
  const foo = useSomeOtherComposable()
  watch(foo, () => console.log('foo changed'))
}
```