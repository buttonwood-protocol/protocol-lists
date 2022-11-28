# protocol-lists

This package includes a JSON schema for protocol lists, and TypeScript utilities for working with protocol lists.

The JSON schema represents the technical specification for a protocol list which can be used in a dApp interface, such as the Buttonwood dApp suite.

## What are protocol lists?

This concept was inspired by Uniswap's [Token List](https://github.com/Uniswap/token-lists).

Within the Buttonwood ecosystem there are applications that are permissionless - anyone can create the entities that are listed on them.
Take for example Buttonwood Auctions, where any user can create an auction between any pair of ERC-20 tokens.
It would be possible for an attacker to create an auction with malicious tokens designed to steal money, and so users need to be able to identify this.

The way we tackle this problem is with the Protocol List: a bundle of data that describes which addresses are controlled by third parties (protocols).
Armed with this data, we can check whether an auction (or other entity) was created by a known party and display it as such in the application.
This lessens the burden on the end user, as they now only need to decide whether they trust a third party.

Anyone can create and maintain a protocol list, as long as they follow the specification.
Protocol list JSON must validate against the [JSON schema](https://json-schema.org/) in order to be usable.

## JSON Schema $id

The JSON schema ID is [https://buttonwood-protocol.github.io/protocol-lists/src/protocol-list.schema.json](https://buttonwood-protocol.github.io/protocol-lists/src/protocol-list.schema.json)

## Validating protocol lists

This package does not include code for protocol list validation.
You can easily do this by including a library such as [ajv](https://ajv.js.org/) to perform the validation against the JSON schema.
The schema is exported from the package for ease of use.

```typescript
import { schema } from 'protocol-lists';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fetch from 'node-fetch';

const BUTTONWOOD_LIST =
  'https://buttonwood-protocol.github.io/buttonwood-protocol-list/buttonwood-protocol-list.json';

async function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const validator = ajv.compile(schema);
  const response = await fetch(BUTTONWOOD_LIST);
  const data = await response.json();
  const valid = validator(data);
  if (valid) {
    return valid;
  }
  if (validator.errors) {
    throw validator.errors.map((error) => {
      delete error.data;
      return error;
    });
  }
}

validate().then(console.log('Valid List.')).catch(console.error);
```

## Authoring protocol lists

### Manual

The best way to manually author protocol lists is to use an editor that supports JSON schema validation.
In order for your protocol list to be able to be used, it must pass all JSON schema validation.

### Automated

If you want to automate protocol listing, e.g. by pulling from a smart contract, or other sources, you can use this package to take advantage of the JSON schema for validation and the TypeScript types.
Otherwise, you are simply working with JSON. All the usual tools apply, e.g.:

```typescript
import { ProtocolList, schema } from 'protocol-lists';

// generate your protocol list however you like.
const myList: ProtocolList = generateMyProtocolList();

// use a tool like `ajv` to validate your generated protocol list
validateMyProtocolList(myList, schema);

// print the resulting JSON to stdout
process.stdout.write(JSON.stringify(myList));
```

An example of how this might be fully set up can be found [here](https://github.com/buttonwood-protocol/buttonwood-protocol-list).

## Semantic versioning

Lists include a `version` field, which follows [semantic versioning](https://semver.org/).

List versions must follow the rules:

- Increment major version when
  - protocols are removed
  - protocols are renamed (this is considered a remove and an add)
  - addresses associated with a protocol are removed
- Increment minor version when
  - protocols are added
  - addresses associated with a protocol are added
- Increment patch version when
  - protocol metadata changes at all (eg. imageURI, homepage)
  - protocol address metadata overrides change at all
  - list metadata changes at all (name, logoURI, keywords, tags)

Changing an address or chain ID is considered both a remove and an add, and should be a major version update.
The `getNewVersionUpgrade` function exported by this package will automatically determine the type of version change.
The `getNewVersion` function exported by this package will apply that to the version of the old list given to it.

## Deploying your list

Once you have authored the list, you can make it available at any URI. Prefer pinning your list to IPFS
(e.g. via [pinata.cloud](https://pinata.cloud)) and referencing the list by an ENS name that resolves to the
[contenthash](https://eips.ethereum.org/EIPS/eip-1577).

If hosted on HTTPS, make sure the endpoint is configured to send an access-control-allow-origin header to avoid CORS errors.

### Linking an ENS name to the list

An ENS name can be assigned to an IPFS hash via the [contenthash](https://eips.ethereum.org/EIPS/eip-1577) text record.
This is the preferred way of referencing your list.

## Examples

You can find a simple example of a protocol list in [test/examples/base.protocol-list.json](test/examples/base.protocol-list.json).
