import { useState, useEffect } from "react";
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
  Inventory,
  Logout,
  AddCircle,
  Star,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import './Aside.scss';

const drawerWidth = 180;

const menuItems = [
  { text: "Товари", icon: <Inventory />, path: "/" },
  { text: "Новий товар", icon: <AddCircle />, path: "/add" },
  { text: "Новинки та хіти", icon: <Star />, path: "/new-and-hit" },
];

const Sidebar = () => {
  const [newItemsCount, setNewItemsCount] = useState<number | null>(null);
  const [hitItemsCount, setHitItemsCount] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос для новинок
        const newResponse = await fetch("http://localhost:5000/new");
        const newData = await newResponse.json();
        
        console.log("Ответ для новинок:", newData);  // Добавим вывод в консоль для диагностики
        
        // Проверка и подсчёт элементов в массиве
        if (Array.isArray(newData) && newData.length > 0) {
          setNewItemsCount(newData.length); // Подсчёт количества элементов в массиве
        } else {
          console.error("Новинки не найдены или структура данных неправильная", newData);
        }

        // Запрос для хитов
        const hitResponse = await fetch("http://localhost:5000/hit");
        const hitData = await hitResponse.json();
        
        console.log("Ответ для хитов:", hitData);  // Добавим вывод в консоль для диагностики
        
        // Проверка и подсчёт элементов в массиве
        if (Array.isArray(hitData) && hitData.length > 0) {
          setHitItemsCount(hitData.length); // Подсчёт количества элементов в массиве
        } else {
          console.error("Хиты не найдены или структура данных неправильная", hitData);
        }
      } catch (error) {
        console.error("Error fetching new and hit items", error);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate(0);
  };

  // Условие для добавления красного фона и чёрного текста
  const highlightNewAndHit = (newItemsCount !== 4 || hitItemsCount !== 4) ? { 
    backgroundColor: 'red',  // Красный фон
    color: 'black',  // Чёрный цвет текста
  } : {};

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
                <NavLink to={path} key={text}>
                  <ListItem 
                    disablePadding
                    sx={text === "Новинки та хіти" ? highlightNewAndHit : {}} 
                  >
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
