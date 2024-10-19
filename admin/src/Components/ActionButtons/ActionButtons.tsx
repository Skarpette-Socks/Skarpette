import { Button, Box } from "@mui/material";

const ActionButtons = () => {
  return (
    <Box sx={{ display: "flex", justifyContent:'space-around' ,marginTop:'80px'}}>
      <Button variant="contained" color="error" sx={{ textTransform: "none" }}>
        Видалити
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Додати товар
      </Button>
    </Box>
  );
};

export default ActionButtons;
