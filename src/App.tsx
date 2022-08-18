import { Buffer } from "buffer";
import ConnectAccount from "./components/Account/ConnectAccount";
import DisplayPane from "./components/displayPane/DisplayPane";
import background from "./assets/images/background.png";
import LepriconLogo_Black from "./assets/images/LepriconLogo_Black.png";
import { Layout } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import ChainSelector from "./components/ChainSelector";

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
    marginTop: "100px",
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
  }
} as const;

function App() {
  if (!window.Buffer) window.Buffer = Buffer;

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          <ChainSelector />
          <ConnectAccount />
        </div>
      </Header>
      <div style={styles.content}>
        <DisplayPane />
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
