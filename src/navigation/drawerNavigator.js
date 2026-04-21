import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainStackNavigator } from "./stackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerActiveTintColor: "white",
      drawerActiveBackgroundColor: "#FF6347",
      drawerStyle: { width: "70%" },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" size={24} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;