import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ActionButtons = () => {
  return (
        
        <Box sx={{ display: "flex", justifyContent:'space-around', marginTop: "20px"}}>
      <Button variant="contained" color="error" sx={{ textTransform: "none" }}>
        Видалити
      </Button>
      <Link to='/add'>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Додати товар
        </Button>
      </Link>
    </Box>
  );
};

export default ActionButtons;
