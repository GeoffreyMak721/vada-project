import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import LyricsDetailScreen from "../screens/LyricsDetailScreen";
import FavorisScreen from "../screens/FavorisScreen";
import LyricsScreen from "../screens/LyricsScreen";
import SettingScreen from "../screens/SettingScreen";
import AboutScreen from "../screens/AboutScreen";

import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Lyrics"
        options={{
          headerShown: false,
        }}
        component={LyricsScreen}
      />
      <Drawer.Screen
        name="Favoris"
        options={{
          headerShown: false,
        }}
        component={FavorisScreen}
      />

      <Drawer.Screen
        name="LyricsDetail"
        options={{
          headerShown: false,
        }}
        component={LyricsDetailScreen}
      />

      <Drawer.Screen
        name="Setting"
        options={{
          headerShown: false,
        }}
        component={SettingScreen}
      />

      <Drawer.Screen
        name="About"
        options={{
          headerShown: false,
        }}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
