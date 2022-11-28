import { Version } from '@uniswap/token-lists';
import { ProtocolList } from './types';

/**
 * Computes the new version number based off the previous version number and the changes introduced in the new list.
 * This function assumes the given lists pass schema validation and does not guarantee accurate results if not.
 * @param listOld
 * @param listNew
 */
export declare function getNewVersion(listOld: ProtocolList, listNew: ProtocolList): Version;
