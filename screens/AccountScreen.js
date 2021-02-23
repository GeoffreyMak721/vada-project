import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Appbar, Card, useTheme } from "react-native-paper";

import Layout from "../components/Layout";
import ProfilCard from "../components/ProfilCard";

const AccountScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mon Compte" />
      </Appbar.Header>

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background2 }}
      >
        <Layout>
          <ProfilCard />
        </Layout>
      </ScrollView>
    </>
  );
};

export default AccountScreen;
