import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#208c27',
    },
    secondary: {
      main: '#e66521',
    },
    text: {
      primary: '#333333',
      secondary: '#777777',
      disabled: '#a8a7a8',
    },
    warning: {
      main: '#ffcc08',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 16,
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
  }
});

export default theme;
