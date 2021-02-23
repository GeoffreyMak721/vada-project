import React, { useState } from "react";

import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { Headline, useTheme, Colors } from "react-native-paper";

import { setAdminUpdate } from "../../redux/actions/adminActions";

import CardButton from "../CardButton";
import ManageDialog from "../ManageDialog";
import AdminDialog from "../AdminDialog";
import MembersDialog from "../MembersDialog";

import { htmlContent, generateTable } from "../../utils/createPdf";

const MainMenu = ({
  navigation,
  admin,
  admins,
  members,
  onOpenMemberDialog,
  setAdminUpdate,
}) => {
  const [openAdminsDialog, setOpenAdminsDialog] = useState(false);
  const [openAdminManageDialog, setOpenAdminManageDialog] = useState(false);
  const [openMembersManageDialog, setOpenMembersManageDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const theme = useTheme();

  return (
    <View>
      <Headline
        style={{
          marginLeft: 20,
          marginTop: 10,
          color: theme.colors.primary,
        }}
      >
        Menu
      </Headline>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 0 }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {admin && admin.attribut === "A1" && (
            <CardButton
              title="Gestion Administrateur"
              icon="shield-account-outline"
              onPress={() => {
                setOpenAdminManageDialog(true);
              }}
              background={Colors.purple500}
              iconBackground={Colors.purple300}
            />
          )}
          <CardButton
            title="Gestion Membres"
            icon="account-group-outline"
            onPress={() => setOpenMembersManageDialog(true)}
            background={Colors.green500}
            iconBackground={Colors.green300}
          />
          <CardButton
            title="Transaction"
            icon="bank-transfer"
            onPress={() => setOpenMembersDialog(true)}
            background={Colors.brown500}
            iconBackground={Colors.brown300}
          />

          {admin && (admin.attribut === "A1" || admin.attribut === "A2") && (
            <CardButton
              title="Rapports"
              icon="file-document-box"
              onPress={async () => {
                const uri = await generateTable(members);
                navigation.navigate("Report", { pdfUri: uri });
              }}
              background={Colors.pink500}
              iconBackground={Colors.pink300}
            />
          )}
        </View>
      </ScrollView>

      <AdminDialog
        visible={openAdminsDialog}
        onDismiss={() => setOpenAdminsDialog(false)}
        admins={admins}
        navigation={navigation}
        setAdminUpdate={setAdminUpdate}
      />

      <MembersDialog
        visible={openMembersDialog}
        onDismiss={() => setOpenMembersDialog(false)}
        members={members}
        navigation={navigation}
      />

      <ManageDialog
        visible={openAdminManageDialog}
        onDismiss={() => setOpenAdminManageDialog(false)}
        title="Gestion Administrateur"
        options={[
          {
            title: "Ajouter un Administrateur",
            icon: "account-plus",
            onPress: () => navigation.navigate("Admin", { oldAdmin: null }),
          },
          {
            title: "Modifier un Administrateur",
            icon: "account-edit",
            onPress: () => setOpenAdminsDialog(true),
          },
        ]}
      />

      <ManageDialog
        visible={openMembersManageDialog}
        onDismiss={() => setOpenMembersManageDialog(false)}
        title="Gestion Membres"
        options={[
          {
            title: "Ajouter un Membre",
            icon: "account-multiple-plus",
            onPress: () => navigation.navigate("Members"),
          },
          {
            title: "Modifier un Membre",
            icon: "account-edit",
            onPress: () => onOpenMemberDialog("update"),
          },
        ]}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin.data,
  admins: state.admin.list,
  updatedAdmin: state.admin.updatedAdmin,
  members: state.members.data,
});

export default connect(mapStateToProps, {
  setAdminUpdate,
})(MainMenu);
