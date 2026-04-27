import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "messages_db";
const CURRENT_USER_KEY = "current_user";

const ChatsScreen = ({ route }) => {
  const { otherUser, name } = route.params;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
    const storedMessages = await AsyncStorage.getItem(STORAGE_KEY);

    if (!userData) return;

    const user = JSON.parse(userData);
    setCurrentUser(user);

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = async (newMessages) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
  };

  const sendMessage = () => {
    if (!input.trim() || !currentUser) return;

    const newMsg = {
      id: Date.now().toString(),
      text: input,
      sender: currentUser.id,
      receiver: otherUser,
      timestamp: Date.now(),
      status: "sent"
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(updated);
    setInput("");

    setTimeout(() => updateStatus(newMsg.id, "delivered"), 1000);
  };

  const updateStatus = (id, status) => {
    setMessages((prev) => {
      const updated = prev.map((msg) =>
        msg.id === id ? { ...msg, status } : msg
      );

      saveMessages(updated);
      return updated;
    });
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === currentUser?.id && msg.receiver === otherUser) ||
      (msg.sender === otherUser && msg.receiver === currentUser?.id)
  );

  const renderItem = ({ item }) => {
    const isMine = item.sender === currentUser?.id;
    const time = new Date(item.timestamp).toLocaleTimeString();

    return (
      <View
        style={[
          styles.msg,
          isMine ? styles.myMsg : styles.otherMsg
        ]}
      >
        <Text>{item.text}</Text>
        <Text style={styles.meta}>
          {time} • {item.status}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10
  },
  msg: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    maxWidth: "70%"
  },
  myMsg: {
    backgroundColor: "#e8a0b1",
    alignSelf: "flex-end"
  },
  otherMsg: {
    backgroundColor: "#eee",
    alignSelf: "flex-start"
  },
  meta: {
    fontSize: 10,
    marginTop: 5
  },
  sendBtn: {
    backgroundColor: "#de375e",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    paddingBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
    borderColor: "black",
    borderRadius: 5,
  }
});

export default ChatsScreen;