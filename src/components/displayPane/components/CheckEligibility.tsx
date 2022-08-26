import React, { ReactElement, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button } from "antd";
import { checkEligibility } from "../../../utils/contractCall";

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

export const CheckEligibility: React.FC<any> = ({ isEligible, setIsEligible, amount, setAmount }): ReactElement => {
  const { account, provider } = useWeb3React();
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const signer = provider?.getSigner();

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
        <Button type="primary" shape="round" onClick={handleClick}>
          Check Eligibility
        </Button>
      </div>
      {hasChecked && isEligible ? (
        <div style={{ marginTop: "20px" }}>
          <div>Congratulations, you're eligible to a claim!!!</div>
          <div>Amount claimable: {amount}</div>
        </div>
      ) : (
        hasChecked &&
        !isEligible && <div style={{ marginTop: "20px" }}>Sorry, unfortunatly, you're not eligible to a claim.</div>
      )}
    </div>
  );
};
