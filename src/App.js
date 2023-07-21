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
import Dashboard from './components/dashboard/Dashboard';
import CourtList from './components/courtList/CourtList';
import { CookiesProvider } from 'react-cookie';
import CreateCourt from './components/createCourt/CreateCourt';
import { ConfirmProvider } from "material-ui-confirm";


function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <CookiesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="" element={<Dashboard />} ></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="courts" element={<CourtList/>}></Route>
                <Route path="courts/create" element={<CreateCourt/>}></Route>
              </Routes>
            </BrowserRouter>
          </CookiesProvider>
        </ConfirmProvider>
      </ThemeProvider>    
    </CssBaseline>
  )
}

export default App;
