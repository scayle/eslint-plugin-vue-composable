import { createRequire } from 'node:module'
import noComposableAfterAwait from './rules/no-composable-after-await.mjs'
import noLifecycleAfterAwait from './rules/no-lifecycle-after-await.mjs'
import noWatchAfterAwait from './rules/no-watch-after-await.mjs'
import noComputedAfterAwait from './rules/no-computed-after-await.mjs'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

export default {
  meta: {
    name: '@scayle/eslint-plugin-vue-composable',
    version,
  },
  rules: {
    'no-composable-after-await': noComposableAfterAwait,
    'no-lifecycle-after-await': noLifecycleAfterAwait,
    'no-watch-after-await': noWatchAfterAwait,
    'no-computed-after-await': noComputedAfterAwait,
  },
}
