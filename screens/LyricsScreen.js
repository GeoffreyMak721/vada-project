import React, { useState, useRef } from "react";
import { Platform, Dimensions, StatusBar } from "react-native";
import { List, Appbar, Menu } from "react-native-paper";
import { FlatList } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

import data from "../data/data.json";

const keyExtractor = (item) => item.id;

const renderItem = (navigation) => ({ item }) => (
  <List.Item
    title={item.title}
    description={item.lyrics}
    left={(props) => <List.Icon {...props} icon="music" />}
    onPress={() => navigation.navigate("LyricsDetail", { item })}
    descriptionNumberOfLines={1}
  />
);
const LyricsScreen = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef();
  const { navigation } = props;

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Cantiques" />
        <Appbar.Action
          icon="star"
          onPress={() => navigation.navigate("Favoris")}
        />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={toggleMenu} />
      </Appbar.Header>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem(navigation)}
      />
      <Menu
        visible={openMenu}
        onDismiss={toggleMenu}
        anchor={{
          x: Math.round(Dimensions.get("window").width),
          y: StatusBar.currentHeight,
        }}
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </>
  );
};

export default LyricsScreen;
