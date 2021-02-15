import React, { useMemo, useState } from "react";

import {
  List,
  Appbar,
  IconButton,
  Colors,
  useTheme,
  Menu,
  Surface,
  Searchbar,
} from "react-native-paper";

import {
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";

import { useGlobalState, useGlobalCallback } from "../contexts/GlobalState";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const FavorisScreen = (props) => {
  const { navigation, route } = props;
  const { songs, favoris } = useGlobalState();
  const { toggleToFavoris } = useGlobalCallback();
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { colors } = useTheme();

  const hideSubMenu = () => setOpenSubMenu(false);
  const showSubMenu = (id) => () => setOpenSubMenu(id);

  const showSearch = () => setSearch(true);

  const hideSearch = () => {
    setSearch(false);
    setSearchValue("");
  };

  const handleSearch = (text) => {
    setSearchValue(text);
  };

  const data = useMemo(() => {
    if (!!favoris) {
      return favoris.map((id) => songs.find((s) => s.id === id));
    }
    return [];
  }, [songs, favoris]);

  const findedSongs = useMemo(() => {
    if (!!searchValue && !!data) {
      return data.filter(
        (s) => s.title.toLowerCase().search(searchValue.toLowerCase()) !== -1
      );
    } else {
      return data;
    }
  }, [data, searchValue]);

  const onMenuItemPress = (action) => () => {
    hideSubMenu();
    action();
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.lyrics}
      onPress={() => navigation.navigate("LyricsDetail", { item })}
      descriptionNumberOfLines={1}
      left={(props) => (
        <List.Icon {...props} color={colors.primary} icon="star-circle" />
      )}
      right={(props) => (
        <Menu
          visible={openSubMenu === item.id}
          onDismiss={hideSubMenu}
          anchor={
            <IconButton
              icon="dots-vertical"
              color={Colors.lightBlue500}
              {...props}
              size={20}
              onPress={showSubMenu(item.id)}
            />
          }
        >
          <Menu.Item
            onPress={onMenuItemPress(() => toggleToFavoris(item.id))}
            title="Supprimer"
          />
          <Menu.Item
            onPress={onMenuItemPress(() =>
              navigation.navigate("LyricsDetail", { item })
            )}
            title="Afficher"
          />
        </Menu>
      )}
    />
  );

  return (
    <>
      {search ? (
        <Appbar.Header>
          <Searchbar
            value={searchValue}
            onChangeText={handleSearch}
            icon="arrow-left"
            placeholder="Recherche"
            onIconPress={hideSearch}
            // onBlur={hideSearch}
            autoFocus
          />
        </Appbar.Header>
      ) : (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Favoris" />
          <Appbar.Action icon="magnify" onPress={showSearch} />
          {/* <Appbar.Action icon={MORE_ICON} onPress={showMenu} /> */}
        </Appbar.Header>
      )}

      <Surface style={styles.surface}>
        {findedSongs && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={findedSongs}
            renderItem={renderItem}
          />
        )}
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    flex: 1,
  },
  paragraph: {
    textAlign: "center",
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
});
export default FavorisScreen;
