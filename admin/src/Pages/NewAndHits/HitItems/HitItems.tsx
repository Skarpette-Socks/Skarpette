import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHitItem } from "../../../api/deleteItem";
import { createHitItem } from "../../../api/createNewItem";
import { useItemsContext } from "../../../Context/ItemsContext";

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

interface HitItem {
  hitId: string;
  skarpette: ProductData;
}

interface InputState {
  value: string;
  item: HitItem | null;
}

const HitItemsBlock = () => {
  const [inputs, setInputs] = useState<InputState[]>(
    Array(4).fill({ value: "", item: null })
  );
  const [inputErrors, setInputErrors] = useState<boolean[]>(
    Array(4).fill(false)
  );
  const [error, setError] = useState<string>("");

  const prevInputs = useRef<string[]>(Array(4).fill(""));

  const { fetchItems: fetchAllItems } = useItemsContext(); // Берем метод из контекста

  const ensureFourInputs = (data: InputState[]) => {
    return Array(4)
      .fill(null)
      .map((_, i) => data[i] || { value: "", item: null });
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/hit");
      if (!response.ok) throw new Error("Failed to fetch items");
      const data: HitItem[] = await response.json();

      const newInputs = ensureFourInputs(
        data.map((item) => ({
          value: item.skarpette.vendor_code.toString(),
          item,
        }))
      );

      setInputs(newInputs);
      prevInputs.current = newInputs.map((input) => input.value.trim());
      setError("");
    } catch (err) {
      setError("Failed to load items");
      console.error(err);
    }
  };

  const handleDelete = async (hitId: string, inputIndex: number) => {
    try {
      await deleteHitItem(hitId);

      const newInputs = [...inputs];
      newInputs[inputIndex] = { value: "", item: null };
      setInputs(ensureFourInputs(newInputs));
      prevInputs.current[inputIndex] = "";
      setError("");
      await fetchAllItems();
    } catch (err) {
      setError("Failed to delete item");
      console.error(err);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], value };
    setInputs(newInputs);

    // Сбрасываем ошибку, если пользователь изменяет значение
    const newErrors = [...inputErrors];
    newErrors[index] = false;
    setInputErrors(newErrors);
  };

  const handleBlur = async (index: number) => {
    const inputValue = inputs[index].value.trim();
    const prevValue = prevInputs.current[index];

    // Если значение пустое, устанавливаем ошибку и красную рамку
    if (!inputValue) {
      const newErrors = [...inputErrors];
      newErrors[index] = true;
      setInputErrors(newErrors);
      setError("Input cannot be empty");
      return;
    }

    if (inputValue === prevValue) return;

    try {
      const checkResponse = await fetch(
        `http://localhost:5000/skarpette/search?vendor_code=${encodeURIComponent(
          inputValue
        )}`
      );

      if (!checkResponse.ok) {
        throw new Error(`HTTP error! status: ${checkResponse.status}`);
      }

      const product = await checkResponse.json();
      if (!product || product.length === 0) {
        throw new Error("Product not found");
      }

      const itemData = {
        vendorCode: inputValue,
      };

      await createHitItem(inputValue, itemData);
      await fetchItems();
      await fetchAllItems(); // Обновляем данные в контексте

      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to process vendor code"
      );

      const newInputs = [...inputs];
      newInputs[index] = { ...newInputs[index], value: prevValue };
      setInputs(newInputs);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box sx={{ width: "45%", p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card
        sx={{
          p: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            pb: 2,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Хіти на головній сторінці
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {inputs.map((input, index) => (
            <Box key={index}>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Артикул
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    value={input.value}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onBlur={() => handleBlur(index)}
                    size="small"
                    error={inputErrors[index]} // Красная рамка при ошибке
                    helperText={
                      inputErrors[index] ? "This field is required" : ""
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: inputErrors[index] ? "red" : "#e0e0e0",
                        },
                      },
                    }}
                  />
                </Box>

                {input.item?.skarpette?.images_urls?.[0] && (
                  <Box
                    component="img"
                    src={input.item.skarpette.images_urls[0]}
                    alt="Product"
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                )}

                <IconButton
                  onClick={() => handleDelete(input.item?.hitId ?? "", index)}
                  color="error"
                  size="small"
                  sx={{
                    flexShrink: 0,
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 0.04)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HitItemsBlock;
