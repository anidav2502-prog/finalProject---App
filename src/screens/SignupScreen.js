import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "users_db";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    if (!name.trim() || !username.trim() || !password.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const data = await AsyncStorage.getItem(USERS_KEY);
    const users = data ? JSON.parse(data) : [];

    const exists = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (exists) {
      alert("Username already exists");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      username,
      bio,
      password
    };

    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput placeholder="Full name" 
                 value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Username"
                 value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Bio"
                 value={bio} onChangeText={setBio} style={styles.input} />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

     

      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    justifyContent: "center" 
  },
  title: { 
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
   },
  input: {
     borderWidth: 1,
     borderRadius: 8,
     padding: 12,
     marginBottom: 15
  },
  button: {
     backgroundColor: "#de375e",
     padding: 15, 
     borderRadius: 8,
     alignItems: "center" 
    },
  buttonText: { 
    color: "white",
    fontWeight: "bold" },
  link: { 
    marginTop: 20,
    textAlign: "center" },

});