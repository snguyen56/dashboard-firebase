import {
  Box,
  Avatar,
  IconButton,
  Menu,
  Typography,
  Divider,
  Stack,
  Chip,
  ChipProps,
  Slider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import { styled } from "@mui/system";

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

  const ColorChip = styled(({ label, rgb }: ChipProps & { rgb: string }) => (
    <Chip
      label={label}
      variant="outlined"
      onClick={() => setPrimaryColor(rgb)}
      avatar={<Avatar sx={{ bgcolor: rgb }}>P</Avatar>}
      sx={{
        border:
          primaryColor === rgb
            ? `2px solid ${primaryColor}`
            : "1px solid #616161",
      }}
    />
  ))(({ theme }) => ({}));

  const FontChip = styled(({ label, font }: ChipProps & { font: number }) => (
    <Chip
      label={label}
      variant="outlined"
      onClick={() => setFontSize(font)}
      sx={{
        border:
          fontSize === font ? `2px solid ${primaryColor}` : "1px solid #616161",
      }}
    />
  ))(({ theme }) => ({}));

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
          <ColorChip label="Purple" rgb="#673ab7" />
          <ColorChip label="Green" rgb="#4caf50" />
          <ColorChip label="Blue" rgb="#2196f3" />
        </Stack>
        <Divider sx={{ margin: "8px 0" }} />
        <Typography sx={{ padding: "6px 16px" }}>Font Size</Typography>
        <Stack direction="row" justifyContent="center" spacing={1} px={1}>
          <FontChip label="Small" font={12} />
          <FontChip label="Medium" font={14} />
          <FontChip label="Large" font={16} />
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
