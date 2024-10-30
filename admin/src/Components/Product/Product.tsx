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
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DataItem from "../../types/DataItem";

type Category = "Women" | "Men" | "Child";

interface sizeItem {
  size: string;
  is_available: boolean;
}

interface productProps {
  pageType: 'add' | 'edit';
  item: DataItem;
}

const sizesData: Record<Category, string[]> = {
  Women: ["23-25", "25-27"],
  Men: ["25-27", "27-29", "29-31"],
  Child: ["16", "18", "19-21", "21-23", "23-25"],
};

const defaultCategory: Category = Object.keys(sizesData)[0] as Category;

const Product: React.FC<productProps> = (
  { 
    pageType,
    item
  }) => {
  const categoryToUse = (["Women", "Men", "Child"].includes(item.type) ? item.type : defaultCategory) as Category

  const [name, setName] = useState<string>(item.name);
  const [description, setDescription] = useState<string | undefined>(item.description);
  const [images, setImages] = useState<string[]>(item.images_urls);
  const [compAndCare, setCompAndCare] = useState<string | undefined>(item.composition_and_care);
  const [category, setCategory] = useState<Category>(categoryToUse);
  const [styles, setStyles] = useState<string[]>(item.style);
  const [price, setPrice] = useState<number>(item.price);
  const [price2, setPrice2] = useState<number | undefined>(item.price2);
  const [isNew, setIsNew] = useState<boolean | undefined>(item.is_new);
  const [isTop, setIsTop] = useState<boolean>(false);
  const [sizes, setSizes] = useState<sizeItem[]>(item.size);

  const [openDialog, setOpenDialog] = useState(false);
  // const [refreshSizes, setRefreshSizes] = useState(false);

  const clearAllFields = () => {
    setName(item.name);
    setDescription(item.description);
    setImages(item.images_urls);
    setCompAndCare(item.composition_and_care);
    setCategory(categoryToUse);
    setStyles(item.style);
    setPrice(item.price);
    setPrice2(item.price2);
    setIsNew(item.is_new);
    setIsTop(false);
    setOpenDialog(false);
    setSizes(item.size);
    // setRefreshSizes(prev => !prev);
  };

  const isValidForm = () => {
    if(!name) {
      toast.error('Додайте назву');
      return false;
    }

    if (price === 0) {
      toast.error('Виберіть ціну');
      return false;
    }

    if (price < 0) {
      toast.error('Некоректна ціна');
      return false;
    }

    if (price2 !== undefined && price2 < 0) {
      toast.error('Некоректна акційна ціна');
      return false;
    }

    if (price2 !== undefined && price2 >= price) {
      toast.error('Акційна ціна не може бути більшою за регулярну');
      return false;
    }

    if (images.length === 0) {
      toast.error('Додайте принаймні 1 фото');
      return false;
    }

    if(!sizes.some(size => size.is_available)) {
      toast.error('Виберіть принаймні 1 розмір');
      return false;
    }

    if (styles.length === 0) {
      toast.error('Виберіть принаймні 1 стиль');
      return false;
    }
  
    return true;
  }

  const saveItem = () => {
    if(isValidForm()) {
      toast.success('Чудово!');
    }
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const stylesData = ["Короткі", "Класичні", "Спортивні", "Медичні"];

  useEffect(() => {
    if (pageType === 'add' || category !== item.type) {
      const categorySizes: string[] = sizesData[category];
      setSizes(
        categorySizes.map((currentSize) => ({
          size: currentSize,
          is_available: false,
        }))
      );
    }
  }, [category, pageType]);

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
          {pageType === 'add' 
          ?'Додавання нового товару' 
          :`Редагування товару ${item.vendor_code}`}
          
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
            {pageType === 'add' ? 'Очистити' : `Відмінити зміни`}
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{
              height: 40
            }}
            onClick={() => saveItem()}
          >
            {pageType === 'add' ? 'Додати товар' : `Зберегти зміни`}
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
                label="Ціна(грн)"
                variant="outlined"
                type="number"
                value={price ? price : ''}
                onChange={(event) => setPrice(+event.target.value)}
              />
              <TextField
                fullWidth
                label="Акційна ціна(грн)"
                variant="outlined"
                type="number"
                value={price2 ? price2 : ''}
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
              {Object.keys(sizesData).map((cat) => {
                let categoryUkr = '';

                switch (cat) {
                  case 'Women':
                    categoryUkr = 'Жіночі';
                    break;
                  case 'Men':
                    categoryUkr = 'Чоловічі';
                    break;
                  case 'Child':
                    categoryUkr = 'Дитячі'
                }

                return (
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
                    {categoryUkr}
                  </Button>
                );
              })}
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
            {pageType === 'add' 
            ? 'Ви дійсно хочете очистити всі поля?' 
            : `Відхилити всі зміни та повернути попередні значення товару?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            {pageType === 'add' 
            ? 'Скасувати' 
            : `Ні`}
          </Button>
          <Button onClick={clearAllFields} color="error" autoFocus>
            {pageType === 'add' 
            ? 'Очистити' 
            : `Так`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
