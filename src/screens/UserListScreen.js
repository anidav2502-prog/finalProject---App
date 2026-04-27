import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users_db";
const CURRENT_USER_KEY = "current_user";
import UserDetails from "../components/UserDetails";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const usersData = await AsyncStorage.getItem(USERS_KEY);
    const current = await AsyncStorage.getItem(CURRENT_USER_KEY);

    if (usersData) setUsers(JSON.parse(usersData));
    if (current) setCurrentUser(JSON.parse(current));
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.header}>List of chats</Text>

      <FlatList
        data={users.filter(u => u.id !== currentUser?.id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chats", {
          otherUser: item.id,
          name: item.name
        })
      }
    >
      <UserDetails
        name={item.name}
        desc={`@${item.username}`}
        image={
          item.avatar
            ? item.avatar
            : require("../../assets/projekatpfp.webp")
        }
      />
    </TouchableOpacity>
  )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: "#e8a0b1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
    width: 100,
    alignSelf: "center",
    marginTop: 10
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 40,
  },
});