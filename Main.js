import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import { StyleSheet, SafeAreaView } from "react-native";

import DrawerNavigator from "./navigation/DrawerNavigator";
import useThemeMode from "./utils/hooks/useThemeMode";
import useCachedResources from "./utils/hooks/useCachedResources";

export default function App() {
  const theme = useThemeMode();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <DrawerNavigator />
        </SafeAreaView>
      </PaperProvider>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
