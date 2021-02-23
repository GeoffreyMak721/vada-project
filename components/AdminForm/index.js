import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import {
  HelperText,
  TextInput,
  Headline,
  useTheme,
  Subheading,
  RadioButton,
  Colors,
  FAB,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import * as S from "./styles";

const windowHeight = Dimensions.get("window").height;
const defaultValues = {
  nom: "",
  telephone: "",
  username: "",
  password: "",
};

const defaultErrorValues = {
  nom: false,
  telephone: false,
  username: false,
  password: false,
};

export default function AdminForm({
  navigation,
  onAdd,
  onUpdate,
  addingState,
  removeAdminUpdate,
}) {
  const [values, setValues] = useState(defaultValues);
  const [attribut, setAttribut] = useState("A3");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(defaultErrorValues);
  const { loading, success } = addingState;
  const { data: admin, updatedAdmin } = useSelector((state) => state.admin);
  const theme = useTheme();

  const handleReset = () => {
    setValues(defaultValues);
    setError(defaultErrorValues);
    setAttribut("A3");
    removeAdminUpdate();
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      return () => {
        handleReset();
      };
    }, [])
  );

  useEffect(() => {
    if (!!updatedAdmin) {
      setValues({
        nom: updatedAdmin.nom,
        telephone: updatedAdmin.telephone,
        username: updatedAdmin.username,
        password: updatedAdmin.password,
      });
      setAttribut(updatedAdmin.attribut);
    }
  }, [updatedAdmin]);

  useEffect(() => {
    if (success) {
      handleReset();
    }
  }, [success]);

  const handleAddOrUpdate = useCallback(() => {
    let hasEmptyField = false;
    let errorValues = defaultErrorValues;
    for (const field in values) {
      if (Object.hasOwnProperty.call(values, field)) {
        const value = values[field];
        if (!value) {
          hasEmptyField = true;
          errorValues = { ...errorValues, [field]: true };
        }
      }
    }
    setError(errorValues);

    if (!hasEmptyField && !!admin) {
      if (!updatedAdmin) {
        const data = {
          ...values,
          code_admin: admin.code,
          attribut,
        };
        onAdd(data);
      } else {
        onUpdate(updatedAdmin, values);
      }
    }
  }, [values, attribut, admin, updatedAdmin]);

  const onChangeText = (field) => (text) => {
    setValues({ ...values, [field]: text });
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background2 }}
      >
        <Layout>
          <S.Wrapper>
            <S.FormContainer>
              <Subheading
                style={{ color: theme.colors.primary, marginVertical: 10 }}
              >
                Informations Personnel
              </Subheading>

              <S.InputContainer>
                <TextInput
                  error={error.nom}
                  mode="outlined"
                  label="Nom"
                  value={values.nom}
                  onChangeText={onChangeText("nom")}
                />
                <HelperText type="error" visible={error.nom}>
                  Renseigner ce champ !
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <TextInput
                  mode="outlined"
                  error={error.telephone}
                  label="Téléphone"
                  value={values.telephone}
                  keyboardType="numeric"
                  onChangeText={onChangeText("telephone")}
                />
                <HelperText type="error" visible={error.telephone}>
                  Renseigner ce champ !
                </HelperText>
              </S.InputContainer>

              <S.Separator />
              <Subheading
                style={{ color: theme.colors.primary, marginVertical: 10 }}
              >
                Informations Confidentiel
              </Subheading>
              <S.InputContainer>
                <TextInput
                  mode="outlined"
                  error={error.username}
                  label="Nom d'utilisateur"
                  value={values.username}
                  onChangeText={onChangeText("username")}
                />
                <HelperText type="error" visible={error.username}>
                  Renseigner ce champ !
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <TextInput
                  mode="outlined"
                  error={error.password}
                  secureTextEntry={!visible}
                  right={
                    <TextInput.Icon
                      icon={!visible ? "eye-outline" : "eye-off-outline"}
                      onPress={() => setVisible(!visible)}
                    />
                  }
                  label="Mot de passe"
                  value={values.password}
                  onChangeText={onChangeText("password")}
                />
                <HelperText type="error" visible={error.password}>
                  Renseigner ce champ !
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <View style={{ marginTop: 0 }}>
                  <RadioButton.Group
                    onValueChange={(attribut) => setAttribut(attribut)}
                    value={attribut}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Subheading style={{ marginTop: 5 }}>
                          COLLECTEUR
                        </Subheading>
                        <RadioButton
                          disabled={!!updatedAdmin}
                          value="A3"
                          color={theme.colors.primary}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginLeft: 20,
                        }}
                      >
                        <Subheading style={{ marginTop: 5 }}>
                          SUPERVISEUR
                        </Subheading>
                        <RadioButton
                          disabled={!!updatedAdmin}
                          value="A2"
                          color={theme.colors.primary}
                        />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              </S.InputContainer>
            </S.FormContainer>

            <S.ButtonContainer></S.ButtonContainer>
          </S.Wrapper>
        </Layout>
      </ScrollView>
      <FAB
        icon="close"
        loading={loading}
        onPress={handleReset}
        disabled={loading}
        color={Colors.white}
        style={[
          styles.fab,
          { marginRight: 90, backgroundColor: Colors.pink500 },
        ]}
      />

      <FAB
        icon={!!updatedAdmin ? "content-save-edit" : "content-save"}
        loading={loading}
        disabled={loading}
        color={Colors.white}
        style={[styles.fab, { backgroundColor: Colors.green600 }]}
        onPress={handleAddOrUpdate}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
