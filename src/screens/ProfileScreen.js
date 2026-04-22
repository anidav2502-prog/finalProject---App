import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <Text style={styles.name}>{user.name}</Text>
      <Text>@{user.username}</Text>

      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  bio: {
    marginTop: 10,
    textAlign: "center"
  }
});

export default ProfileScreen;