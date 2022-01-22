import React from "react";
import { Button } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const DrawerButton = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        //
        title="show me a joke"
        onPress={() => alert("Link to help")}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerButton;
