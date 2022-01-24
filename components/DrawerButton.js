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
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  //
  async function schedulePushNotification(jokeSetup, jokeDelivery) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: jokeSetup,
        body: jokeDelivery,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }
  //
  const sendPush = () => {
    schedulePushNotification(jokeSetup, jokeDelivery);
  };
  //
  const getJokeSendPush = () => {
    getJoke();
    sendPush();
  };

  //!------------------- User clicks push notification, gets redirected to full joke page

  const navigation = useNavigation();
  //
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  //
  useEffect(() => {
    if (lastNotificationResponse) {
      navigation.navigate("Full Joke", {
        set: jokeSetup,
        del: jokeDelivery,
      });
    }
  }, [navigation, lastNotificationResponse]);
  //
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="Show me a joke" onPress={getJokeSendPush} />
    </DrawerContentScrollView>
  );
};

export default DrawerButton;

//---  Expo push notification code from docs

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
