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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      // setEmailError("Будь ласка, введіть коректну email-адресу");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (validateEmail(email) && password) {
      try {
        const response = await fetch("http://localhost:5000/authorization/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Невдала спроба авторизації");
        }

        const data = await response.json();
        
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Авторизація успішна", data);

          navigate("/admin-page");
        }

      } catch (error) {
        console.error("Помилка авторизації:", error);
      }
    } else {
      setEmailError("Будь ласка, введіть коректну email-адресу");
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
                id="email"
                label="Логін"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 , borderRadius:"50px",height:"48px"}}
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
