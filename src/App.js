import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import theme from './theme/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { CookiesProvider } from 'react-cookie';


function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} ></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>    
    </CssBaseline>
  );
}

export default App;
