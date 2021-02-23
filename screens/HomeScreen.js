import React, { useEffect, useState, memo, useCallback } from "react";
import { ScrollView } from "react-native";

import { connect } from "react-redux";
import {
  watchMembersData,
  setMemberUpdate,
} from "../redux/actions/membersActions";
import { watchAdminsData } from "../redux/actions/adminActions";
import { logoutAdmin } from "../redux/actions/loginActions";

import { Appbar, FAB, useTheme, Colors } from "react-native-paper";

import Layout from "../components/Layout";
import MembersDialog from "../components/MembersDialog";
import Table from "../components/Table";
import MainMenu from "../components/MainMenu";

const ITEM_PER_PAGE = 4;

const HomeScreen = memo((props) => {
  const {
    navigation,
    members,
    admin,
    watchMembersData,
    watchAdminsData,
    setMemberUpdate,
    logoutAdmin,
  } = props;

  useEffect(() => {
    watchMembersData();
    watchAdminsData(admin);
  }, [admin]);

  const theme = useTheme();
  const [state, setState] = useState({ open: false });
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const onStateChange = ({ open }) => setState({ open });

  const onOpenMemberDialog = (dialogType = "transaction") => {
    setDialogType(dialogType);
    setOpenMembersDialog(true);
  };

  const getFabActions = useCallback(() => {
    if (admin && admin.attribut === "A1") {
      return [
        {
          icon: "account-plus",
          label: "Ajout des Administrateurs",
          style: { backgroundColor: Colors.teal500 },
          onPress: () =>
            navigation.navigate("Admin", { adminType: "collector" }),
        },

        {
          icon: "account-multiple-plus",
          label: "Ajout des Membres",
          style: { backgroundColor: Colors.green600 },
          onPress: () => navigation.navigate("Members"),
        },
        {
          icon: "bank-transfer",
          label: "Transactions",
          style: { backgroundColor: Colors.red500 },
          onPress: onOpenMemberDialog,
        },
      ];
    }
    return [
      {
        icon: "account-multiple-plus",
        label: "Ajout des membres",
        style: { backgroundColor: Colors.green600 },
        onPress: () => navigation.navigate("Members"),
      },
      {
        icon: "bank-transfer",
        label: "Transactions",
        style: { backgroundColor: Colors.red500 },
        onPress: onOpenMemberDialog,
      },
    ];
  }, [admin]);

  const { open } = state;

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title="Accueil" />
        <Appbar.Action icon={"exit-to-app"} onPress={logoutAdmin} />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background2,
        }}
      >
        <MainMenu
          navigation={navigation}
          onOpenMemberDialog={onOpenMemberDialog}
        />
        <Layout style={{ paddingBottom: 80 }}>
          <Table
            title="Membres"
            headerBackground={Colors.green500}
            colomns={[
              { field: "nom", label: "Nom" },
              { field: "adresse", label: "Adresse" },
              { field: "telephone", label: "Téléphone" },
            ]}
            rows={members}
            itemsPerPage={ITEM_PER_PAGE}
          />
        </Layout>
      </ScrollView>

      <FAB.Group
        fabStyle={{ backgroundColor: theme.colors.primary }}
        color="#fff"
        open={open}
        icon={open ? "close" : "plus"}
        actions={getFabActions()}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />

      <MembersDialog
        visible={openMembersDialog}
        dialogType={dialogType}
        setMemberUpdate={setMemberUpdate}
        onDismiss={() => setOpenMembersDialog(false)}
        members={members}
        navigation={navigation}
      />
    </>
  );
});

const mapStateToProps = (state) => ({
  admin: state.admin.data,
  members: state.members.data,
});

export default connect(mapStateToProps, {
  watchMembersData,
  watchAdminsData,
  logoutAdmin,
  setMemberUpdate,
})(HomeScreen);
