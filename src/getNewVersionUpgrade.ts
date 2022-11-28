import { VersionUpgrade } from '@uniswap/token-lists';
import { Operation } from 'json-diff-ts';
import { getProtocolListsDiff } from './getProtocolListsDiff';
import { maxVersionUpgrade } from './maxVersionUpgrade';
import { ProtocolList } from './types';

const ignoredMetadataPaths = ['$.timestamp', '$.version'];
const protocolKeysPatch = ['imageURI', 'homepage', 'overrides'];
const protocolPathsPatch = ['$.overrides'];

function isPathIncluded(paths: string[], path: string): boolean {
  return paths.some((comparisonPath) => {
    return path.startsWith(comparisonPath);
  });
}

/**
 * Computes the new version number based off the previous version number and the changes introduced in the new list.
 * This function assumes the given lists pass schema validation and does not otherwise guarantee accurate results.
 * @param listOld
 * @param listNew
 */
export function getNewVersionUpgrade(
  listOld: ProtocolList,
  listNew: ProtocolList,
): VersionUpgrade {
  const { metadataChanges, protocolChanges } = getProtocolListsDiff(
    listOld,
    listNew,
  );
  let versionUpgrade = VersionUpgrade.NONE;

  for (const change of metadataChanges) {
    if (!isPathIncluded(ignoredMetadataPaths, change.path)) {
      versionUpgrade = maxVersionUpgrade(versionUpgrade, VersionUpgrade.PATCH);
    }
  }

  for (const protocolChange of protocolChanges) {
    if (protocolChange.type === 'ADD') {
      versionUpgrade = maxVersionUpgrade(versionUpgrade, VersionUpgrade.MINOR);
    } else if (protocolChange.type === 'REMOVE') {
      versionUpgrade = maxVersionUpgrade(versionUpgrade, VersionUpgrade.MAJOR);
      break;
    } else if (protocolChange.changes) {
      for (const change of protocolChange.changes) {
        if (protocolKeysPatch.includes(change.key)) {
          versionUpgrade = maxVersionUpgrade(
            versionUpgrade,
            VersionUpgrade.PATCH,
          );
        } else if (isPathIncluded(protocolPathsPatch, change.path)) {
          versionUpgrade = maxVersionUpgrade(
            versionUpgrade,
            VersionUpgrade.PATCH,
          );
        } else if (change.path.startsWith('$.chains')) {
          if (change.type === Operation.ADD) {
            versionUpgrade = maxVersionUpgrade(
              versionUpgrade,
              VersionUpgrade.MINOR,
            );
          } else {
            versionUpgrade = maxVersionUpgrade(
              versionUpgrade,
              VersionUpgrade.MAJOR,
            );
            break;
          }
        } else {
          throw new Error(
            `Unhandled protocol change: ${JSON.stringify(change)}`,
          );
        }
      }
    }
  }

  return versionUpgrade;
}
