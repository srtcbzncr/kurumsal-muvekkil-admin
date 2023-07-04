import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import theme from './theme/Theme';
import {useState, React} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Context } from './context/Context';
import Login from './components/login/Login';


function App() {
  return (
    <CssBaseline>
      <Context.Provider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Context.Provider>      
    </CssBaseline>
  );
}

export default App;
