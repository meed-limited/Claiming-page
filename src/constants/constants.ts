const isProdEnv = process.env.NODE_ENV === "production" ? true : false;

export const MERKLE_ROOT = "0x5d562679df5117898677aada33ece1e11156c211b7ec7b36b0dc608800bd022e"; // To Edit

// Production
export const TOKEN = "";
export const WHITELIST_CONTRACT = ""; // BSC

// Development
export const TOKEN_TEST = "0xE413Bfbc963fdB56Fe12A2501aa58cD4913553ef";
export const WHITELIST_CONTRACT_TEST = "0x504d9046B85a543FF7d29B39d6906E4354b2B700"; // BSC test

// Nodes:
export const BSC_PROVIDER = process.env.REACT_APP_NODE_BSC;
export const BSC_TEST_PROVIDER = process.env.REACT_APP_NODE_BSC_TEST;

// API endpoint
// export const API_URL = isProdEnv ? process.env.REACT_APP_API_ENDPOINT : process.env.REACT_APP_API_ENDPOINT_TEST;
export const API_URL = process.env.REACT_APP_API_ENDPOINT;

export const getTokenAddress = () => {
  if (isProdEnv) {
    return TOKEN;
  } else return TOKEN_TEST;
};

export const getWhitelistAddress = () => {
  if (isProdEnv) {
    return WHITELIST_CONTRACT;
  } else return WHITELIST_CONTRACT_TEST;
};

export const getProvider = () => {
  if (isProdEnv) {
    return BSC_PROVIDER;
  } else return BSC_TEST_PROVIDER;
};
