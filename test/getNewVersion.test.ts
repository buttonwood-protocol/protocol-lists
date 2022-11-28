import { expect } from 'chai';
import { getNewVersion } from '../src';
import baseProtocolList from './examples/base.protocol-list.json';
import metadataChangesProtocolList from './examples/metadata-changes.protocol-list.json';
import metadataIgnoredChangesProtocolList from './examples/metadata-ignored-changes.protocol-list.json';
import upgradeMajorProtocolList from './examples/upgrade-major.protocol-list.json';
import upgradeMajor2ProtocolList from './examples/upgrade-major2.protocol-list.json';
import upgradeMinorProtocolList from './examples/upgrade-minor.protocol-list.json';
import upgradeMinor2ProtocolList from './examples/upgrade-minor2.protocol-list.json';
import upgradeNoneProtocolList from './examples/upgrade-none.protocol-list.json';
import upgradePatchProtocolList from './examples/upgrade-patch.protocol-list.json';

describe('getNewVersion', () => {
  it('upgrade-none', async () => {
    const newVersion = getNewVersion(baseProtocolList, upgradeNoneProtocolList);
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 0,
      patch: 1,
    });
  });

  it('metadata-changes', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      metadataChangesProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 0,
      patch: 2,
    });
  });

  it('metadata-ignored-changes', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      metadataIgnoredChangesProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 0,
      patch: 1,
    });
  });

  it('upgrade-patch', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      upgradePatchProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 0,
      patch: 2,
    });
  });

  it('upgrade-minor', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      upgradeMinorProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 1,
      patch: 0,
    });
  });

  it('upgrade-minor2', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      upgradeMinor2ProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 0,
      minor: 1,
      patch: 0,
    });
  });

  it('upgrade-major', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      upgradeMajorProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 1,
      minor: 0,
      patch: 0,
    });
  });

  it('upgrade-major2', async () => {
    const newVersion = getNewVersion(
      baseProtocolList,
      upgradeMajor2ProtocolList,
    );
    expect(newVersion).to.deep.equal({
      major: 1,
      minor: 0,
      patch: 0,
    });
  });
});
