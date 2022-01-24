import React from "react";
import TabsNav from "./TabsNav";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerButton from "../components/DrawerButton";
import FullJoke from "../components/FullJoke";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerButton {...props} />}
    >
      <Drawer.Screen name="Home" component={TabsNav} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
