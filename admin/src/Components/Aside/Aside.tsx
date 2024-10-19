import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import {
  ShoppingCart,
  Inventory,
  Payment,
  Settings,
  Logout,
} from "@mui/icons-material";

const drawerWidth = 240;

const menuItems = [
  { text: "Товари", icon: <Inventory />, path: "/products" },
  { text: "Замовлення", icon: <ShoppingCart />, path: "/orders" },
  { text: "Оплати", icon: <Payment />, path: "/payments" },
  { text: "Налаштування", icon: <Settings />, path: "/settings" },
];

const Sidebar = () => {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fff",
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            paddingTop: "64px",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <List sx={{ "& .MuiListItem-root": { marginBottom: "16px" } }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ marginTop: "200px" }}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Вихід" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
