import * as jsonDiff from 'json-diff-ts';
import { flattenChangeset } from 'json-diff-ts';
import { ProtocolInfo, ProtocolList } from './types';

export interface ProtocolChange {
  /**
   * Whether the protocol itself is being added, removed or updated
   */
  type: 'ADD' | 'UPDATE' | 'REMOVE';
  /**
   * The protocol the changes belong to
   */
  protocolName: string;
  /**
   * Present when type=UPDATE. This lists the changes made to the protocol
   */
  changes?: jsonDiff.IFlatChange[];
}

export interface ProtocolListsDiff {
  /**
   * The changes present in the Protocol List metadata section
   */
  metadataChanges: jsonDiff.IFlatChange[];
  /**
   * The changes present across the protocols themselves
   */
  protocolChanges: ProtocolChange[];
}

function getMetadata(protocolList: ProtocolList) {
  return { ...protocolList, protocols: null };
}

function getProtocolNamesMap(
  protocols: ProtocolInfo[],
): Map<string, ProtocolInfo> {
  const map = new Map();
  for (const protocol of protocols) {
    map.set(protocol.name, protocol);
  }
  return map;
}

/**
 * Generates a summary of the differences between two Protocol Lists.
 * @param list1
 * @param list2
 */
export function getProtocolListsDiff(
  list1: ProtocolList,
  list2: ProtocolList,
): ProtocolListsDiff {
  const list1Metadata = getMetadata(list1);
  const list2Metadata = getMetadata(list2);
  const metadataChanges = flattenChangeset(
    jsonDiff.diff(list1Metadata, list2Metadata),
  );

  const protocolChanges: ProtocolChange[] = [];
  const list1ProtocolNamesMap = getProtocolNamesMap(list1.protocols);
  const list2ProtocolNamesMap = getProtocolNamesMap(list2.protocols);
  const allProtocolNames = new Set([
    ...list1ProtocolNamesMap.keys(),
    ...list2ProtocolNamesMap.keys(),
  ]);
  for (const protocolName of Array.from(allProtocolNames)) {
    const list1Protocol = list1ProtocolNamesMap.get(protocolName);
    const list2Protocol = list2ProtocolNamesMap.get(protocolName);
    if (list1Protocol) {
      if (list2Protocol) {
        const changes = flattenChangeset(
          jsonDiff.diff(list1Protocol, list2Protocol),
        );
        if (changes.length) {
          protocolChanges.push({
            type: 'UPDATE',
            protocolName,
            changes,
          });
        }
      } else {
        protocolChanges.push({ type: 'REMOVE', protocolName });
      }
    } else {
      protocolChanges.push({ type: 'ADD', protocolName });
    }
  }

  return {
    metadataChanges,
    protocolChanges,
  };
}
