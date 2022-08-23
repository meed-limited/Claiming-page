import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import AddressInput from "../AddressInput";
import { openNotification } from "../../utils/notifications";
import { Button, Divider, Input } from "antd";
import { addUsers, setMerkleRoot, setNewOwner, withdrawBalance } from "../../utils/contractCall";
import CsvUploader from "./CsvUploader";
import { getMerkle } from "../../utils/backendCall";

const styles = {
  container: {
    background: "white",
    width: "60%",
    textAlign: "center",
    margin: "auto",
    padding: "30px 0",
    border: "solid #75e287 1px",
    borderRadius: "20px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px"
  },
  title: {
    fontWeight: 600,
    fontSize: "30px",
    marginBottom: "10px"
  },
  text: {
    color: "black",
    fontSize: "20px",
    marginTop: "10px"
  },
  setterButton: {
    backgroundColor: "#1736cf",
    marginBottom: "20px"
  },
  backButton: {
    height: "30px",
    textAlign: "center",
    fontWeight: "400",
    fontSize: "13px",
    border: "none",
    background: "black",
    color: "white"
  }
} as const;

interface Props {
  setOwnerAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsOwnerPaneOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPane = ({ setOwnerAddress, setIsOwnerPaneOpen }: Props) => {
  const { provider } = useWeb3React();
  const [newRoot, setNewRoot] = useState<string>();
  const [newOwnerAdd, setNewOwnerAdd] = useState<string>();
  const [withdrawAdd, setWithdrawAdd] = useState<string>();
  const [addresses, setAddresses] = useState<any>();
  const [amounts, setAmounts] = useState<any>();

  const signer = provider?.getSigner();

  const handleBackClic = () => {
    setIsOwnerPaneOpen(false);
  };

  /* Get the whitelist Merkle root:
   *********************************/
  const getRoot = async () => {
    try {
      const res = await getMerkle();
      if (res.success) {
        setNewRoot(res.data);
      }
    } catch (error) {
      const title = "Unexpected error";
      const msg = "Oops, something went wrong while getting the Merkle Root. Please try again.";
      openNotification("error", title, msg);
      console.log(error);
    }
  };

  /* Add or Edit the Merkle root:
   ********************************/
  const editMerkleRoot = async () => {
    if (newRoot) {
      try {
        const res = await setMerkleRoot(newRoot, signer);
        if (res.success) {
          const title = "All set!";
          const msg = "New Merkle Root set successfully.";
          openNotification("success", title, msg);
        }
      } catch (error) {
        const title = "Unexpected error";
        const msg = "Oops, something went wrong while changing the Merkle Root. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
    }
  };

  /* Withdraw the remaining balance if claiming period is over:
   *************************************************************/
  const wihdrawContractBalance = async () => {
    if (withdrawAdd) {
      try {
        const res = await withdrawBalance(withdrawAdd, signer);
        if (res.success) {
          const title = "All set!";
          const msg = "Balance withdrawn successfully.";
          openNotification("success", title, msg);
        }
      } catch (error) {
        const title = "Unexpected error";
        const msg = "Oops, something went wrong while withdrawing. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
    }
  };

  /* Transfer the ownership of the whitelist contract:
   ******************************************************/
  const setWhitelistOwner = async () => {
    if (newOwnerAdd) {
      try {
        const res = await setNewOwner(newOwnerAdd, signer);
        if (res.success) {
          const title = "All set!";
          const msg = "New contract owner set successfully.";
          openNotification("success", title, msg);
          setNewOwnerAdd(undefined);
          setOwnerAddress(undefined);
          setIsOwnerPaneOpen(false);
        }
      } catch (error) {
        const title = "Unexpected error";
        const msg = "Oops, something went wrong while changing the owner address. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
    }
  };

  /* Add users to the whitelist:
   *******************************/
  const addUserToWhitelist = async () => {
    if (addresses && amounts) {
      try {
        const res = await addUsers(addresses, amounts, signer);
        if (res.success) {
          const title = "All set!";
          const msg = "Users added to whitelist successfully.";
          openNotification("success", title, msg);
        }
      } catch (error) {
        const title = "Unexpected error";
        const msg = "Oops, something went wrong while adding users. Please try again.";
        openNotification("error", title, msg);
        console.log(error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Admin Panel</div>
      <Divider />
      <p style={{ fontSize: "17px", fontWeight: "600" }}>Add users and their respective claimable amounts</p>
      <div style={{ width: "70%", margin: "auto" }}>
        <CsvUploader setAddresses={setAddresses} setAmounts={setAmounts} />
        <Button type="primary" onClick={addUserToWhitelist} style={{ ...styles.setterButton, marginTop: "5px" }}>
          Add to whitelist
        </Button>

        <Divider />
        <p style={{ fontSize: "17px", fontWeight: "600" }}>Set Merkle Root / Transfer Ownership / Withdraw Balance</p>

        <Input
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new Merkle Root"
          value={newRoot}
          onChange={(e) => setNewRoot(e.target.value)}
        />
        <Button style={{ ...styles.setterButton, marginRight: "10px" }} type="primary" onClick={getRoot}>
          Get Merkle Root
        </Button>
        <Button style={{ ...styles.setterButton, marginLeft: "10px" }} type="primary" onClick={editMerkleRoot}>
          Set Merkle Root
        </Button>

        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the new owner address (smart-contract owner)"
          onChange={setNewOwnerAdd}
        />
        <Button type="primary" onClick={setWhitelistOwner} style={styles.setterButton}>
          Transfer Ownership
        </Button>

        <AddressInput
          style={{ marginBottom: "5px" }}
          placeholder="Enter the address that will receive the funds..."
          onChange={setWithdrawAdd}
        />
        <Button type="primary" onClick={wihdrawContractBalance} style={styles.setterButton}>
          Withdraw Balance
        </Button>
      </div>

      <div>
        <Button style={styles.backButton} shape="round" onClick={handleBackClic}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default AdminPane;
