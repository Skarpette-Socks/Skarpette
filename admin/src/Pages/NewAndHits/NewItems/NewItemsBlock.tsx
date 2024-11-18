import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert } from "@mui/material";
import { deleteFavItem } from "../../../api/deleteItem";
import { createNewItem } from "../../../api/createNewItem";

interface Size {
  size: string;
  is_available: boolean;
}

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
  price2: number;
  vendor_code: number;
  color: string[];
  size: Size[];
  images_urls: string[];
}

interface NewItem {
  newId: string;
  skarpette: ProductData;
}

interface InputState {
  value: string;
  item: NewItem | null;
}

const NewItemsComponent = () => {
  const [inputs, setInputs] = useState<InputState[]>(
    Array(4).fill({ value: "", item: null })
  );
  const [error, setError] = useState<string>("");

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/new");
      if (!response.ok) throw new Error("Failed to fetch items");
      const data: NewItem[] = await response.json();

      const newInputs = Array(4)
        .fill({ value: "", item: null })
        .map((_, index) => ({
          value: data[index]?.skarpette?.vendor_code?.toString() || "",
          item: data[index] || null,
        }));
      setInputs(newInputs);
      setError("");
    } catch (err) {
      setError("Failed to load items");
      console.error(err);
    }
  };

const handleDelete = async (newId: string, inputIndex: number) => {
  try {
    await deleteFavItem(newId); // Вызов функции для удаления
    const newInputs = [...inputs];
    newInputs[inputIndex] = { value: "", item: null };
    setInputs(newInputs);
    setError("");
  } catch (err) {
    setError("Failed to delete item");
    console.error(err);
  }
};


  // const createNewItem = async (vendorCode: string, inputIndex: number) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/new/${vendorCode}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) throw new Error("Failed to create new item");
  //     await fetchItems();
  //     setError("");
  //   } catch (err) {
  //     setError("Failed to create new item");
  //     console.error(err);
  //   }
  // };

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], value };
    setInputs(newInputs);
  };

const handleBlur = async (index: number) => {
  const inputValue = inputs[index].value.trim();
  if (!inputValue) return;

  try {
    // Проверяем существование товара
    const checkResponse = await fetch(
      `http://localhost:5000/skarpette/search?vendor_code=${inputValue}`
    );

    if (!checkResponse.ok) {
      setError("Product not found");
      return;
    }

    const product = await checkResponse.json();
    if (!product || product.length === 0) {
      setError("Product not found");
      return;
    }

    // Если товар существует, создаем новый товар
    const itemData = {
      // Здесь можно добавить данные товара, если нужно, в зависимости от структуры вашего API
      vendorCode: inputValue,
    };

    await createNewItem(inputValue, itemData); // Просто вызываем функцию без сохранения результата

    // Успешное создание товара
    await fetchItems();
    setError(""); // Сбрасываем ошибки
  } catch (err) {
    setError("Failed to process vendor code");
    console.error("Error in handleBlur:", err);
  }
};


  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box className="p-4" sx={{ width: "50%", margin: "0 auto" }}>
      <Typography variant="h5" className="mb-4">
        Новинки на головній сторінці
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {inputs.map((input, index) => (
        <Card key={index} className="mb-4">
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ minWidth: 80 }}>
              Артикул
            </Typography>
            <TextField
              fullWidth
              value={input.value}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onBlur={() => handleBlur(index)}
              sx={{ flex: 1 }}
            />
            {input.item?.skarpette?.images_urls?.[0] && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={input.item.skarpette.images_urls[0]}
                  alt="Product"
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <IconButton
                  onClick={() => handleDelete(input.item.newId, index)}
                  color="error"
                  sx={{
                    width: 50,
                    height: 50,
                  }}
                  size="small"
                >
                  <DeleteIcon sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default NewItemsComponent;
