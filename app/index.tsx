import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "@firebase/app";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("User created successfully");
      })
      .catch((e: any) => {
        const errorMessage = e as FirebaseError;
        alert("Sign up failed: " + errorMessage.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async () => {
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("User signed in successfully");
      })
      .catch((e: any) => {
        const errorMessage = e as FirebaseError;
        alert("Sign in failed: " + errorMessage.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="email@example.com"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button onPress={signUp} title="Sign Up" disabled={loading} />
      <Button onPress={signIn} title="Sign In" disabled={loading} />
    </View>
  );
};

export default Index;
