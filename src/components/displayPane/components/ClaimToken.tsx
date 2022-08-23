import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { claimToken } from "../../../utils/contractCall";
import { checkMerkleProof } from "../../../utils/backendCall";
import { Button, Modal } from "antd";
import { getExplorer } from "../../../constants/networks";
import { FileSearchOutlined } from "@ant-design/icons";

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

export const ClaimToken: React.FC<any> = ({ amount, setLoading }) => {
  const { account, provider, chainId } = useWeb3React();
  const signer = provider?.getSigner();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [explorerLink, setExplorerLink] = useState("");

  const handleClick = async () => {
    setLoading(true);
    if (account) {
      // Backend call: Compare proof with merkel tree
      const response = await checkMerkleProof(account);

      // Contract call: claim tokens if claimable amount + whitelisted
      const receipt = await claimToken(response.data, signer);
      console.log(receipt);

      if (receipt.success) {
        const link = `${getExplorer(chainId!)}tx/${receipt.txHash}`;
        setExplorerLink(link);
        setIsModalVisible(true);
      }
    }
    setLoading(false);
    return;
  };

  const handleOK = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  return (
    <>
      <div style={styles.container}>
        <Button type="primary" shape="round" onClick={handleClick}>
          Claim your new token!
        </Button>
      </div>

      <Modal
        visible={isModalVisible}
        closable={false}
        footer={null}
        bodyStyle={{
          width: "350px",
          margin: "auto",
          textAlign: "center",
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500"
        }}
        width="35vw"
      >
        <div className="modal-success">
          <span style={{ fontSize: "30px" }}>🎉 Claim Success ! 🎉</span>
          <p style={{ marginBlock: "20px 40px" }}>
            Congratulations! You've successfully claimed {amount} new LPR tokens! <br></br>They have been sent to your
            wallet. <br></br> <br></br>
            <a href={explorerLink} target="_blank" rel="noreferrer noopener">
              View in explorer: &nbsp;
              <FileSearchOutlined style={{ transform: "scale(1.3)", color: "purple" }} />
            </a>
          </p>
          <Button type="primary" style={{ paddingInline: "30px" }} shape="round" onClick={handleOK}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};
