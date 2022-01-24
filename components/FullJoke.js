import React from "react";
import { View, Text } from "react-native";

const FullJoke = ({ route }) => {
  const setUpText = route.params.set;
  const punchLineText = route.params.del;
  return (
    <View>
      <Text>Full joke</Text>
    </View>
  );
};

export default FullJoke;
