import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import theme from './theme/Theme';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <React.Fragment>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          
        </ThemeProvider>
      </CssBaseline>
    </React.Fragment>
  );
}

export default App;
