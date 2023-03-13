import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import useOnline from "utils/useOnline";
import PasswordReset from "scenes/PasswordReset/PasswordReset";
import ForgotPassword from "scenes/ForgotPassword/ForgotPassword";
import Testing from "scenes/Testing/Testing";
import MessagePage from "scenes/MessagePage/MessagePage";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const isOnline = useOnline();
  if (!isOnline)
    return (
      <>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.error.main,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          You are offline. Please check your internet connection and try again.
        </Typography>
      </>
    );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
            <Route path="/password-reset" element = {<PasswordReset/>}/>
            <Route path="/forgotpassword/:id/:token" element = {<ForgotPassword/>}/>

            {/* for testing purpose  */}
            <Route path="/testing" element = {<Testing/>}/>
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/message"
              element={<MessagePage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;