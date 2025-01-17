/**
 * @param str { string }
 * @returns { boolean }
 */
function isUppercase(str) {
  return !!str && str.toUpperCase() === str
}

/**
 * Assert that the node is extended with parent information
 * @param {import('estree').Node} node
 * @returns {asserts node is { parent: import('estree').Node }}
 */
function hasParent(node) {
  if (!('parent' in node)) {
    throw new Error('missing parent property')
  }
}

/**
 * Try to get the name for a function
 * @param {(import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration)} node
 * @returns { string | null }
 */
function getFunctionName(node) {
  hasParent(node)
  if (node.type === 'FunctionDeclaration') {
    return node.id.name
  }
  if (
    node.type === 'ArrowFunctionExpression' ||
    node.type === 'FunctionExpression'
  ) {
    if (node.parent.type === 'VariableDeclarator' && 'name' in node.parent.id) {
      return node.parent.id.name
    }
  }
  return null
}

/**
 * @param str { string }
 * @returns { boolean }
 */
function isComposableName(name) {
  if (!name || !name.charAt(3)) {
    return false
  }
  return name.startsWith('use') && isUppercase(name.charAt(3))
}

/**
 * @param {import('estree').FunctionExpression | import('estree').ArrowFunctionExpression | import('estree').FunctionDeclaration} node
 * @returns { boolean }
 */
function isComposableFunction(node) {
  const name = getFunctionName(node)
  return name && isComposableName(name)
}

module.exports.isComposableName = isComposableName
module.exports.isComposableFunction = isComposableFunction
