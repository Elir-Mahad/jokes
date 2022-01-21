import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";

const Tab = createBottomTabNavigator();

const TabsNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab 1" component={Tab1} />
      <Tab.Screen name="Tab 2" component={Tab2} />
    </Tab.Navigator>
  );
};

export default TabsNav;
