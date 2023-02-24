import {
  Drawer,
  ListItemButton,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import Link from "next/link";
import { useState } from "react";

const navData = [
  { name: "Dashboard", link: "/", icon: "dashboard" },
  { name: "Customers", link: "/customers", icon: "people" },
  { name: "Products", link: "/products", icon: "shopping_cart" },
  { name: "Transactions", link: "/transactions", icon: "attach_money" },
];

type Props = {
  mobileOpen: boolean;
  setMobileOpen: (state: boolean) => void;
};

export default function Sidebar({ mobileOpen, setMobileOpen }: Props) {
  const drawerWidth = 240;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const drawerContent = (
    <>
      <Link href="/">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Icon>inventory</Icon>
          <Typography variant="h5" component="div" py={2} ml={2}>
            LOGO
          </Typography>
        </Box>
      </Link>
      <List disablePadding>
        {navData.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.link}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemIcon>
                  <Icon color={index === selectedIndex ? "primary" : "inherit"}>
                    {item.icon}
                  </Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box component="nav">
      {/* desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: "none",
          },
          display: { xs: "none", md: "block" },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
