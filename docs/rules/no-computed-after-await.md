# Disallow asynchronously registered `computed` in composables (`@scayle/vue-composable/no-computed-after-await`)

<!-- end auto-generated rule header -->

`computed` depends on the current `EffectScope`. When called from a component's `setup` function, the `EffectScope` will be tied to the component's lifecycle. When the component is unmounted, reactive dependencies including `computed()` properties created during the execution of the `setup` function will be disposed. For this work, `computed` must be called synchronously from the `setup` function. It can be directly called from `setup` or through a composable which `setup` depends on. (Composables must also be called synchronously.) When `computed` is called after an `await` expression, the `EffectScope` will not be present and the computed properties will not be disposed on unmount.

This rule disallows calling `computed` after an `await` expression.

## Fail

```ts
export async function useMyComposable() {
  const foo = await useSomeOtherComposable()
  const bar = computed(() => foo.length)
}
```

## Pass

```ts
export async function useMyComposable() {
  const foo = useSomeOtherComposable()
  const bar = computed(() => foo.length)
}
```