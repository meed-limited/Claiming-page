import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { whitelistAddresses } from "../storage/whitelist";

let leafNodes: Buffer[];
let merkleTree: MerkleTree;

// Creates the merkle tree and generate the root Hash (to be added to the smart-contract)
export const createMerkleTree = () => {
  leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
  merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  console.log("Whitelist Merkle tree\n", merkleTree.toString());

  const rootHash = merkleTree.getRoot();
  console.log("Root hash:\n", rootHash);
};

export const getRootHash = () => {
  return merkleTree.getRoot();
};

// Return the proof derived from the wallet address (to be checked by the smart-contract)
export const getProof = (account: string): any => {
  const index = whitelistAddresses.findIndex((item) => item === account);
  const result = merkleTree.getHexProof(leafNodes[index]);
  console.log("result", result);
  return result;
};
