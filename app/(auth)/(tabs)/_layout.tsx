import { Tabs, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="setting"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerTitle: "Setting",
          headerShadowVisible: false,
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Search setting",
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
