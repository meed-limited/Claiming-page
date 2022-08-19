import { API_URL } from "../constants/constants";

export const isMerkleOK = async (account: string): Promise<any> => {
  const API_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

  if (API_URL) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers:
        API_KEY !== undefined
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`
            }
          : undefined,
      // mode: "cors",
      body: JSON.stringify({ user: account.toString() })
    });
    const body = await response.json();

    if (response.status !== 200) {
      console.log({ success: false, message: body.message });
    }
    return body;
  }
};
