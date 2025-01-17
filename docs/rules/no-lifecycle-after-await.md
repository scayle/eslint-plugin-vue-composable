# Disallow asynchronously registered lifecycle hooks in composables (`@scayle/vue-composable/no-lifecycle-after-await`)

<!-- end auto-generated rule header -->

Vue requires that all lifecycle hooks are called synchronously during a component's setup. This rule validates that when a lifecycle hook is called inside a composable, it is synchronous and does occur after an `await` expression. Because composables must also be called synchronously within a component's setup, this should ensure that the lifecycle hook is also called synchronously. 

See the [Vue Docs](https://vuejs.org/api/composition-api-lifecycle.html) for more information

## Fail

```ts
export async function useMyComposable() {
  const foo = await useSomeOtherComposable()
  onMounted(() => { /* do something */ })
}
```

## Pass

```ts
export async function useMyComposable() {
  onMounted(() => { /* do something */ })
  const foo = await useSomeOtherComposable()
}
```