import { Stack } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";

function App() {
  return (
    <Stack
      sx={{
        backgroundColor: "#444",
        margin: "0",
        padding: "0",
        height: "100vh",
      }}
    >
      <Header />
      <Content />
    </Stack>
  );
}

export default App;
