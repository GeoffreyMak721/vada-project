import React, { useState, useEffect } from "react";

import { ScrollView, Dimensions } from "react-native";
import {
  Dialog,
  Portal,
  Button,
  RadioButton,
  Searchbar,
  useTheme,
  List,
  Avatar,
} from "react-native-paper";

const MembersDialog = ({
  visible,
  onDismiss,
  members,
  navigation,
  dialogType,
  setMemberUpdate,
}) => {
  const [value, setValue] = useState("");
  const [cleanedMembers, setCleanedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!!members && searchQuery.trim() !== "") {
      const cleanedMembers = members.filter((member) =>
        member.nom.includes(searchQuery)
      );

      setCleanedMembers(cleanedMembers);
      return;
    }
    setCleanedMembers(members);
  }, [searchQuery, members]);

  const onValueChange = (value) => {
    setValue(value);
  };

  const onMemberClick = (member) => {
    if (dialogType === "update") {
      setMemberUpdate(member);
      navigation.navigate("Members");
    } else {
      navigation.navigate("Transaction", { member });
    }
    onDismiss();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ flex: 1 }}>
        <Dialog.Title style={{ color: theme.colors.primary }}>
          Choisir un membres
        </Dialog.Title>
        {/* <Dialog.Content> */}
        <Dialog.ScrollArea
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: theme.colors.background2,
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <ScrollView>
            <RadioButton.Group onValueChange={onValueChange} value={value}>
              {!!cleanedMembers &&
                cleanedMembers.map((member) => (
                  <List.Item
                    onPress={() => {
                      onMemberClick(member);
                    }}
                    key={member.code}
                    title={member.nom}
                    description={member.telephone}
                    left={(props) => (
                      <Avatar.Icon
                        style={{ marginTop: 10, marginRight: 10 }}
                        size={40}
                        icon="account"
                      />
                    )}
                  />
                ))}
            </RadioButton.Group>
          </ScrollView>
        </Dialog.ScrollArea>
        {/* </Dialog.Content> */}

        <Dialog.Actions>
          <Button onPress={onDismiss}>ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MembersDialog;
