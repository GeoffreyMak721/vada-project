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
      fontFamily: "itim-mono",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "itim-mono",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "itim-mono",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "itim-mono",
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
      primary: !!primaryColor ? primaryColor : PaperDefaultTheme.colors.primary,
      background: "#ffffff",
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
