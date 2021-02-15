import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { DrawerContentScrollView } from "@react-navigation/drawer";

// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useGlobalPrefereces } from "../../contexts/GlobalState";

import ColorsDialog from "../ColorsDialog";

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const { toggleTheme } = useGlobalPrefereces();
  const [openColorDialog, setOpenColorDialog] = useState(false);

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Icon
                  // source={{
                  //   uri:
                  //     "https://api.adorable.io/avatars/50/abott@adorable.png",
                  // }}
                  icon="music"
                  size={50}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>Kunga App</Title>
                  <Caption style={styles.caption}>version: 1.0</Caption>
                </View>
              </View>

              {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
            </View>

            <Drawer.Section style={styles.drawerSection}>
              <Drawer.Item
                icon="home-outline"
                label="Accueil"
                onPress={() => props.navigation.navigate("Lyrics")}
              />
              <Drawer.Item
                icon="star-outline"
                label="Favoris"
                onPress={() => props.navigation.navigate("Favoris")}
              />

              <Drawer.Item
                icon="settings-outline"
                label="Paramètres"
                onPress={() => props.navigation.navigate("Setting")}
              />
            </Drawer.Section>
            <Drawer.Section title="Preferences">
              <Drawer.Item
                icon="palette-outline"
                label="Couleur Principale"
                onPress={() => setOpenColorDialog(true)}
              />

              <TouchableRipple onPress={toggleTheme}>
                <View style={styles.preference}>
                  <Text>Mode Sombre</Text>
                  <View pointerEvents="none">
                    <Switch value={paperTheme.dark} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <Drawer.Item
            icon="information-outline"
            label="A propos"
            onPress={() => props.navigation.navigate("About")}
          />
        </Drawer.Section>
      </View>
      <ColorsDialog
        visible={openColorDialog}
        onDismiss={() => setOpenColorDialog(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: -1,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
