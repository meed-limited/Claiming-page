import { ethers } from "ethers";
// import { parseBigNumberToFloat } from "../../../utils/formatters";
// import token_ABI from "../abi/Token_ABI.json";
import whitelist_ABI from "../abi/Whitelist_ABI.json";
import { getWhitelistAddress } from "../constants/constants";

// Contracts addresses:
// const token = getTokenAddress();
const whitelist = getWhitelistAddress();

// const staking_ABI_json = require('./storage/chain/abis/staking_abi.json');

// Instances:
// const tokenInstance = new ethers.Contract(token, token_ABI, provider);

export const checkEligibility = async (account: string, signer: any): Promise<any> => {
  if (!account) {
    window.alert("Wallet not connected");
    return;
  }

  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);

  try {
    const receipt = await whitelistInstance.isAmountClaimable(account);
    return receipt;
  } catch (error: any) {
    console.log(error);
  }
};

export const claimToken = async (merkleProof: string[], signer: any): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  console.log(merkleProof);

  try {
    // const tx = await whitelistInstance.claim(merkleProof);
    // const receipt = await tx.await(2);
    // console.log(receipt);
    const receipt = await whitelistInstance.claim(merkleProof);
    console.log(receipt);
    return receipt;
  } catch (error: any) {
    console.log(error);
  }
};
