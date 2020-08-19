import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  roundness: 2,
};

import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
}
