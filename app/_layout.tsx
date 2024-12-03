import { Stack, useRouter, useSegments } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log("User state changed");
      console.log(user);
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const isAuthGroup = segments[0] === "(auth)";

    if (user && !isAuthGroup) {
      router.replace("/(auth)/(tabs)/home");
    } else if (!user && isAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
