import React, { useEffect, useState } from "react";
import {View,FlatList,TouchableOpacity,StyleSheet,Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserDetails from "../components/UserDetails";

const USERS_KEY = "users_db";
const MESSAGES_KEY = "messages_db";
const CURRENT_USER_KEY = "current_user";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
    const data = await AsyncStorage.getItem(USERS_KEY);

    if (userData) setCurrentUser(JSON.parse(userData));
    if (data) setUsers(JSON.parse(data));
  };

  const deleteUser = async (userId) => {
    const data = await AsyncStorage.getItem(USERS_KEY);
    let usersData = data ? JSON.parse(data) : [];

    usersData = usersData.filter((u) => u.id !== userId);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(usersData));

    const msgData = await AsyncStorage.getItem(MESSAGES_KEY);
    let messages = msgData ? JSON.parse(msgData) : [];

    messages = messages.filter(
      (msg) => msg.sender !== userId && msg.receiver !== userId
    );

    await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));

    loadUsers();
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => {
    if (item.id === currentUser?.id) return null;

    return (
      <View style={styles.wrapper}>
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
              item.avatar ||
              require("../../assets/projekatpfp.webp")
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteUser(item.id)}
          style={styles.deleteIcon}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color="red"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative"
  },
  deleteIcon: {
    position: "absolute",
    right: 35,
    top: 40
  },
  logoutBtn: {
    padding: 10,
    alignItems: "center"
  },
  logoutText: {
    color: "black",
    fontWeight: "bold"
  }
});