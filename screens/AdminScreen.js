import React from "react";
import { Appbar, Surface, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import AdminForm from "../components/AdminForm";
import DismissKeyboard from "../components/DismissKeyboard";

import { connect } from "react-redux";
import {
  addAdmin,
  updateAdmin,
  removeAdminUpdate,
} from "../redux/actions/adminActions";

function AdminScreen(props) {
  const {
    addAdmin,
    updateAdmin,
    addingState,
    updatedAdmin,
    removeAdminUpdate,
  } = props;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content
          title={
            !!updatedAdmin
              ? "Modifier un Administrateur"
              : "Ajouter un Administrateur"
          }
        />
      </Appbar.Header>
      <DismissKeyboard>
        <Surface style={{ flex: 1 }}>
          <AdminForm
            navigation={props.navigation}
            onAdd={addAdmin}
            onUpdate={updateAdmin}
            addingState={addingState}
            removeAdminUpdate={removeAdminUpdate}
          />
        </Surface>
      </DismissKeyboard>
    </>
  );
}

const mapStateToProps = (state) => ({
  addingState: state.admin.adding,
  updatedAdmin: state.admin.updatedAdmin,
});

export default connect(mapStateToProps, {
  addAdmin,
  updateAdmin,
  removeAdminUpdate,
})(AdminScreen);
