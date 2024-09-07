import { useMediaQuery } from "@mui/material";

function Landing() {
  const isSmallScreen = useMediaQuery("(max-width:320px)");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "Roboto",
          fontSize: isSmallScreen ? "30px" : "3rem",
          color: "#FFD700", // Gold color for a shiny effect
          textShadow:
            "3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 215, 0, 0.8), 0 0 5px rgba(255, 215, 0, 0.7)", // Adds depth and shine
        }}
      >
        <h1>Welcome! to KnowtBook</h1>
      </div>
    </div>
  );
}
export default Landing;
