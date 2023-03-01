import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Stack,
  Chip,
  Slider,
  ListItemIcon,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";

type Props = {
  setMobileOpen: (state: boolean) => void;
};

export default function Topbar({ setMobileOpen }: Props) {
  const {
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
    borderRadius,
    setBorderRadius,
  } = useThemeContext();

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const settingsOpen = Boolean(settingsAnchorEl);
  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const profileOpen = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setBorderRadius(newValue);
    }
  };

  return (
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
        {/* Settings menu */}
        <IconButton
          id="settings-button"
          aria-controls={settingsOpen ? "settings-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={settingsOpen ? "true" : undefined}
          aria-label="settings"
          onClick={handleSettingsClick}
        >
          <SettingsIcon fontSize="large" />
        </IconButton>
        <Menu
          id="settings-menu"
          anchorEl={settingsAnchorEl}
          open={settingsOpen}
          onClose={handleSettingsClose}
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
          <Typography sx={{ padding: "6px 16px" }}>Border Radius</Typography>
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
        {/* Profile Menu */}
        <IconButton
          onClick={handleProfileClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={profileOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={profileOpen ? "true" : undefined}
        >
          <Avatar alt="Profile Image" sx={{ bgcolor: primaryColor }} />
        </IconButton>
        <Menu
          anchorEl={profileAnchorEl}
          id="account-menu"
          open={profileOpen}
          onClose={handleProfileClose}
          onClick={handleProfileClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Typography
            sx={{ padding: "6px 16px" }}
            variant="h6"
            component="span"
          >
            Username
          </Typography>
          <Typography
            sx={{ padding: "6px 16px" }}
            variant="subtitle1"
            component="p"
          >
            username@email.com
          </Typography>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            Edit account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileClose}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <IconButton
          aria-label="nav-menu"
          sx={{ marginLeft: 2, display: { xs: "inline-flex", md: "none" } }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
