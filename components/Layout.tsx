import { AppBar, Box, Toolbar, Avatar, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box display="flex" minHeight="100vh">
      <header>
        <AppBar>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              marginLeft: "auto",
              width: `calc(100% - 240px)`,
            }}
          >
            <IconButton aria-label="settings" sx={{ marginRight: 2 }}>
              <SettingsIcon fontSize="large" />
            </IconButton>
            <Avatar alt="Profile Image" />
          </Toolbar>
        </AppBar>
        <aside>
          <Sidebar />
        </aside>
      </header>
      <main>
        <Toolbar />
        {children}
      </main>
    </Box>
  );
}
