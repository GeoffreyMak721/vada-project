import {
  Colors,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  configureFonts,
} from "react-native-paper";

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { DEFAULT_FONT_SIZE } from "./const";

const fonts = configureFonts({
  default: {
    regular: {
      fontFamily: "quicksand-mono",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "quicksand-mono",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "quicksand-mono",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "quicksand-mono",
      fontWeight: "normal",
    },
  },
});

export const primaryColors = [
  {
    name: "default",
    color: PaperDefaultTheme.colors.primary,
  },
  {
    name: "blue",
    color: Colors.blue900,
  },
  {
    name: "blue-grey",
    color: Colors.blueGrey900,
  },
  {
    name: "light-blue",
    color: Colors.lightBlue900,
  },
  {
    name: "orange",
    color: Colors.orange900,
  },
  {
    name: "red",
    color: Colors.red900,
  },
  {
    name: "green",
    color: Colors.green900,
  },
  {
    name: "light-green",
    color: Colors.lightGreen900,
  },
  {
    name: "brown",
    color: Colors.brown900,
  },
  {
    name: "cyan",
    color: Colors.cyan900,
  },
  {
    name: "deep-purple",
    color: Colors.deepPurple900,
  },
  {
    name: "grey",
    color: Colors.grey900,
  },
  {
    name: "lime",
    color: Colors.lime900,
  },
  {
    name: "pink",
    color: Colors.pink500,
  },
  {
    name: "teal",
    color: Colors.teal800,
  },
];

export const sizes = [
  { name: "plus petit", size: DEFAULT_FONT_SIZE - 10 },
  { name: "petit", size: DEFAULT_FONT_SIZE - 5 },
  { name: "normal", size: DEFAULT_FONT_SIZE },
  { name: "grand", size: DEFAULT_FONT_SIZE + 5 },
  { name: "plus grand", size: DEFAULT_FONT_SIZE + 10 },
];

export const getTheme = (themeName, primaryColor) => {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      primary: !!primaryColor ? primaryColor : PaperDefaultTheme.colors.error,
      background: "#ffffff",
      background2: Colors.grey100,
      row1: Colors.grey200,
      row2: Colors.white,
      text: "#333333",
    },
    fonts,
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      background2: Colors.grey800,
      row1: Colors.grey400,
      row2: Colors.grey600,
      text: "#ffffff",
    },
    fonts,
  };

  const themes = {
    light: CustomDefaultTheme,
    dark: CustomDarkTheme,
  };

  return themes[themeName];
};
