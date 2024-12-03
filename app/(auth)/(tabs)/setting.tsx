import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

type SettingItemProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isSwitch?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
};

const SettingItem = ({
  title,
  subtitle,
  onPress,
  isSwitch = false,
  value,
  onValueChange,
}: SettingItemProps) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
    disabled={isSwitch}
  >
    <View style={styles.settingTextContainer}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {isSwitch ? (
      <Switch value={value} onValueChange={onValueChange} />
    ) : (
      <Text style={styles.chevron}>›</Text>
    )}
  </TouchableOpacity>
);

const Setting = () => {
  const user = auth().currentUser;
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingItem
            title={user?.email || "No email"}
            subtitle="Tap to edit profile"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <SettingItem
            title="Notifications"
            isSwitch={true}
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingItem
            title="Dark Mode"
            isSwitch={true}
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingItem title="Language" subtitle="English" onPress={() => {}} />
        </View>
      </View>

      {/* Help & Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <View style={styles.card}>
          <SettingItem title="Help Center" onPress={() => {}} />
          <SettingItem title="Privacy Policy" onPress={() => {}} />
          <SettingItem title="Terms of Service" onPress={() => {}} />
        </View>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => auth().signOut()}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginLeft: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#000",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  chevron: {
    fontSize: 20,
    color: "#666",
  },
  signOutButton: {
    margin: 16,
    backgroundColor: "#ff3b30",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Setting;
