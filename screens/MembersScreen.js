import React from "react";
import { Appbar, Surface, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import MembersForm from "../components/MembersForm";
import DismissKeyboard from "../components/DismissKeyboard";

import { connect } from "react-redux";
import {
  addMember,
  removeMemberUpdate,
  updateMember,
} from "../redux/actions/membersActions";

function MembersScreen(props) {
  const {
    addMember,
    addingState,
    updatedMember,
    updateMember,
    removeMemberUpdate,
  } = props;
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content
          title={!!updatedMember ? "Modifier un Membre" : "Ajout des membres"}
        />
      </Appbar.Header>
      <DismissKeyboard>
        <Surface style={{ flex: 1 }}>
          <MembersForm
            navigation={props.navigation}
            onAdd={addMember}
            onUpdate={updateMember}
            addingState={addingState}
            updatedMember={updatedMember}
            removeMemberUpdate={removeMemberUpdate}
          />
        </Surface>
      </DismissKeyboard>
    </>
  );
}

const mapStateToProps = (state) => ({
  addingState: state.members.adding,
  updatedMember: state.members.updatedMember,
});

export default connect(mapStateToProps, {
  addMember,
  updateMember,
  removeMemberUpdate,
})(MembersScreen);
