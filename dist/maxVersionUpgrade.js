'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.maxVersionUpgrade = void 0
const token_lists_1 = require('@uniswap/token-lists')

/**
 * Returns the higher of two version upgrade types
 * @param version1
 * @param version2
 */
function maxVersionUpgrade (version1, version2) {
  if (version1 === token_lists_1.VersionUpgrade.MAJOR || version2 === token_lists_1.VersionUpgrade.MAJOR) {
    return token_lists_1.VersionUpgrade.MAJOR
  }
  if (version1 === token_lists_1.VersionUpgrade.MINOR || version2 === token_lists_1.VersionUpgrade.MINOR) {
    return token_lists_1.VersionUpgrade.MINOR
  }
  if (version1 === token_lists_1.VersionUpgrade.PATCH || version2 === token_lists_1.VersionUpgrade.PATCH) {
    return token_lists_1.VersionUpgrade.PATCH
  }
  return token_lists_1.VersionUpgrade.NONE
}

exports.maxVersionUpgrade = maxVersionUpgrade
//# sourceMappingURL=maxVersionUpgrade.js.map