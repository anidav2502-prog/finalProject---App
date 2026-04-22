import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { users } from "../data/users";

const UserListScreen = ({ navigation }) => {
  const currentUser = "user1";

  const otherUsers = users.filter((u) => u.id !== currentUser);

  return (
    <FlatList
      data={otherUsers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chats", {
              otherUser: item.id,
              username: item.username,
            })
          }
          style={{
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
            borderBottomWidth: 0.5,
          }}
        >
          <Image
            source={item.avatar}
            style={{ width: 45, height: 45, borderRadius: 25 }}
          />
          <Text style={{ marginLeft: 12, fontSize: 16 }}>
            {item.username}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default UserListScreen;