import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Category = "Жіночі" | "Чоловічі" | "Дитячі";

interface sizeItem {
  size: string;
  is_available: boolean;
}

const sizesData: Record<Category, string[]> = {
  Жіночі: ["23-25", "25-27"],
  Чоловічі: ["25-27", "27-29", "29-31"],
  Дитячі: ["16", "18", "19-21", "21-23", "23-25"],
};

const AddProduct = () => {
  const [name, setName] = useState<string>(""); //+
  const [description, setDescription] = useState<string>(""); //+
  const [images, setImages] = useState<string[]>([]); //+
  const [compAndCare, setCompAndCare] = useState<string>(""); //+
  const [category, setCategory] = useState<Category>("Жіночі"); //+
  const [styles, setStyles] = useState<string[]>([]); //-
  const [price, setPrice] = useState<number | null>(); //+
  const [price2, setPrice2] = useState<number | null>(); //+
  const [isNew, setIsNew] = useState<boolean>(false); //+
  const [isTop, setIsTop] = useState<boolean>(false); //+
  const [sizes, setSizes] = useState<sizeItem[]>([]); //+

  const [openDialog, setOpenDialog] = useState(false);
  const [refreshSizes, setRefreshSizes] = useState(false);

  const clearAllFields = () => {
    setName("");
    setDescription("");
    setImages([]);
    setCompAndCare("");
    setCategory("Жіночі");
    setStyles([]);
    setPrice(null);
    setPrice2(null);
    setIsNew(false);
    setIsTop(false);
    setOpenDialog(false);
    setRefreshSizes(prev => !prev)
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const stylesData = ["Короткі", "Класичні", "Спортивні", "Медичні"];

  useEffect(() => {
    const categorySizes = sizesData[category];
    setSizes(categorySizes.map((currentSize) => ({
      size: currentSize,
      is_available: false,
    })));

    console.log('sizes',sizes);
    
  }, [category, refreshSizes])

  const handleSizeChange = (value: string) => {
    setSizes((prevSizes) => 
      prevSizes.map((prevSize) => 
        prevSize.size === value 
          ? { ...prevSize, is_available: !prevSize.is_available }
          : prevSize
      )
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
      const newImages = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Додавання нового товару
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: 4,
          }}
        >
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{
              height: 40
            }}
            onClick={() => setOpenDialog(true)}
          >
            Очистити
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{
              height: 40
            }}
          >
            Додати товар
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Ліва частина */}
        <Box
          sx={{
            flex: "2 1 60%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Головна інформація */}
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Головна Інформація</Typography>
            <TextField
              fullWidth
              label="Назва"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              fullWidth
              label="Опис"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              fullWidth
              label="Склад та догляд"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={compAndCare}
              onChange={(event) => setCompAndCare(event.target.value)}
            />
          </Box>

          {/* Ціноутворення */}
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Ціноутворення
            </Typography>
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
                value={price}
                onChange={(event) => setPrice(+event.target.value)}
              />
              <TextField
                fullWidth
                label="Спеціальна ціна"
                variant="outlined"
                type="number"
                value={price2}
                onChange={(event) => setPrice2(+event.target.value)}
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
            gap: 2,
          }}
        >
          {/* Фотографії */}
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Фотографії (макс. 5шт)
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {images.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 90,
                    height: 100,
                    backgroundColor: "#fafafa",
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
              {images.length < 5 && (
                <Button
                  variant="outlined"
                  sx={{ width: 90, height: 100 }}
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
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Категорія
            </Typography>
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
                  onClick={() => setCategory(cat as Category)}
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
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Розміри
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {sizesData[category].map((size) => {
                const selectedSize = sizes
                  .find((curSize) => curSize.size === size)
                  ?.is_available;

                return (
                  <Button
                    key={size}
                    variant={
                      selectedSize 
                        ? "contained" 
                        : "outlined"
                    }
                    onClick={() => handleSizeChange(size)}
                    sx={{
                      height: 40,
                      width: 70,
                      fontWeight: selectedSize
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {size}
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Стилі */}
          <Box
            sx={{
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Стилі
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {stylesData.map((style) => (
                <Button
                  key={style}
                  variant={
                    styles.some((s) => s === style) ? "contained" : "outlined"
                  }
                  onClick={() => handleStyleChange(style)}
                  sx={{
                    height: 40,
                    fontWeight: styles.some((s) => s === style)
                      ? "bold"
                      : "normal",
                  }}
                >
                  {style}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Теги */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fafafa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h6"
              paddingBottom={1}
            >
              Теги
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2
              }}
            >
              <Button
                variant={
                  isNew ? "contained" : "outlined"
                }
                onClick={() => setIsNew((prev) => !prev)}
                sx={{
                  height: 40,
                  fontWeight: isNew
                    ? "bold"
                    : "normal",
                }}
              >
                NEW
              </Button>
              <Button
                variant={
                  isTop ? "contained" : "outlined"
                }
                onClick={() => setIsTop((prev) => !prev)}
                sx={{
                  height: 40,
                  fontWeight: isTop
                    ? "bold"
                    : "normal",
                }}
              >
                TOP
              </Button>

            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Підтвердження очищення</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви дійсно хочете очистити всі поля?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Скасувати
          </Button>
          <Button onClick={clearAllFields} color="error" autoFocus>
            Очистити
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddProduct;
