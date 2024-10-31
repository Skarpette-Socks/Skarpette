import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

interface Product {
  _id: number;
  vendor_code: number;
  images_urls: string[];
}

interface ArticleInput {
  id: number;
  article: string;
  imageUrls: string[];
}

const fetchAllData = async () => {
  try {
    const response = await fetch("http://localhost:5000/skarpette/");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

const Section: React.FC<{ title: string; articles: ArticleInput[] }> = ({
  title,
  articles,
}) => (
  <Paper
    sx={{
      p: 4, // Увеличенные отступы
      width: "100%",
      maxWidth: 700, // Увеличенная максимальная ширина
      margin: "0 auto",
      bgcolor: "#ffffff",
      borderRadius: 2,
      boxShadow: 2, // Увеличенная тень
      minHeight: 250, // Увеличенная минимальная высота
    }}
  >
    <Typography
      variant="h5" // Увеличенный размер шрифта
      sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
    >
      {title}
    </Typography>
    {articles.map(({ id, article, imageUrls }) => (
      <ArticleField key={id} article={article} imageUrls={imageUrls} />
    ))}
  </Paper>
);

const ArticleField: React.FC<{ article: string; imageUrls: string[] }> = ({
  article,
  imageUrls,
}) => (
  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
    {/* Увеличенный отступ между элементами */}
    <TextField
      fullWidth
      value={article}
      size="medium" // Увеличенный размер инпута
      label="Артикул"
      InputProps={{ readOnly: true }}
      sx={{
        fontSize: "1.6rem", // Увеличенный размер шрифта инпута
        height: 62, // Увеличенная высота инпута
      }}
    />
    <IconButton sx={{ p: 0 }}>
      <img
        src={imageUrls[0]}
        alt={article}
        style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 4 }} // Увеличенный размер изображения
      />
    </IconButton>
  </Stack>
);

const NewAndHitsPage: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [hits, setHits] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllData();
        setNewArrivals(data.slice(0, 4));
        setHits(data.slice(4, 8));
      } catch {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  const sections = [
    {
      title: "Новинки на головній сторінці",
      articles: newArrivals.map(({ _id, vendor_code, images_urls }) => ({
        id: _id,
        article: vendor_code.toString(), // Преобразование в строку
        imageUrls: images_urls,
      })),
    },
    {
      title: "Хіти на головній сторінці",
      articles: hits.map(({ _id, vendor_code, images_urls }) => ({
        id: _id,
        article: vendor_code.toString(),
        imageUrls: images_urls,
      })),
    },
  ];

  return (
    <Box sx={{ p: 2, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            mb: 3,
            mt: 2,
            fontSize: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            bgcolor: "#ffffff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Новинки та хіти на головній сторінці
        </Typography>
        <Button startIcon={<DeleteIcon />} color="error" variant="contained">
          Очистити
        </Button>
        <Button startIcon={<SaveIcon />} color="primary" variant="contained">
          Зберегти
        </Button>
      </Stack>

      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {sections.map(({ title, articles }) => (
          <Section key={title} title={title} articles={articles} />
        ))}
      </Stack>
    </Box>
  );
};

export default NewAndHitsPage;
