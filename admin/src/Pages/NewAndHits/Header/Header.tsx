import React from "react";
import { Box, Typography } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import ClearIcon from "@mui/icons-material/Clear";

const HeaderBlock: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      bgcolor="#f0f0f0"
      borderRadius={5}
      width="80%"
      marginInline="auto"
      marginTop="20px"
    >
      {/* Левая часть с иконкой стрелки и заголовком */}
      <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto">
        <Typography variant="h5" ml={1}>
          Новинки та хіти на головній сторінці
        </Typography>
      </Box>

      {/* Правая часть с кнопками "Очистити" и "Зберегти" */}
      {/* <Box display="flex" gap={2}>
        <Button variant="outlined" color="error" startIcon={<ClearIcon />}>
          Очистити
        </Button>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
          Зберегти
        </Button>
      </Box> */}
    </Box>
  );
};

export default HeaderBlock;
