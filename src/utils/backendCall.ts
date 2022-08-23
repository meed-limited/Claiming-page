import { API_URL } from "../constants/constants";

const API_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

export const getMerkle = async (): Promise<any> => {
  if (API_URL) {
    const response = await fetch(`${API_URL}/getMerkleRoot`, {
      method: "GET",
      headers:
        API_KEY !== undefined
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`
            }
          : undefined
    });
    const body = await response.json();

    if (response.status !== 200) {
      console.log({ success: false, message: body.message });
    }
    return body;
  }
};

export const checkMerkleProof = async (account: string): Promise<any> => {
  if (API_URL) {
    const response = await fetch(`${API_URL}/getHexProof`, {
      method: "POST",
      headers:
        API_KEY !== undefined
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`
            }
          : undefined,
      body: JSON.stringify({ user: account.toString() })
    });
    const body = await response.json();

    if (response.status !== 200) {
      console.log({ success: false, message: body.message });
    }
    return body;
  }
};
