import { Button } from "antd";
import { isProdEnv } from "../../constants/constants";

const styles = {
  wrongChainBar: {
    zIndex: 2,
    width: "100%",
    padding: "8px 0px",
    background: "rgb(255, 127, 105) none repeat scroll 0% 0%"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  text: {
    paddingInline: "15px",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "16px",
    lineHeight: "16px",
    textAlign: "center"
  },
  button: {
    height: "35px",
    marginRight: "10px",
    textAlign: "center",
    fontWeight: "400",
    fontSize: "14px",
    border: "none",
    background: "black",
    color: "white"
  }
} as const;

const ChainVerification = () => {
  const handleSwitch = async () => {
    try {
      await (window as any).window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: isProdEnv ? [{ chainId: "0x38" }] : [{ chainId: "0x61" }]
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={styles.wrongChainBar}>
      <div style={styles.container}>
        <span style={styles.text}>Wrong network. Please switch to {isProdEnv ? "BSC Mainnet" : "BSC Testnet"}.</span>
        <Button style={styles.button} onClick={() => handleSwitch()}>
          Switch Network
        </Button>
      </div>
    </div>
  );
};

export default ChainVerification;
