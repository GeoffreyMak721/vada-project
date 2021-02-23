import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { ThemeProvider } from "styled-components/native";

import StackNavigator from "./navigation/StackNavigator";
import useThemeMode from "./utils/hooks/useThemeMode";
import useCachedResources from "./utils/hooks/useCachedResources";

import { store } from "./redux/store";

export default function App() {
  const theme = useThemeMode();
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <AppLoading />;
  }

  return (
    <ReduxProvider store={store}>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <SafeAreaView style={styles.container}>
              <ImageBackground
                style={{ flex: 1 }}
                source={require("./assets/images/bg.png")}
              >
                <StackNavigator />
              </ImageBackground>
            </SafeAreaView>
          </ThemeProvider>
        </PaperProvider>
        <StatusBar style="light" />
      </NavigationContainer>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
