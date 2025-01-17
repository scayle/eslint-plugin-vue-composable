/**
 * Based on the no-lifecycle-after-await rule in eslint-plugin-vue, adapted to check for composables instead of lifecycle hooks
 * @see https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/no-lifecycle-after-await.js
 */

'use strict'

const { isComposableFunction, isComposableName } = require('../utils')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'disallow asynchronously called composable functions in composables',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      forbidden:
        'composables should not be called after an `await` expression within an composable',
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

        if ('name' in node.callee && isComposableName(node.callee.name)) {
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
