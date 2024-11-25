import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      // position="relative"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", width: "200px" }}>
          Skarpette
          <span style={{ fontSize: "12px", color: "grey" }}>admin panel</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "200px",
            justifyContent: "flex-end",
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          <Typography sx={{ marginLeft: 1 }}>Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
