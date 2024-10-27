import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Category = "Жіночі" | "Чоловічі" | "Дитячі";

const AddProduct = () => {
  const [category, setCategory] = useState<Category>("Жіночі");
  const [sizes, setSizes] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isNew, setIsNew] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sizesData: Record<Category, string[]> = {
    Жіночі: ["23-25", "25-27"],
    Чоловічі: ["25-27", "27-29", "29-31"],
    Дитячі: ["16", "18", "19-21", "21-23", "23-25"],
  };

  const stylesData = ["Короткі", "Класичні", "Спортивні", "Медичні"];

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setSizes([]);
  };

  const handleSizeChange = (value: string) => {
    setSizes((prevSizes) =>
      prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value]
    );
  };

  const handleStyleChange = (value: string) => {
    setStyles((prevStyles) =>
      prevStyles.includes(value)
        ? prevStyles.filter((style) => style !== value)
        : [...prevStyles, value]
    );
  };

  const handlePhotoAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(0, 5));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoRemove = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Додавання нового товару
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          mb: 3,
          gap: 4,
        }}
      >
        <Button variant="contained" color="secondary">
          Очистити
        </Button>
        <Button variant="contained" color="primary">
          Додати товар
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {/* Ліва частина */}
        <Box
          sx={{
            flex: "2 1 60%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Головна інформація */}
          <Box>
            <Typography variant="h6">Головна Інформація</Typography>
            <TextField
              fullWidth
              label="Назва"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Опис"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Склад та догляд"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </Box>

          {/* Ціноутворення */}
          <Box>
            <Typography variant="h6">Ціноутворення</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Ціна"
                variant="outlined"
                type="number"
              />
              <TextField
                fullWidth
                label="Спеціальна ціна"
                variant="outlined"
                type="number"
              />
            </Box>
          </Box>
        </Box>

        {/* Права частина */}
        <Box
          sx={{
            flex: "1 1 30%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Фотографії */}
          <Box>
            <Typography variant="h6">Фотографії</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => handlePhotoRemove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              {photos.length < 5 && (
                <Button 
                  variant="outlined" 
                  sx={{ width: 100, height: 100 }}
                  onClick={handleButtonClick}
                >
                  Додати
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handlePhotoAdd}
                  />
                </Button>
              )}
            </Box>
          </Box>

          {/* Категорія */}
          <Box>
            <Typography variant="h6">Категорія</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {Object.keys(sizesData).map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "contained" : "outlined"}
                  onClick={() => handleCategoryChange(cat as Category)}
                  sx={{
                    flex: 1,
                    height: 40,
                    fontWeight: category === cat ? "bold" : "normal",
                  }}
                >
                  {cat}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Розміри */}
          <Box>
            <Typography variant="h6">Розміри</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {sizesData[category].map((size) => (
                <Button
                  key={size}
                  variant={sizes.some(s => s === size) ? "contained" : "outlined"}
                  onClick={() => handleSizeChange(size)}
                  sx={{
                    height: 40,
                    width: 70,
                    fontWeight: sizes.some(s => s === size) ? "bold" : "normal",
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Стилі */}
          <Box>
            <Typography variant="h6">Стилі</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {stylesData.map((style) => (
                  <Button
                  key={style}
                  variant={styles.some(s => s === style) ? "contained" : "outlined"}
                  onClick={() => handleStyleChange(style)}
                  sx={{
                    height: 40,
                    fontWeight: styles.some(s => s === style) ? "bold" : "normal",
                  }}
                >
                  {style}
                </Button>
              ))}
            </Box>
          </Box>


          {/* Новинки */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Новинки</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  value={isNew}
                  checked={isNew}
                  onChange={() => setIsNew(prev => !prev)}
                  sx={{
                    justifyContent: "start"
                  }}
                />
              } 
              label={isNew}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;