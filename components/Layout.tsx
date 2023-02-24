import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  Typography,
  Divider,
  Stack,
  Chip,
  Slider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const {
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
    borderRadius,
    setBorderRadius,
  } = useThemeContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setBorderRadius(newValue);
    }
  };

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
              width: { xs: "100%", md: `calc(100% - 240px)` },
            }}
          >
            <IconButton
              id="settings-button"
              aria-controls={open ? "settings-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              aria-label="settings"
              sx={{ marginRight: 2 }}
              onClick={handleClick}
            >
              <SettingsIcon fontSize="large" />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "settings-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ padding: "6px 16px" }}>Theme Color</Typography>
              <Stack direction={"row"} spacing={1} px={1}>
                <Chip
                  label="Purple"
                  variant="outlined"
                  onClick={() => setPrimaryColor("#673ab7")}
                  avatar={<Avatar sx={{ bgcolor: "#673ab7" }}>P</Avatar>}
                  sx={{
                    border:
                      primaryColor === "#673ab7"
                        ? "2px solid #673ab7"
                        : "1px solid #616161",
                  }}
                />
                <Chip
                  label="Green"
                  variant="outlined"
                  onClick={() => setPrimaryColor("#4caf50")}
                  avatar={<Avatar sx={{ bgcolor: "#4caf50" }}>G</Avatar>}
                  sx={{
                    border:
                      primaryColor === "#4caf50"
                        ? "2px solid #4caf50"
                        : "1px solid #616161",
                  }}
                />
                <Chip
                  label="Blue"
                  variant="outlined"
                  onClick={() => setPrimaryColor("#2196f3")}
                  avatar={<Avatar sx={{ bgcolor: "#2196f3" }}>B</Avatar>}
                  sx={{
                    border:
                      primaryColor === "#2196f3"
                        ? "2px solid #2196f3"
                        : "1px solid #616161",
                  }}
                />
              </Stack>
              <Divider sx={{ margin: "8px 0" }} />
              <Typography sx={{ padding: "6px 16px" }}>Font Size</Typography>
              <Stack direction="row" justifyContent="center" spacing={1} px={1}>
                <Chip
                  label="Small"
                  variant="outlined"
                  onClick={() => setFontSize(12)}
                  sx={{
                    border:
                      fontSize === 12 ? "2px solid white" : "1px solid #616161",
                  }}
                />
                <Chip
                  label="Medium"
                  variant="outlined"
                  onClick={() => setFontSize(14)}
                  sx={{
                    border:
                      fontSize === 14 ? "2px solid white" : "1px solid #616161",
                  }}
                />
                <Chip
                  label="Large"
                  variant="outlined"
                  onClick={() => setFontSize(16)}
                  sx={{
                    border:
                      fontSize === 16 ? "2px solid white" : "1px solid #616161",
                  }}
                />
              </Stack>
              <Divider sx={{ margin: "8px 0" }} />
              <Typography sx={{ padding: "6px 16px" }}>
                Border Radius
              </Typography>
              <Box mx={5} width="200px">
                <Slider
                  value={borderRadius}
                  min={0}
                  max={20}
                  defaultValue={4}
                  valueLabelDisplay="auto"
                  onChange={handleSlider}
                />
              </Box>
            </Menu>
            <Avatar alt="Profile Image" sx={{ bgcolor: primaryColor }} />
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
