/**
 * Based on the no-lifecycle-after-await rule in eslint-plugin-vue, adapted for composables
 * @see https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-lifecycle-after-await.js
 */

'use strict'

const { isComposableFunction } = require('../utils')

const LIFECYCLE_HOOKS = [
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onErrorCaptured',
  'onMounted',
  'onRenderTracked',
  'onRenderTriggered',
  'onUnmounted',
  'onUpdated',
  'onActivated',
  'onDeactivated',
]

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow asynchronously registered lifecycle hooks in composables',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      forbidden:
        'Lifecycle hooks are forbidden after an `await` expression within composables.',
    },
  },
  create(context) {
    /**
     * @typedef {object} ComposableScopeData
     * @property {boolean} afterAwait
     */

    /**
     * @typedef {object} ScopeStack
     * @property {ScopeStack | null} upper
     * @property {import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration} scopeNode
     */

    /** @type {ScopeStack | null} */
    let scopeStack = null

    // Tag composable function scopes with additional data
    /** @type {Map<import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration, ComposableScopeData>} */
    const composableScopes = new Map()

    return {
      /** @param {import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration} node */
      ':function'(node) {
        scopeStack = {
          upper: scopeStack,
          scopeNode: node,
        }

        if (isComposableFunction(node)) {
          composableScopes.set(node, { afterAwait: false })
        }
      },
      /** @param {import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration} node */
      ':function:exit'(node) {
        scopeStack = scopeStack && scopeStack.upper
        composableScopes.delete(node)
      },
      'AwaitExpression:exit'() {
        if (!scopeStack) {
          return
        }
        const scopeData = composableScopes.get(scopeStack.scopeNode)
        if (!scopeData) {
          return
        }
        scopeData.afterAwait = true
      },
      CallExpression(node) {
        if (!scopeStack) {
          return
        }
        const scopeData = composableScopes.get(scopeStack.scopeNode)
        if (!scopeData) {
          return
        }

        if (
          'name' in node.callee && LIFECYCLE_HOOKS.includes(node.callee.name)
        ) {
          if (node.arguments.length >= 2) {
            // Has target instance. e.g. `onMounted(() => {}, instance)`
            return
          }
          if (scopeData.afterAwait) {
            context.report({
              node,
              messageId: 'forbidden',
            })
          }
        }
      },
    }
  },
}
