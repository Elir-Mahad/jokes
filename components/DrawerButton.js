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
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//
const DrawerButton = (props) => {
  //!--------------------------------Get api data & send push notficiation

  const [jokeSetup, setJokeSetup] = useState("");
  const [jokeDelivery, setJokeDelivery] = useState("");
  //
  const getJoke = () => {
    Axios.get("https://v2.jokeapi.dev/joke/any?type=twopart").then(
      (response) => {
        setJokeSetup(response.data.setup);
        setJokeDelivery(response.data.delivery);
      }
    );
  };
  //
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //
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
