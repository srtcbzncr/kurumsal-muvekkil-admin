import { ThemeOptions } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00AD7C',
    },
    secondary: {
      main: '#ad0031',
    },
    background: {
      default: '#ECEFF4',
      paper: '#E8E8E8',
    },
    error: {
      main: '#ad0031',
    },
    success: {
      main: '#00AD7C',
    },
    divider: '#475762',
    warning: {
      main: '#FBD490',
    },
    info: {
      main: '#0088ad',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
});