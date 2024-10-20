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
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 180;

const menuItems = [
  { text: "Товари", icon: <Inventory />, path: "/products" },
  { text: "Замовлення", icon: <ShoppingCart />, path: "/orders" },
  { text: "Оплати", icon: <Payment />, path: "/payments" },
];


const Sidebar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  }

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
            {menuItems.map((item) => {
              const { text, icon, path } = item;

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem disablePadding sx={{ marginTop: "200px" }}>
              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Вихід" onClick={logOut} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
