import React from "react";
import { StyleSheet } from "react-native";

import { Appbar, Surface } from "react-native-paper";

const AboutScreen = (props) => {
  const { navigation, route } = props;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="A propos" />
      </Appbar.Header>

      <Surface style={styles.surface}></Surface>
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    paddingVertical: 20,
  },
});
