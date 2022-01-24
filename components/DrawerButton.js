import React, { useState, useEffect, useRef } from "react";
import { Button, Platform } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Axios from "axios";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
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
  //  initialize the joke api useState hooks
  const getJoke = () => {
    Axios.get("https://v2.jokeapi.dev/joke/any?type=twopart").then(
      (response) => {
        setJokeSetup(response.data.setup);
        setJokeDelivery(response.data.delivery);
      }
    );
  };
  // create the getJoke function to fetch api data
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // initialize the expo notification’s useState hooks
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
  // add the expo notification’s useEffect hook
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
  // add the expo notification’s schedulePushNotification function
  // pass the api useState hooks into it
  const sendPush = () => {
    schedulePushNotification(jokeSetup, jokeDelivery);
  };
  // create the sendPush function to send push notifications
  // insert the schedulePushNotification function in it
  const getJokeSendPush = () => {
    getJoke();
    sendPush();
  };
  // create the getJokeSendPush function
  // insert the getJoke and sendPush functions in it

  //!------------------- User clicks push notification, gets redirected to full joke page

  const navigation = useNavigation();
  //
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  // add the lastNotificationResponse hook, to manage the push notification click event
  useEffect(() => {
    if (lastNotificationResponse) {
      navigation.navigate("Full Joke", {
        set: jokeSetup,
        del: jokeDelivery,
      });
    }
  }, [navigation, lastNotificationResponse]);
  // add a useEffect hook, so on notification tab, user is pushed to the FullJoke screen
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button title="Show me a joke" onPress={getJokeSendPush} />
    </DrawerContentScrollView>
  );
};

export default DrawerButton;

// add the expo notification’s registerForPushNotificationsAsync function

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
