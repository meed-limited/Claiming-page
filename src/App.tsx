import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Buffer } from "buffer";
import ConnectAccount from "./components/Account/ConnectAccount";
import DisplayPane from "./components/displayPane/DisplayPane";
import ChainSelector from "./components/ChainSelector";
import AdminPane from "./components/admin/AdminPane";
import { getAdminAddress } from "./utils/contractCall";
import background from "./assets/images/background.png";
import LepriconLogo_Black from "./assets/images/LepriconLogo_Black.png";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer } = Layout;

const styles = {
  layout: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    fontFamily: "Sora, sans-serif"
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 20px",
    paddingTop: "15px"
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    paddingRight: "10px",
    fontSize: "15px",
    fontWeight: "600"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#041836",
    marginBlock: "100px 70px",
    padding: "10px",
    overflow: "auto"
  },
  footer: {
    position: "fixed",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    fontWeight: "800",
    backgroundColor: "transparent"
  },
  adminButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
    borderRadius: "25px",
    width: "100px",
    height: "40px"
  }
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;
  const { account, provider, chainId, isActive } = useWeb3React();
  const [isOwnerPaneOpen, setIsOwnerPaneOpen] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [, setOwnerAddress] = useState<string>();
  // const [ownerAddress, setOwnerAddress] = useState<string>();

  const openAdminPane = () => {
    if (!isOwnerPaneOpen) {
      setIsOwnerPaneOpen(true);
    } else setIsOwnerPaneOpen(false);
  };

  useEffect(() => {
    const launchApp = async () => {
      setIsOwner(false);
      const isBSC: boolean = chainId === 56 || chainId === 97 ? true : false;
      if (isActive && account && isBSC) {
        const owner: string = await getAdminAddress(provider);

        if (account.toLowerCase() === owner?.toLowerCase()) {
          setIsOwner(true);
          setOwnerAddress(account);
          setIsOwnerPaneOpen(false);
        }
      }
    };
    launchApp();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, account, chainId]);

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          {isOwner && isActive && (
            <button style={styles.adminButton} onClick={openAdminPane}>
              Admin
            </button>
          )}
          <ChainSelector />
          <ConnectAccount />
        </div>
      </Header>
      <div style={styles.content}>
        {isOwner && isOwnerPaneOpen ? (
          <AdminPane setOwnerAddress={setOwnerAddress} setIsOwnerPaneOpen={setIsOwnerPaneOpen} />
        ) : (
          <DisplayPane />
        )}
      </div>

      <Footer style={styles.footer}>
        <div style={{ display: "block" }}>
          Powered By{" "}
          <a href="https://www.lepricon.io/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px" }}>
            Lepricon.io
          </a>
        </div>
      </Footer>
    </Layout>
  );
}

export const Logo = () => <img src={LepriconLogo_Black} alt="LepriconLogo_Black" width="130px" />;

export default App;
