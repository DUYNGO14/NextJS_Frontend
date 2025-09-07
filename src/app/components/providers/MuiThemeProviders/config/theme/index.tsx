import componentsTheme from "@components/providers/MuiThemeProviders/config/theme/componentsTheme";
import palette from "@components/providers/MuiThemeProviders/config/theme/palette";
import typography from "@components/providers/MuiThemeProviders/config/theme/typopgraphy";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {...palette},
  typography: {...typography},
  components: {...componentsTheme}
}); 

export default theme;