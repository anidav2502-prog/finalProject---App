import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "messages_db";

const ChatsScreen = ({ route }) => {
  const currentUser = "user1";
  const otherUser = route?.params?.otherUser || "user2";
  const name = route?.params?.name || "Chat";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setMessages(JSON.parse(data));
    } catch (e) {}
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (e) {}
  };

  const botReply = () => {
    const replies = [
      "Ok 👍",
      "Nice!",
      "I see",
      "Haha 😂",
      "Interesting",
      "Tell me more"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const updateStatus = (id, status) => {
    setMessages(prev => {
      const updated = prev.map(msg =>
        msg.id === id ? { ...msg, status } : msg
      );
      saveMessages(updated);
      return updated;
    });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: input,
      sender: currentUser,
      receiver: otherUser,
      timestamp: Date.now(),
      status: "sent"
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(updated);
    setInput("");

    setTimeout(() => updateStatus(newMsg.id, "delivered"), 1000);
    setTimeout(() => updateStatus(newMsg.id, "seen"), 2000);

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: botReply(),
        sender: otherUser,
        receiver: currentUser,
        timestamp: Date.now(),
        status: "seen"
      };

      const updated2 = [...updated, reply];
      setMessages(updated2);
      saveMessages(updated2);
    }, 1500);
  };

  const filteredMessages = messages.filter(
    msg =>
      (msg.sender === currentUser && msg.receiver === otherUser) ||
      (msg.sender === otherUser && msg.receiver === currentUser)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.msg,
            item.sender === currentUser ? styles.myMsg : styles.otherMsg
          ]}>
            <Text>{item.text}</Text>
            <Text style={styles.meta}>
              {new Date(item.timestamp).toLocaleTimeString()} • {item.status}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type message..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
    backgroundColor: "#de92a1",
    alignSelf: "flex-end"
  },
  otherMsg: {
    backgroundColor: "#92deaa",
    alignSelf: "flex-start"
  },
  meta: {
    fontSize: 10,
    marginTop: 5
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 10
  },
  sendBtn: {
    backgroundColor: "#e62c4e",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8
  },
  sendText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default ChatsScreen;