'use strict'

module.exports.rules = {
  'no-composable-after-await': require('./rules/no-composable-after-await'),
  'no-lifecycle-after-await': require('./rules/no-lifecycle-after-await'),
  'no-watch-after-await': require('./rules/no-watch-after-await'),
  'no-computed-after-await': require('./rules/no-computed-after-await'),
}
