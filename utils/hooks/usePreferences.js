import { useEffect, useState } from "react";

import { storeData, getData } from "../storage";
import { DEFAULT_FONT_SIZE } from "../const";

export const usePreferences = () => {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("");
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [preferencesIsMounted, setPreferencesIsMounted] = useState(false);

  const setMode = (mode) => {
    storeData("theme", mode);
    setTheme(mode);
  };

  const changePrimaryColor = (color) => {
    storeData("primaryColor", color);
    setPrimaryColor(color);
  };

  const changeFonSize = (size) => {
    storeData("fontSize", size.toString());
    setFontSize(size);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const mounteTheme = async () => {
      const localTheme = await getData("theme");
      const localPrimaryColor = await getData("primaryColor");
      const localFonSize = await getData("fontSize");

      !!localTheme ? setTheme(localTheme) : setMode("light");
      !!localPrimaryColor && setPrimaryColor(localPrimaryColor);
      !!localFonSize && setFontSize(+localFonSize);

      setPreferencesIsMounted(true);
    };
    mounteTheme();
  }, []);

  return {
    themeName: theme,
    primaryColor,
    fontSize,
    toggleTheme,
    changePrimaryColor,
    changeFonSize,
    preferencesIsMounted,
  };
};
