import React from "react";
import { Surface, Appbar, Paragraph, Headline } from "react-native-paper";

import {} from "react-native-paper";
import { Platform, StyleSheet, ScrollView } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const LyricsDetailScreen = (props) => {
  const { navigation, route } = props;
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={route.params.item.title}
          subtitle={route.params.item.artist}
        />
        <Appbar.Action icon="star" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <Surface style={styles.scrollView}>
        <ScrollView style={styles.scrollView}>
          <Paragraph style={styles.paragraph}>
            {route.params.item.lyrics}
          </Paragraph>
        </ScrollView>
      </Surface>
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
  },
  scrollView: {
    flex: 1,
  },
});
