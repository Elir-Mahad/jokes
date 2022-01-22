import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./navigation/DrawerNav";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
