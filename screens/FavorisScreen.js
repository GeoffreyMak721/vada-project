import React from "react";
import { Title } from "react-native-paper";

import { Appbar, Searchbar } from "react-native-paper";
import { Platform } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const FavorisScreen = (props) => {
  const { navigation, route } = props;
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favoris" />
        <Appbar.Action icon="star" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <Title>Lyrics Détail</Title>
    </>
  );
};

export default FavorisScreen;
