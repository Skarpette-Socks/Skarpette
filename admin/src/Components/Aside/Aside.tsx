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
  // ShoppingCart,
  Inventory,
  // Payment,
  Logout,
  AddCircle,
  Star,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import './Aside.scss';

const drawerWidth = 180;

const menuItems = [
  { text: "Товари", icon: <Inventory />, path: "/" },
  // { text: "Замовлення", icon: <ShoppingCart />, path: "/orders" },
  // { text: "Оплати", icon: <Payment />, path: "/payments" },
  { text: "Новий товар", icon: <AddCircle />, path: "/add" },
  { text: "Новинки та хіти", icon: <Star />, path: "/new-and-hit" },
];


const Sidebar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate(0);
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
                <NavLink to={path}>
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: "40px" }}>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
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
