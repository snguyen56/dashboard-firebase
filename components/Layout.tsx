import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Topbar from "./Topbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box display="flex" minHeight="100vh">
      <header>
        <Topbar setMobileOpen={setMobileOpen} />
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
