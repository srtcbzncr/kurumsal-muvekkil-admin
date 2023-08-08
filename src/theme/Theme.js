import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2EAC6D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#2EAC6D',
    },
    background: {
      default: '#f0f0f0',
      paper: '#FFFFFF',
    },
    success: {
      main: '#2EAC6D',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D61F28',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#EAAB3E',
      contrastText: '#FFFFFF',
    },
    divider: '#ffffff',
    info: {
      main: '#008FFF',
      contrastText: '#FFFFFF',
    },
    text: {
      main : "#1D2315",
    },
    border: {
      secondary : "#FAF7FF",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#2EAC6D',
        color: '#FFFFFF',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
});

export default theme;