import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabsNav from "./navigaton/TabsNav";

export default function App() {
  return (
    <NavigationContainer>
      <TabsNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
