import {
  Box,
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
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";

export default function SettingsMenu() {
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

  const settingsOpen = Boolean(settingsAnchorEl);
  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setBorderRadius(newValue);
    }
  };

  return (
    <>
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
                  ? `2px solid ${primaryColor}`
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
                  ? `2px solid ${primaryColor}`
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
                  ? `2px solid ${primaryColor}`
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
                fontSize === 12
                  ? `2px solid ${primaryColor}`
                  : "1px solid #616161",
            }}
          />
          <Chip
            label="Medium"
            variant="outlined"
            onClick={() => setFontSize(14)}
            sx={{
              border:
                fontSize === 14
                  ? `2px solid ${primaryColor}`
                  : "1px solid #616161",
            }}
          />
          <Chip
            label="Large"
            variant="outlined"
            onClick={() => setFontSize(16)}
            sx={{
              border:
                fontSize === 16
                  ? `2px solid ${primaryColor}`
                  : "1px solid #616161",
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
    </>
  );
}
