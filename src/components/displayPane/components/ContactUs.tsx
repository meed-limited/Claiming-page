const styles = {
  container: {
    width: "90%",
    border: "solid #75e287 1px",
    borderRadius: "20px",
    margin: "20px auto",
    padding: "30px 0",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 3px 10px"
  },
  title: {
    color: "black",
    fontWeight: 600,
    fontSize: "17px",
    marginBottom: "10px"
  },
  content: {
    width: "85%",
    margin: "auto",
    fontSize: "15px"
  }
} as const;

export const ContactUs: React.FC<any> = () => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Contact Us</div>
      <div style={styles.content}>
        If you are expecting to see your wallet whitelisted or you think that there is a problem with the amount of LPR
        that you have received, please contact us using this form: <br></br>
        <a href={"https://forms.gle/tQpyVJ4jAgCYuu3T9"} target="_blank" rel="noreferrer">
          <b>https://forms.gle/tQpyVJ4jAgCYuu3T9</b>
        </a>
      </div>
    </div>
  );
};
