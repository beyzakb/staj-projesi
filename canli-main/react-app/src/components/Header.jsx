import React from "react";
import Container from "@mui/material/Container";
import { Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <Container maxWidth="md" sx={{ background: "444", textAlign: "center",marginTop:'1rem',marginBottom:'1rem'}}>
      <Typography variant="h3" sx={{ color: "white" }}>
        React sample text generator app
      </Typography>
    </Container>
  );
};

export default Header;
