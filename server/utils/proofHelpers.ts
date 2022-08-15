import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { whitelistAddresses } from "../storage/whitelist";

let leafNodes: Buffer[];
let merkleTree: MerkleTree;

const buf2hex = (x: Buffer) => "0x" + x.toString("hex");

// Creates the merkle tree and generate the root Hash (to be added to the smart-contract)
export const createMerkleTree = () => {
  leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
  merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  console.log("Whitelist Merkle tree\n", merkleTree.toString());

  const rootHash = buf2hex(merkleTree.getRoot());
  console.log("Root hash:\n", rootHash);
};

export const getRootHash = () => {
  const root = buf2hex(merkleTree.getRoot()); // THIS MUST BE SET IN SMART-CONTRACT
  return root;
};

// Return the proof derived from the wallet address (to be checked by the smart-contract)
export const getProof = (account: string): any => {
  // const index = whitelistAddresses.findIndex((item) => item === account);
  // const proof = merkleTree.getHexProof(leafNodes[index]);
  const hashedAddress = keccak256(account);
  const proof = merkleTree.getHexProof(hashedAddress);
  return proof;
};
