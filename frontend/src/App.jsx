import HomePage from "./pages/homePage/HomePage";
import ProfilePage from './pages/profilePage/ProfilePage';
import LoginPage from "./pages/loginPage/LoginPage";
import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"; 



function App() {
  const mode = useSelector((state) => state.mode);


  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  
 
  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme = {theme}>
          <CssBaseline />
            <Routes>
              <Route path = "/" element  = {<LoginPage />} />
            <Route path = "/home" element  = { isAuth ? <HomePage /> : <Navigate to = "/" />} />
            <Route path = "/profile/:userId" element  = {isAuth ? <ProfilePage /> : <Navigate to = "/" />} />
              
            </Routes>
      </ThemeProvider>
      </BrowserRouter>
      </>
  )
}

export default App
