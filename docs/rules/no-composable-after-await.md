# Disallow asynchronously called composable functions in composables (`@scayle/vue-composable/no-composable-after-await`)

<!-- end auto-generated rule header -->

Vue requires that all composables are called synchronously. This rule validates that a call to a composable does not occur after an `await` expression.

See the [Vue Docs](https://vuejs.org/guide/reusability/composables.html#usage-restrictions) for more information

## Fail

```ts
export async function useMyComposable() {
  const foo = await useSomeOtherComposable()
  const bar = await useAnotherComposable()
}
```

## Pass

```ts
export async function useMyComposable() {
  const [foo, bar] = await Promise.all([useSomeOtherComposable(), useAnotherComposable()])
}
```