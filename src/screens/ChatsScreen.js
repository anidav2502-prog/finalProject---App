import React from "react";
import { Text, View, StyleSheet } from "react-native";
import UserDetails from "../components/UserDetails";

const ChatsScreen = () => (
  <View>
    <Text style={styles.text}>Chats</Text>

    <UserDetails
      name="Ellie"
      image={require("../../assets/Avatar-1.jpeg")}
      desc="Lorem ipsum is a dummy text"
    />

    <UserDetails
      name="Gabriel"
      image={require("../../assets/Avatar-2.png")}
      desc="Lorem ipsum is a yummy text"
    />

    <UserDetails
      name="Kaylen"
      image={require("../../assets/Avatar-3.png")}
      desc="Lorem ipsum ist ein text"
    />
  </View>
);

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
  },
});

export default ChatsScreen;