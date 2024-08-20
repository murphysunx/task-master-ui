import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./components/input";

const theme = extendTheme({
  components: {
    Input: inputTheme,
  },
});

export default theme;
