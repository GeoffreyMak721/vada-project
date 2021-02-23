import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import PDFReader from "rn-pdf-reader-js";
import Pdf from "react-native-pdf";

import { Appbar, Surface, useTheme } from "react-native-paper";

const ReportScreen = (props) => {
  const { navigation, route } = props;
  const { pdfUri } = route.params;
  const theme = useTheme();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Rapport" />
      </Appbar.Header>

      <PDFReader source={{ uri: pdfUri }} />
    </>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
  },
});
