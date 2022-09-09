import React, { ReactElement, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
import { checkEligibility } from "../../../utils/contractCall";
import { SUPPORTED_CHAIN } from "../../../constants/constants";

const styles = {
  container: {
    width: "90%",
    border: "solid #75e287 1px",
    borderRadius: "20px",
    margin: "20px auto",
    padding: "30px 0",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px"
  }
} as const;

export const CheckEligibility: React.FC<any> = ({
  isEligible,
  setIsEligible,
  hasChecked,
  setHasChecked,
  amount,
  setAmount
}): ReactElement => {
  const { account, provider, chainId } = useWeb3React();

  const signer = provider?.getSigner();
  const isChainOk = chainId === SUPPORTED_CHAIN ? false : true;

  const handleClick = async () => {
    if (account) {
      const res = await checkEligibility(account, signer);
      console.log(res);
      setHasChecked(true);
      if (parseInt(res) > 0) {
        setIsEligible(true);
        setAmount(parseInt(res) / 10 ** 18);
      }
      return;
    }
    return;
  };

  useEffect(() => {
    if (!account) {
      setHasChecked(false);
    }
    return;
  }, [account]);

  return (
    <div style={styles.container}>
      <div>
        <Button type="primary" shape="round" onClick={handleClick} disabled={isChainOk}>
          Check Eligibility
        </Button>
      </div>
      {hasChecked && isEligible ? (
        <div style={{ marginTop: "20px" }}>
          <div>Congratulations, you're eligible to a claim!!!</div>
          <div>
            <b>Amount claimable: {amount}</b>
          </div>
          <br></br>
          <span style={{ fontSize: "15px" }}>Please note: 1 LPR = 10 L3P</span>
        </div>
      ) : (
        hasChecked &&
        !isEligible && <div style={{ marginTop: "20px" }}>Sorry, unfortunatly, you're not eligible to a claim.</div>
      )}
    </div>
  );
};
