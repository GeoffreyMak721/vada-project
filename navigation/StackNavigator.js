import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LyricsDetailScreen from "../screens/LyricsDetailScreen";
import FavorisScreen from "../screens/FavorisScreen";
import LyricsScreen from "../screens/LyricsScreen";
import HomeScreen from "../screens/HomeScreen";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

import { Appbar } from "react-native-paper";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lyrics"
        options={{
          headerShown: false,
        }}
        component={LyricsScreen}
      />
      <Stack.Screen
        name="Favoris"
        options={{
          headerShown: false,
        }}
        component={FavorisScreen}
      />

      <Stack.Screen
        name="LyricsDetail"
        options={{
          headerShown: false,
        }}
        component={LyricsDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
