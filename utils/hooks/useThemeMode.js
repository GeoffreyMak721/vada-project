import { useMemo } from "react";
import { getTheme } from "../themes";
import { useGlobalPrefereces } from "../../contexts/GlobalState";

const DEFAULT_THEME = "light";

export default function useThemeMode() {
  const { themeName, primaryColor } = useGlobalPrefereces();
  return useMemo(
    () =>
      !!themeName
        ? getTheme(themeName, primaryColor)
        : getTheme(DEFAULT_THEME, primaryColor),
    [themeName, primaryColor]
  );
}
