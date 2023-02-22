import { AppBar, Box, Toolbar, Avatar, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <IconButton
              aria-label="menu"
              sx={{ marginLeft: 2, display: { xs: "block", md: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <aside>
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </aside>
      </header>
      <main>
        <Toolbar />
        {children}
      </main>
    </Box>
  );
}
