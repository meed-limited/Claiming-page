export const isProdEnv = process.env.REACT_APP_ENVIRONMENT === "production" ? true : false;
export const SUPPORTED_CHAIN: number = isProdEnv ? 56 : 97;
export const MAX_INT = 2 ** 256 - 1;

export const MERKLE_ROOT = "0x84731969185cca300aeec0f4ae6e221a35a2dafcbdecc11b399ecf8671f64f1e"; // To Edit

// Production
export const TOKEN = "0x91191A15E778d46255FC9AcD37D028228D97e786";
export const WHITELIST_CONTRACT = "0xd7bF716e122682504f316b0f71825Dc1Fe203851"; // BSC

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
