import * as jsonDiff from 'json-diff-ts';
import { ProtocolList } from './types';

export interface ProtocolChange {
  type: 'ADD' | 'UPDATE' | 'REMOVE';
  protocolName: string;
  changes?: jsonDiff.IFlatChange[];
}

export interface ProtocolListsDiff {
  metadataChanges: jsonDiff.IFlatChange[];
  protocolChanges: ProtocolChange[];
}

export declare function getProtocolListsDiff(list1: ProtocolList, list2: ProtocolList): ProtocolListsDiff;
