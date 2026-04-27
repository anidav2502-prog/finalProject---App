import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users_db";
const CURRENT_USER_KEY = "current_user";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const data = await AsyncStorage.getItem(USERS_KEY);
    const users = data ? JSON.parse(data) : [];

    const user = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      alert("Invalid username or password");
      return;
    }

    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    navigation.replace("UsersList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

    

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#de375e", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  link: { marginTop: 20, textAlign: "center" },
});