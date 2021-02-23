import React, { useState, useEffect } from "react";

import { ScrollView } from "react-native";
import {
  Dialog,
  Portal,
  Button,
  Searchbar,
  useTheme,
  List,
  Avatar,
  Colors,
} from "react-native-paper";

import getAttribut from "../../utils/getAdminAttribut";

const AdminDialog = ({
  visible,
  onDismiss,
  admins,
  setAdminUpdate,
  navigation,
}) => {
  const [cleanedAdmins, setCleanedAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (!!admins && searchQuery.trim() !== "") {
      const cleanedAdmins = admins.filter((admin) =>
        admin.nom.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      );

      setCleanedAdmins(cleanedAdmins);
      return;
    }
    setCleanedAdmins(admins);
  }, [searchQuery, admins]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ flex: 1 }}>
        <Dialog.Title style={{ color: theme.colors.primary }}>
          Choisir un Administrateur
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
            placeholder="Recherche"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <ScrollView>
            {!!cleanedAdmins &&
              cleanedAdmins.map((admin) => (
                <List.Item
                  onPress={() => {
                    setAdminUpdate(admin);
                    onDismiss();
                    navigation.navigate("Admin");
                  }}
                  key={admin.code}
                  title={admin.nom}
                  description={getAttribut(admin.attribut)}
                  left={(props) => (
                    <Avatar.Icon
                      size={45}
                      icon="shield-account"
                      backgroundColor={
                        admin.attribut === "A2"
                          ? Colors.red500
                          : Colors.green500
                      }
                      style={{
                        borderRadius: 25,
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    />
                  )}
                />
              ))}
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

export default AdminDialog;
