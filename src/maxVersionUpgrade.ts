import { VersionUpgrade } from '@uniswap/token-lists';

/**
 * Returns the higher of two version upgrade types
 * @param version1
 * @param version2
 */
export function maxVersionUpgrade(
  version1: VersionUpgrade,
  version2: VersionUpgrade,
): VersionUpgrade {
  if (version1 === VersionUpgrade.MAJOR || version2 === VersionUpgrade.MAJOR) {
    return VersionUpgrade.MAJOR;
  }
  if (version1 === VersionUpgrade.MINOR || version2 === VersionUpgrade.MINOR) {
    return VersionUpgrade.MINOR;
  }
  if (version1 === VersionUpgrade.PATCH || version2 === VersionUpgrade.PATCH) {
    return VersionUpgrade.PATCH;
  }
  return VersionUpgrade.NONE;
}
