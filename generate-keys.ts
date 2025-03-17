import { HD, Mnemonic } from '@bsv/sdk';
import { randomBytes } from 'crypto';
/**
 * Key basic information.
 */
export interface Key {
  xPriv(): string;
  xPub: PubKey;
}
export interface PubKey {
  toString(): string;
}

/**
 * Extends Key interface with mnemonic information.
 */
export interface KeyWithMnemonic extends Key {
  mnemonic: string;
}

export const generateKeys = function (): KeyWithMnemonic {
  const entropy = randomBytes(32); // 32 bytes = 256 bits of entropy
  const mnemonic = Mnemonic.fromEntropy(Array.from(entropy));
  return getKeysFromMnemonic(mnemonic.toString());
};

export const getKeysFromMnemonic = function (mnemonicStr: string): KeyWithMnemonic {
  const mnemonic = Mnemonic.fromString(mnemonicStr);
  const seed = mnemonic.toSeed();
  const hdWallet = new HD().fromSeed(seed);

  return {
    xPriv: () => hdWallet.toString(),
    mnemonic: mnemonic.toString(),
    xPub: {
      toString() {
        return hdWallet.toPublic().toString();
      },
    },
  };
};

const { xPriv, mnemonic, xPub } = generateKeys()

console.log('Private key:', xPriv().toString())
console.log('Public key:', xPub.toString())
