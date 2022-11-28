import { TokenList } from '@uniswap/token-lists';

export type CommonList = Omit<TokenList, 'tokens'>;

export interface ProtocolAddressInfo {
  /**
   * The name of this address or protocol
   */
  name: string;
  /**
   * A URI for an image to associate with this address or protocol. Recommend SVG or PNG of size 256x256
   */
  imageURI?: string;
  /**
   * A URI for a website to associate with this address or protocol
   */
  homepage?: string;
}

export interface ProtocolChainInfo {
  /**
   * An array of addresses that are controlled by the protocol and used to create auctions on this chain
   */
  auctionCreators?: string[];
  /**
   * An array of addresses that are controlled by the protocol and used to create bonds on this chain
   */
  bondCreators?: string[];
}

export interface ProtocolInfo extends ProtocolAddressInfo {
  /**
   * A map of the chain ID to the protocol data related to that chain
   */
  chains: Partial<Record<number, ProtocolChainInfo>>;
  /**
   * A map of an address specified in ProtocolChainInfo to properties that override the base protocol metadata
   */
  overrides?: Record<string, Partial<ProtocolAddressInfo>>;
}

export interface ProtocolList extends CommonList {
  /**
   * The protocols included in the list
   */
  protocols: ProtocolInfo[];
}
