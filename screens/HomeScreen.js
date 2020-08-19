import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Appbar } from "react-native-paper";
import { Platform } from "react-native";

import LyricsScreen from "./LyricsScreen";
import FavorisScreen from "./FavorisScreen";

const Tab = createMaterialBottomTabNavigator();

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lyrics" component={LyricsScreen} />
      <Tab.Screen name="Favoris" component={FavorisScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
