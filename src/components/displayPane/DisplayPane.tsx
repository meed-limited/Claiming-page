import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { CheckEligibility } from "./components/CheckEligibility";
import { ClaimToken } from "./components/ClaimToken";

import { Status } from "./components/Status";

const styles = {
  container: {
    background: "white",
    width: "70%",
    border: "solid #75e287 1px",
    borderRadius: "20px",
    margin: "auto",
    textAlign: "center",
    padding: "30px 0",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px"
  },
  title: {
    color: "black",
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "17px"
  }
} as const;

const DisplayPane: React.FC = () => {
  const { isActivating, error, isActive } = useWeb3React();
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  return (
    <div style={styles.container}>
      <div style={styles.title}>Claiming Page</div>
      <div style={styles.content}>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <CheckEligibility isEligible={isEligible} setIsEligible={setIsEligible} amount={amount} setAmount={setAmount} />
        {isEligible && <ClaimToken amount={amount} />}
      </div>
    </div>
  );
};

export default DisplayPane;
