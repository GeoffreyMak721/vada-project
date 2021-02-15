import React, { useState } from "react";
import {
  Surface,
  Appbar,
  Paragraph,
  Text,
  Colors,
  Button,
  Dialog,
  Portal,
  Snackbar,
  Menu,
} from "react-native-paper";

import {
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  // Text,
} from "react-native";

import {
  useGlobalCallback,
  useGlobalPrefereces,
} from "../contexts/GlobalState";

import SizeDialog from "../components/SizeDialog";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const LyricsDetailScreen = (props) => {
  const { navigation, route } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openSizeDialog, setOpenSizeDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { toggleToFavoris, isFavoris } = useGlobalCallback();
  const { fontSize } = useGlobalPrefereces();

  const { item } = route.params;
  const favorisIcon = isFavoris(item.id) ? "star" : "star-outline";

  const showDialog = () => setOpenDialog(true);
  const hideDialog = () => setOpenDialog(false);
  const showSizeDialog = () => setOpenSizeDialog(true);
  const hideSizeDialog = () => setOpenSizeDialog(false);
  const showSnackBar = () => setOpenSnackBar(true);
  const hideSnackBar = () => setOpenSnackBar(false);
  const showMenu = () => setOpenMenu(true);
  const hideMenu = () => setOpenMenu(false);

  const handleFavorisClick = () => {
    showSnackBar();
    toggleToFavoris(item.id);
  };

  const onMenuItemPress = (action) => () => {
    hideMenu();
    action();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          titleStyle={{ textTransform: "capitalize" }}
          onPress={showDialog}
          title={item.title}
          subtitle={item.artist}
        />
        <Appbar.Action
          color={Colors.yellow500}
          icon={favorisIcon}
          onPress={handleFavorisClick}
        />
        <Appbar.Action icon={MORE_ICON} onPress={showMenu} />
      </Appbar.Header>
      <Surface style={styles.scrollView}>
        <ScrollView style={styles.scrollView}>
          <Text
            style={{
              ...styles.paragraph,
              fontSize,
            }}
          >
            {item.lyrics}
          </Text>
        </ScrollView>
      </Surface>

      <Portal>
        <Dialog visible={openDialog} onDismiss={hideDialog}>
          <Dialog.Title>{item.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{item.artist}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={openSnackBar} onDismiss={hideSnackBar}>
        {isFavoris(item.id) ? "Ajouter aux favoris" : "Enlever aux favoris"}
      </Snackbar>

      <Menu
        visible={openMenu}
        onDismiss={hideMenu}
        anchor={{
          x: Math.round(Dimensions.get("window").width),
          y: StatusBar.currentHeight,
        }}
      >
        <Menu.Item
          onPress={onMenuItemPress(showSizeDialog)}
          title="Taille de Police"
        />
        <Menu.Item
          onPress={onMenuItemPress(() => navigation.navigate("Setting"))}
          title="Paramètres"
        />
      </Menu>

      <SizeDialog visible={openSizeDialog} onDismiss={hideSizeDialog} />
    </>
  );
};

export default LyricsDetailScreen;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
  },
  paragraph: {
    textAlign: "center",
    padding: 20,
    // fontFamily: "indie-flower",
    fontFamily: "itim-mono",
    // fontFamily: "josefin-slab",
    // fontFamily: "montserrat-mono",
    // fontWeight: "200",
    // fontStyle: "italic",
  },
  scrollView: {
    flex: 1,
  },
});
