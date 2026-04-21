import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const stackNavigatorStyle = {
  headerStyle: {
    backgroundColor: "#384053",
  },
  headerTintColor: "white",
};

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={stackNavigatorStyle}>
    <Stack.Screen name="Chats" component={ChatsScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export { MainStackNavigator };