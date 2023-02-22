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

const navData = [
  { name: "Dashboard", link: "/", icon: "dashboard" },
  { name: "Customers", link: "/customers", icon: "people" },
  { name: "Products", link: "/products", icon: "shopping_cart" },
  { name: "Transactions", link: "/transactions", icon: "attach_money" },
];

export default function Sidebar() {
  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          textAlign: "center",
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
      >
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
        <List disablePadding>
          {navData.map((item) => (
            <ListItem key={item.name} disablePadding>
              <Link href={item.link}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
