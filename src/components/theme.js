import { createMuiTheme } from "@material-ui/core/styles";
import colors from "@material-ui/core/colors/cyan";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  palette: {
    primary: {
      ...colors,
      contrastText: "#ffffff"
    },
    secondary: deepOrange
  },
  status: {
    danger: "orange"
  }
});

export default theme;
