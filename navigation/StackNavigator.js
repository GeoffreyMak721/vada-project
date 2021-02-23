import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";
import HomeDrawerNavigator from "./HomeDrawerNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const loginState = useSelector((state) => state.login);
  console.log("stack");
  return (
    <Stack.Navigator>
      {!loginState.success ? (
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
      ) : (
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
          }}
          component={HomeDrawerNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
