import { ethers } from "ethers";
import whitelist_ABI from "../abi/Whitelist_ABI.json";
import { getWhitelistAddress } from "../constants/constants";

const whitelist = getWhitelistAddress();

/* Get the staking contract's admin address :
 ********************************************/
export const getAdminAddress = async (provider: ethers.providers.Web3Provider | undefined): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, provider);
  try {
    const owner = await whitelistInstance.owner();
    return owner;
  } catch (error) {
    console.log(error);
  }
};

/* Check acocunt eligibility to token claim:
 ********************************************/
export const checkEligibility = async (
  account: string,
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  if (!account) {
    window.alert("Wallet not connected");
    return;
  }

  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);

  try {
    const receipt = await whitelistInstance.isAmountClaimable(account);
    return receipt;
  } catch (error) {
    console.log(error);
  }
};

/* Claim your share of new token:
 **********************************/
export const claimToken = async (
  merkleProof: string[],
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);

  try {
    const tx = await whitelistInstance.claim(merkleProof);
    await tx.wait(2);

    return { success: true, txHash: tx.hash };
  } catch (error: any) {
    return { success: false };
  }
};

/* Set the markle root :
 *************************/
export const setMerkleRoot = async (
  merkleRoot: string,
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  try {
    const tx = await whitelistInstance.setMerkleRoot(merkleRoot);
    const receipt = await tx.wait(2);
    return { success: true, data: receipt };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

/* Set the markle root :
 *************************/
export const setNewOwner = async (
  ownerAdd: string,
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  try {
    const tx = await whitelistInstance.transferOwnership(ownerAdd);
    const receipt = await tx.wait(2);
    return { success: true, data: receipt };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

/* Allow the owner to wihdraw the contract balance after the claiming period:
 ****************************************************************************/
export const withdrawBalance = async (
  to: string,
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  try {
    const tx = await whitelistInstance.withdraw(to);
    const receipt = await tx.wait(2);
    return { success: true, data: receipt };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

/* Allow the owner to add the whitelist to the contract:
 *********************************************************/
export const addUsers = async (
  addresses: string[],
  amounts: string[],
  signer: ethers.Signer | ethers.providers.Provider | undefined
): Promise<any> => {
  const whitelistInstance = new ethers.Contract(whitelist, whitelist_ABI, signer);
  try {
    const tx = await whitelistInstance.addWalletsToWhitelist(addresses, amounts);
    const receipt = await tx.wait(2);
    return { success: true, data: receipt };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
