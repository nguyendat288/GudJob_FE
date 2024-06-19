import { createTheme } from "@mui/material";
import {} from '@mui/lab/themeAugmentation';
export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Quicksand','sans-serif'].join(','),
      fontSize: 16,
      fontWeight: '100'
    },
  },
  palette:{
    bgColorPrimary: {
      main: '#f5f7f9'
    }
  },
  button: {
    
  },
  components: {
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    }
  }
});
