import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const xl = defineStyle({
  fontSize: "24px",
  fontWeight: "bold",
  px: "4",
  h: "12",
});

const sizes = {
  xl: definePartsStyle({ field: xl, addon: xl }),
};

export const inputTheme = defineMultiStyleConfig({
  sizes,
});
