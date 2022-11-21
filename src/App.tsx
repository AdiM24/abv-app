import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Layout";
import useAuth from "./context/AuthContext";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import { ReactNode, useEffect, useState } from "react";
import ProtectedRoute from "./router/ProtectedRoute";
import PartnerPage from "./pages/partners/PartnersPage";
import CreatePartnerPage from "./pages/partners/CreatePartnerPage";

function App() {
  const auth = useAuth();
  console.log(useAuth());
  const [authState, setAuthState] = useState<string | null | undefined>(null);

  useEffect(() => {
    console.log(auth.token);
    setAuthState(auth.token);
  }, [auth.token])

  // define theme
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  const loginContainer = (): ReactNode => (
    <Routes>
      <Route key='login' path='/login' element={<LoginPage />} />
    </Routes>
  )

  const defaultContainer = (): ReactNode => (
    <>
      <Header>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
          <Route path='/partners' element={
            <ProtectedRoute>
              <PartnerPage />
            </ProtectedRoute>
          } />
          <Route path='/partners/create' element={
            <ProtectedRoute>
              <CreatePartnerPage />
            </ProtectedRoute>
          } />
          <Route path='*' element={
            <h2>404</h2>
          } />
        </Routes>

      </Header>

    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />

      {authState ? defaultContainer() : loginContainer()}

    </ThemeProvider>
  );
}

export default App;