import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer
      style={{
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Copyright />
    </footer>
  );
}
