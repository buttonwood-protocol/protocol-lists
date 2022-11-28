'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getNewVersion = void 0
const token_lists_1 = require('@uniswap/token-lists')
const json_diff_ts_1 = require('json-diff-ts')
const getProtocolListsDiff_1 = require('./getProtocolListsDiff')
const maxVersionUpgrade_1 = require('./maxVersionUpgrade')
const ignoredMetadataPaths = ['$.timestamp', '$.version']
const protocolKeysPatch = ['imageURI', 'homepage', 'overrides']
const protocolPathsPatch = ['$.overrides']

function isPathIncluded (paths, path) {
  return paths.some((comparisonPath) => {
    return path.startsWith(comparisonPath)
  })
}

/**
 * Computes the new version number based off the previous version number and the changes introduced in the new list.
 * This function assumes the given lists pass schema validation and does not guarantee accurate results if not.
 * @param listOld
 * @param listNew
 */
function getNewVersion (listOld, listNew) {
  const { metadataChanges, protocolChanges } = (0, getProtocolListsDiff_1.getProtocolListsDiff)(listOld, listNew)
  let versionUpgrade = token_lists_1.VersionUpgrade.NONE
  for (const change of metadataChanges) {
    if (!isPathIncluded(ignoredMetadataPaths, change.path)) {
      versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.PATCH)
    }
  }
  for (const protocolChange of protocolChanges) {
    if (protocolChange.type === 'ADD') {
      versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.MINOR)
    } else if (protocolChange.type === 'REMOVE') {
      versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.MAJOR)
      break
    } else if (protocolChange.changes) {
      for (const change of protocolChange.changes) {
        if (protocolKeysPatch.includes(change.key)) {
          versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.PATCH)
        } else if (isPathIncluded(protocolPathsPatch, change.path)) {
          versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.PATCH)
        } else if (change.path.startsWith('$.chains')) {
          if (change.type === json_diff_ts_1.Operation.ADD) {
            versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.MINOR)
          } else {
            versionUpgrade = (0, maxVersionUpgrade_1.maxVersionUpgrade)(versionUpgrade, token_lists_1.VersionUpgrade.MAJOR)
            break
          }
        } else {
          throw new Error(`Unhandled protocol change: ${JSON.stringify(change)}`)
        }
      }
    }
  }
  return (0, token_lists_1.nextVersion)(listOld.version, versionUpgrade)
}

exports.getNewVersion = getNewVersion
//# sourceMappingURL=getNewVersion.js.map