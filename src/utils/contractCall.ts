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

export const checkEligibility = async (
  account: string,
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  if (!account) {
    window.alert("Wallet not connected");
    return;
  }

  console.log("account", account);
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  console.log("whitelistInstance", whitelistInstance);

  try {
    const receipt = await whitelistInstance.isAmountClaimable(account);
    console.log("receipt", receipt);
    return receipt;
  } catch (error) {
    console.log(error);
  }
};

export const claimToken = async (
  merkleProof: string[],
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  console.log(merkleProof);

  try {
    console.log("whitelistInstance", whitelistInstance);
    const tx = await whitelistInstance.claim(merkleProof);
    const receipt = await tx.wait(2);
    return receipt;
  } catch (error: any) {
    console.log(error);
  }
};
