import { Components, Theme } from '@mui/material/styles';
import MuiButton from "@components/providers/MuiThemeProviders/config/theme/componentsTheme/MuiButton"
import MuiChip from "@components/providers/MuiThemeProviders/config/theme/componentsTheme/MuiChip"
import MuiContainer from "@components/providers/MuiThemeProviders/config/theme/componentsTheme/MuiContainer"
import MuiLink from "@components/providers/MuiThemeProviders/config/theme/componentsTheme/MuiLink"


const componentsTheme: Components<Theme> = {
  MuiContainer,
  MuiLink,
  MuiButton,
  MuiChip,
};
export default componentsTheme