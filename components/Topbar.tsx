import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import SettingsMenu from "./SettingsMenu";

type Props = {
  setMobileOpen: (state: boolean) => void;
};

export default function Topbar({ setMobileOpen }: Props) {
  const router = useRouter();

  const { primaryColor } = useThemeContext();

  const { user, logout } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const profileOpen = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
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
        <SettingsMenu />
        {/* Profile Menu */}
        {user ? (
          <>
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
                {user.displayName ? user.displayName : "Not Found"}
              </Typography>
              <Typography
                sx={{ padding: "6px 16px" }}
                variant="subtitle1"
                component="p"
              >
                {user.email}
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
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="text" sx={{ ml: 2 }}>
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="contained">Signup</Button>
            </Link>
          </>
        )}

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
