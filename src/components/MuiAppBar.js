import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const MuiAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 16,
              }}
            >
              Fetch
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href="/history"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: 16,
              }}
            >
              History
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
