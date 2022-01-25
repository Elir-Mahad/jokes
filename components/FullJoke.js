import React from "react";
import { View, Text } from "react-native";

const FullJoke = ({ route }) => {
  const setUpText = route.params.set;
  const punchLineText = route.params.del;
  return (
    <View>
      <Text>Full Joke</Text>
      <Text>{setUpText}</Text>
      <Text>{punchLineText}</Text>
    </View>
  );
};

export default FullJoke;
