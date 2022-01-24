import React, { useState, useEffect, useRef } from "react";
import { Button, Platform } from "react-native";
//
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
//
import Axios from "axios";
//
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
//
import { useNavigation } from "@react-navigation/native";
//
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
