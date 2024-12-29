import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A4D3C",
    },
    background: {
      default: "#F8F5F0",
    },
  },
});

const AdminAuth: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleloginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newlogin = e.target.value;
    setLogin(newlogin);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Підтвердіть, що ви не робот.");
      return;
    }

    if (login && password) {
      try {
        const response = await fetch("http://185.237.207.177:5000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login,
            password,
            captchaToken,
          }),
        });

        if (!response.ok) {
          setError("Неправильний логін або пароль. Спробуйте ще раз.");
          throw new Error("Невдала спроба авторизації");
        }

        const token = await response.json();
        if (token) {
          localStorage.setItem("authToken", token);

          navigate(0);
        }
      } catch (error) {
        console.error("Помилка авторизації:", error);
      }
    } else {
      setError("Неправильний логін або пароль. Спробуйте ще раз.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            bgcolor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 3, color: "primary.main" }}
            >
              Вхід
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Логін"
                name="login"
                autoComplete="login"
                autoFocus
                value={login}
                onChange={handleloginChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="перемкнути видимість пароля"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ReCAPTCHA
                sitekey="6Lf3fqUqAAAAAHQ-OqAAXDm0Q4V_aN1AOcaFQSYx"
                onChange={handleCaptchaChange}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, borderRadius: "50px", height: "48px" }}
              >
                Увійти
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AdminAuth;
