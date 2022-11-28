import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { expect } from 'chai';
import { schema } from '../src/index';
import baseProtocolList from './examples/base.protocol-list.json';
import upgradeMajorProtocolList from './examples/upgrade-major.protocol-list.json';
import upgradeMinorProtocolList from './examples/upgrade-minor.protocol-list.json';
import upgradeMinor2ProtocolList from './examples/upgrade-minor2.protocol-list.json';
import upgradeNoneProtocolList from './examples/upgrade-none.protocol-list.json';
import upgradePatchProtocolList from './examples/upgrade-patch.protocol-list.json';

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);
const validator = ajv.compile(schema);

describe('schema', () => {
  it('base validates against schema', async () => {
    const validates = validator(baseProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });

  it('upgrade-none validates against schema', async () => {
    const validates = validator(upgradeNoneProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });

  it('upgrade-patch validates against schema', async () => {
    const validates = validator(upgradePatchProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });

  it('upgrade-minor validates against schema', async () => {
    const validates = validator(upgradeMinorProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });

  it('upgrade-minor2 validates against schema', async () => {
    const validates = validator(upgradeMinor2ProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });

  it('upgrade-major validates against schema', async () => {
    const validates = validator(upgradeMajorProtocolList);
    if (!validates) {
      console.error(validator.errors);
    }
    expect(validates).to.equal(true);
  });
});
