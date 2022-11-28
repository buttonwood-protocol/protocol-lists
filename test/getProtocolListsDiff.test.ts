import { expect } from 'chai';
import { Operation } from 'json-diff-ts';
import { getProtocolListsDiff, ProtocolListsDiff } from '../src';
import baseProtocolList from './examples/base.protocol-list.json';
import metadataChangesProtocolList from './examples/metadata-changes.protocol-list.json';
import metadataIgnoredChangesProtocolList from './examples/metadata-ignored-changes.protocol-list.json';
import upgradeMajorProtocolList from './examples/upgrade-major.protocol-list.json';
import upgradeMajor2ProtocolList from './examples/upgrade-major2.protocol-list.json';
import upgradeMinorProtocolList from './examples/upgrade-minor.protocol-list.json';
import upgradeMinor2ProtocolList from './examples/upgrade-minor2.protocol-list.json';
import upgradeNoneProtocolList from './examples/upgrade-none.protocol-list.json';
import upgradePatchProtocolList from './examples/upgrade-patch.protocol-list.json';

describe('getProtocolListsDiff', () => {
  it('upgrade-none', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradeNoneProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('metadata-changes', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      metadataChangesProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [
        {
          key: 'name',
          oldValue: 'Buttonwood',
          path: '$.name',
          type: Operation.UPDATE,
          value: 'Buttonwood 2',
          valueType: 'String',
        },
        {
          key: 'logoURI',
          oldValue:
            'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/buttonwood.svg',
          path: '$.logoURI',
          type: Operation.UPDATE,
          value:
            'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/buttonwood2.svg',
          valueType: 'String',
        },
        {
          key: '0',
          oldValue: 'buttonwood',
          path: '$.keywords[0]',
          type: Operation.UPDATE,
          value: 'buttonwood2',
          valueType: 'String',
        },
      ],
      protocolChanges: [],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('metadata-ignored-changes', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      metadataIgnoredChangesProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [
        {
          key: 'timestamp',
          oldValue: '2022-11-20T02:41:06.022Z',
          path: '$.timestamp',
          type: Operation.UPDATE,
          value: '2022-12-20T02:41:06.022Z',
          valueType: 'String',
        },
        {
          key: 'major',
          oldValue: 0,
          path: '$.version.major',
          type: Operation.UPDATE,
          value: 1,
          valueType: 'Number',
        },
      ],
      protocolChanges: [],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('upgrade-patch', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradePatchProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [
        {
          changes: [
            {
              key: 'imageURI',
              oldValue:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/mascot.png',
              path: '$.imageURI',
              type: Operation.UPDATE,
              value:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/logo.png',
              valueType: 'String',
            },
            {
              key: 'overrides',
              path: '$',
              type: Operation.ADD,
              value: {
                '0xd7e86Bd77784217324b4E94AEDc68E5C8227EC2B': {
                  name: 'PRL: Deployer',
                },
              },
              valueType: 'Object',
            },
          ],
          protocolName: 'PRL',
          type: 'UPDATE',
        },
      ],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('upgrade-minor', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradeMinorProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [
        {
          changes: [
            {
              key: 'imageURI',
              oldValue:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/mascot.png',
              path: '$.imageURI',
              type: Operation.UPDATE,
              value:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/logo.png',
              valueType: 'String',
            },
            {
              key: '1',
              path: '$.chains.1.auctionCreators[1]',
              type: Operation.ADD,
              value: '0x4b4E94AEDc68E5C8227EC2Bd7e86Bd7778421732',
              valueType: 'String',
            },
            {
              key: 'bondCreators',
              path: '$.chains.5.bondCreators',
              type: Operation.ADD,
              value: [
                '0xfD99d2d103b09F95c3dFc458F57178bF0CD587B1',
                '0xEDBcCA5DfD692bab7656Ab2D4F499B43fA26480B',
                '0xb1Cc73B1610863D51B5b8269b9162237e87679c3',
              ],
              valueType: 'Array',
            },
            {
              key: 'overrides',
              path: '$',
              type: Operation.ADD,
              value: {
                '0xd7e86Bd77784217324b4E94AEDc68E5C8227EC2B': {
                  name: 'PRL: Deployer',
                },
              },
              valueType: 'Object',
            },
          ],
          protocolName: 'PRL',
          type: 'UPDATE',
        },
      ],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('upgrade-minor2', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradeMinor2ProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [
        {
          protocolName: 'A test',
          type: Operation.ADD,
        },
      ],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('upgrade-major', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradeMajorProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [
        {
          changes: [
            {
              key: 'imageURI',
              oldValue:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/mascot.png',
              path: '$.imageURI',
              type: Operation.UPDATE,
              value:
                'https://buttonwood-protocol.github.io/buttonwood-protocol-list/assets/protocols/prl/logo.png',
              valueType: 'String',
            },
            {
              key: '1',
              path: '$.chains.1.auctionCreators[1]',
              type: Operation.ADD,
              value: '0x4b4E94AEDc68E5C8227EC2Bd7e86Bd7778421732',
              valueType: 'String',
            },
            {
              key: 'bondCreators',
              path: '$.chains.1.bondCreators',
              type: Operation.REMOVE,
              value: ['0xd7e86Bd77784217324b4E94AEDc68E5C8227EC2B'],
              valueType: 'Array',
            },
            {
              key: '1',
              oldValue: '0xEDBcCA5DfD692bab7656Ab2D4F499B43fA26480B',
              path: '$.chains.5.auctionCreators[1]',
              type: Operation.UPDATE,
              value: '0xb1Cc73B1610863D51B5b8269b9162237e87679c3',
              valueType: 'String',
            },
            {
              key: '2',
              path: '$.chains.5.auctionCreators[2]',
              type: Operation.REMOVE,
              value: '0xb1Cc73B1610863D51B5b8269b9162237e87679c3',
              valueType: 'String',
            },
            {
              key: 'bondCreators',
              path: '$.chains.5.bondCreators',
              type: Operation.ADD,
              value: [
                '0xfD99d2d103b09F95c3dFc458F57178bF0CD587B1',
                '0xEDBcCA5DfD692bab7656Ab2D4F499B43fA26480B',
                '0xb1Cc73B1610863D51B5b8269b9162237e87679c3',
              ],
              valueType: 'Array',
            },
            {
              key: 'overrides',
              path: '$',
              type: Operation.ADD,
              value: {
                '0xd7e86Bd77784217324b4E94AEDc68E5C8227EC2B': {
                  name: 'PRL: Deployer',
                },
              },
              valueType: 'Object',
            },
          ],
          protocolName: 'PRL',
          type: 'UPDATE',
        },
      ],
    };
    expect(diff).to.deep.equal(diffExpected);
  });

  it('upgrade-major2', async () => {
    const diff = getProtocolListsDiff(
      baseProtocolList,
      upgradeMajor2ProtocolList,
    );
    const diffExpected: ProtocolListsDiff = {
      metadataChanges: [],
      protocolChanges: [
        {
          protocolName: 'PRL',
          type: 'REMOVE',
        },
        {
          protocolName: 'PRL2',
          type: 'ADD',
        },
      ],
    };
    expect(diff).to.deep.equal(diffExpected);
  });
});
