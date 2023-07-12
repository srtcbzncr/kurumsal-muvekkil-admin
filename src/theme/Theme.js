import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2EAC6D',
      contrastText: '#F2F2F3',
    },
    secondary: {
      main: '#3C2F3D',
      contrastText: '#F2F2F3',
    },
    background: {
      default: '#F0F0F0',
      paper: '#e3e3e3',
    },
    success: {
      main: '#2EAC6D',
      contrastText: '#F2F2F3',
    },
    error: {
      main: '#D61F28',
      contrastText: '#F2F2F3',
    },
    warning: {
      main: '#EAAB3E',
      contrastText: '#F2F2F3',
    },
    divider: '#ffffff',
    info: {
      main: '#008FFF',
      contrastText: '#F2F2F3',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#2EAC6D',
        color: '#F2F2F3',
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