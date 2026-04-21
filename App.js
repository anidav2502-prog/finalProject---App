import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/drawerNavigator";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";

initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}