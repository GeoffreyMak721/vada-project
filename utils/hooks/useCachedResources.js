// import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";

import {
  useGlobalPrefereces,
  useGlobalState,
} from "../../contexts/GlobalState";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { preferencesIsMounted } = useGlobalPrefereces();
  const { isLoading } = useGlobalState();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "indie-flower": require("../../assets/fonts/IndieFlower-Regular.ttf"),
          "quicksand-mono": require("../../assets/fonts/Quicksand-Regular.ttf"),
          "itim-mono": require("../../assets/fonts/Itim-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        if (!isLoading && preferencesIsMounted) {
          preferencesIsMounted && setLoadingComplete(true);
          SplashScreen.hideAsync();
        }
      }
    }

    loadResourcesAndDataAsync();
  }, [preferencesIsMounted]);

  return isLoadingComplete;
}
