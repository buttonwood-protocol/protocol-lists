'use strict'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k
  var desc = Object.getOwnPropertyDescriptor(m, k)
  if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () { return m[k] } }
  }
  Object.defineProperty(o, k2, desc)
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k
  o[k2] = m[k]
}))
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
  Object.defineProperty(o, 'default', { enumerable: true, value: v })
}) : function (o, v) {
  o['default'] = v
})
var __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod
  var result = {}
  if (mod != null) for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.getProtocolListsDiff = void 0
const jsonDiff = __importStar(require('json-diff-ts'))
const json_diff_ts_1 = require('json-diff-ts')

function getMetadata (protocolList) {
  return Object.assign(Object.assign({}, protocolList), { protocols: null })
}

function getProtocolNamesMap (protocols) {
  const map = new Map()
  for (const protocol of protocols) {
    map.set(protocol.name, protocol)
  }
  return map
}

function getProtocolListsDiff (list1, list2) {
  const list1Metadata = getMetadata(list1)
  const list2Metadata = getMetadata(list2)
  const metadataChanges = (0, json_diff_ts_1.flattenChangeset)(jsonDiff.diff(list1Metadata, list2Metadata))
  const protocolChanges = []
  const list1ProtocolNamesMap = getProtocolNamesMap(list1.protocols)
  const list2ProtocolNamesMap = getProtocolNamesMap(list2.protocols)
  const allProtocolNames = new Set([
    ...list1ProtocolNamesMap.keys(),
    ...list2ProtocolNamesMap.keys(),
  ])
  for (const protocolName of Array.from(allProtocolNames)) {
    const list1Protocol = list1ProtocolNamesMap.get(protocolName)
    const list2Protocol = list2ProtocolNamesMap.get(protocolName)
    if (list1Protocol) {
      if (list2Protocol) {
        const changes = (0, json_diff_ts_1.flattenChangeset)(jsonDiff.diff(list1Protocol, list2Protocol))
        if (changes.length) {
          protocolChanges.push({
            type: 'UPDATE',
            protocolName,
            changes,
          })
        }
      } else {
        protocolChanges.push({ type: 'REMOVE', protocolName })
      }
    } else {
      protocolChanges.push({ type: 'ADD', protocolName })
    }
  }
  return {
    metadataChanges,
    protocolChanges,
  }
}

exports.getProtocolListsDiff = getProtocolListsDiff
//# sourceMappingURL=getProtocolListsDiff.js.map