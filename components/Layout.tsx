import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Topbar from "./Topbar";
import { useAuth } from "@/context/AuthContext";
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box display="flex" minHeight="100vh">
      <header>
        <Topbar setMobileOpen={setMobileOpen} />
        <aside>
          {user ? (
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          ) : null}
        </aside>
      </header>
      <main>
        <Toolbar />
        {children}
      </main>
    </Box>
  );
}
