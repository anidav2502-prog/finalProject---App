import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import UserListScreen from "../screens/UserListScreen";
import ChatsScreen from "../screens/ChatsScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UsersList" component={UserListScreen} />
      <Stack.Screen name="Chats" component={ChatsScreen} />
    </Stack.Navigator>
  );
}