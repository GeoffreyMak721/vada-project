import React, { useState, useMemo } from "react";
import { Platform, Dimensions, StatusBar, FlatList, View } from "react-native";
import {
  List,
  Appbar,
  Menu,
  useTheme,
  Colors,
  Searchbar,
  Surface,
  RadioButton,
  Portal,
  Dialog,
  Button,
  Title,
  Chip,
  Badge,
  Text,
  Subheading,
} from "react-native-paper";

import { useGlobalState } from "../contexts/GlobalState";
import groupSongs from "../utils/groupSongs";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const LyricsScreen = (props) => {
  const { navigation } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [openSortDialog, setOpenSortDialog] = useState(false);
  const [sortValue, setSortValue] = useState("not");
  const [searchValue, setSearchValue] = useState("");
  const { songs } = useGlobalState();
  const { colors } = useTheme();

  const showMenu = () => setOpenMenu(true);
  const hideMenu = () => setOpenMenu(false);
  const showSearch = () => setSearch(true);

  const showSortDialog = () => setOpenSortDialog(true);
  const hideSortDialog = () => setOpenSortDialog(false);

  const hideSearch = () => {
    setSearch(false);
    setSearchValue("");
  };

  const onSortChange = (value) => {
    setSortValue(value);
  };

  const onMenuItemPress = (action) => () => {
    hideMenu();
    action();
  };

  const handleSearch = (text) => {
    setSearchValue(text);
  };

  const findedSongs = useMemo(() => {
    let cleanedSong = songs;
    if (!!searchValue && !!songs) {
      cleanedSong = songs.filter(
        (s) => s.title.toLowerCase().search(searchValue.toLowerCase()) !== -1
      );
    }

    if (!!cleanedSong && sortValue !== "not") {
      const [letterGroups, langGroups] = groupSongs(cleanedSong);
      return sortValue === "letter" ? letterGroups : langGroups;
    }

    return cleanedSong;
  }, [songs, sortValue, searchValue]);

  const renderItem = ({ item }) => {
    if (sortValue === "not") {
      return (
        <List.Item
          title={item.title}
          description={item.lyrics}
          left={(props) => (
            <List.Icon {...props} color={colors.primary} icon="music-circle" />
          )}
          onPress={() => navigation.navigate("LyricsDetail", { item })}
          descriptionNumberOfLines={1}
        />
      );
    } else {
      return (
        <List.Section>
          <View
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Chip>
              <Subheading style={{ textTransform: "capitalize" }}>
                {item.group}
              </Subheading>
            </Chip>
          </View>
          {item.data.map((s) => (
            <List.Item
              key={`song-${s.id}`}
              title={s.title}
              description={s.lyrics}
              left={(props) => (
                <List.Icon
                  {...props}
                  color={colors.primary}
                  icon="music-circle"
                />
              )}
              onPress={() => navigation.navigate("LyricsDetail", { item: s })}
              descriptionNumberOfLines={1}
            />
          ))}
        </List.Section>
      );
    }
  };

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
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title="Cantiques" />
          <Appbar.Action
            icon="star"
            // color={Colors.yellow500}
            onPress={() => navigation.navigate("Favoris")}
          />
          <Appbar.Action icon="magnify" onPress={showSearch} />
          <Appbar.Action icon={MORE_ICON} onPress={showMenu} />
        </Appbar.Header>
      )}
      <Surface style={{ flex: 1 }}>
        {findedSongs && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={findedSongs}
            renderItem={renderItem}
          />
        )}
      </Surface>
      <Menu
        visible={openMenu}
        onDismiss={hideMenu}
        anchor={{
          x: Math.round(Dimensions.get("window").width),
          y: StatusBar.currentHeight,
        }}
      >
        <Menu.Item
          onPress={onMenuItemPress(() => navigation.navigate("Setting"))}
          title="Paramètres"
        />
        <Menu.Item
          onPress={onMenuItemPress(showSortDialog)}
          title="Trier par"
        />
        <Menu.Item
          onPress={onMenuItemPress(() => navigation.navigate("About"))}
          title="A propos"
        />
      </Menu>

      <Portal>
        <Dialog visible={openSortDialog} onDismiss={hideSortDialog}>
          <Dialog.Title>Trier les cantiques :</Dialog.Title>
          <Dialog.ScrollArea style={{ paddingHorizontal: 10 }}>
            {/* <ScrollView> */}
            <RadioButton.Group onValueChange={onSortChange} value={sortValue}>
              <RadioButton.Item label="Aucun Trie" value="not" />
              <RadioButton.Item label="Par Lettre" value="letter" />
              <RadioButton.Item label="Par Langue" value="lang" />
            </RadioButton.Group>
            {/* </ScrollView> */}
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideSortDialog}>ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default LyricsScreen;
