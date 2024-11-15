import React, { useEffect, useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

interface NewItem {
  id: string;
  vendor_code: number | null;
  image_url: string;
}

const NewItemsBlock: React.FC = () => {
  const [newItems, setNewItems] = useState<NewItem[]>([
    { id: "", vendor_code: null, image_url: "" },
    { id: "", vendor_code: null, image_url: "" },
    { id: "", vendor_code: null, image_url: "" },
    { id: "", vendor_code: null, image_url: "" },
  ]);

  const [vendorCode1, setVendorCode1] = useState<number | null>(null);
  const [vendorCode2, setVendorCode2] = useState<number | null>(null);
  const [vendorCode3, setVendorCode3] = useState<number | null>(null);
  const [vendorCode4, setVendorCode4] = useState<number | null>(null);

  useEffect(() => {
    const fetchAllHits = async () => {
      try {
        const response = await fetch("http://localhost:5000/hit");

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        const data: NewItem[] = await response.json();
        console.log("Получены все хиты:", data); // Отладочный вывод

        // Устанавливаем данные в newItems
        setNewItems(data);

        // Распределяем vendor_code по состояниям
        setVendorCode1(data[0]?.vendor_code || null);
        setVendorCode2(data[1]?.vendor_code || null);
        setVendorCode3(data[2]?.vendor_code || null);
        setVendorCode4(data[3]?.vendor_code || null);
      } catch (error) {
        console.error("Ошибка при получении хитов:", error);
      }
    };

    fetchAllHits();
  }, []);

  const handleVendorCodeChange = async (
    index: number,
    newVendorCode: string,
    setVendorCode: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const numericVendorCode = newVendorCode ? Number(newVendorCode) : null;
    setVendorCode(numericVendorCode);

    setNewItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { id: item.id, vendor_code: numericVendorCode, image_url: item.image_url }
          : item
      )
    );

    try {
      if (!numericVendorCode) {
        const itemId = newItems[index].id;
        if (itemId) {
          const response = await fetch(`http://localhost:5000/hit/${itemId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(`Ошибка удаления: ${response.status}`);
          }
        }
      } else {
        const response = await fetch(
          `http://localhost:5000/hit/${numericVendorCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ vendor_code: numericVendorCode }),
          }
        );

        if (!response.ok) {
          throw new Error(`Ошибка создания: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Ошибка при изменении новинки:", error);
    }
  };

  if (!newItems || newItems.length === 0) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, borderRadius: 1, border: "1px solid #ccc" }}>
      <Typography variant="h6" gutterBottom>
        Новинки на головній сторінці
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[vendorCode1, vendorCode2, vendorCode3, vendorCode4].map(
          (vendorCode, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label={`Артикул ${index + 1}`}
                type="text"
                value={vendorCode ?? ""}
                onChange={(e) =>
                  handleVendorCodeChange(
                    index,
                    e.target.value,
                    [
                      setVendorCode1,
                      setVendorCode2,
                      setVendorCode3,
                      setVendorCode4,
                    ][index]
                  )
                }
                fullWidth
              />
              <Box sx={{ mx: 1 }}>
                <img
                  src={newItems[index]?.image_url || ""}
                  alt={`Item ${index + 1}`}
                  width={40}
                  height={40}
                />
              </Box>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default NewItemsBlock;
