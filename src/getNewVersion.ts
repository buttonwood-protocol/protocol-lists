import { nextVersion, Version } from '@uniswap/token-lists';
import { getNewVersionUpgrade } from './getNewVersionUpgrade';
import { ProtocolList } from './types';

/**
 * Computes the new version number based off the previous version number and the changes introduced in the new list.
 * This function assumes the given lists pass schema validation and does not otherwise guarantee accurate results.
 * @param listOld
 * @param listNew
 */
export function getNewVersion(
  listOld: ProtocolList,
  listNew: ProtocolList,
): Version {
  const versionUpgrade = getNewVersionUpgrade(listOld, listNew);
  return nextVersion(listOld.version, versionUpgrade);
}
