import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import {
  HelperText,
  TextInput,
  Avatar,
  useTheme,
  Headline,
  Paragraph,
  Button,
  Colors,
  FAB,
  Subheading,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Layout from "../Layout";
import * as S from "./styles";

const windowHeight = Dimensions.get("window").height;
const defaultValues = {
  nom: "",
  adresse: "",
  telephone: "",
  mise: "",
  activite: "",
};

const defaultErrorValues = {
  nom: false,
  adresse: false,
  telephone: false,
  mise: false,
  activite: false,
};

export default function MembersForm({
  navigation,
  onAdd,
  onUpdate,
  addingState,
  updatedMember,
  removeMemberUpdate,
}) {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(defaultErrorValues);
  const { loading, success } = addingState;
  const admin = useSelector((state) => state.admin.data);

  const handleReset = () => {
    setValues(defaultValues);
    setError(defaultErrorValues);
    removeMemberUpdate();
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
    if (!!updatedMember) {
      setValues({
        nom: updatedMember.nom,
        adresse: updatedMember.adresse,
        telephone: updatedMember.telephone,
        mise: updatedMember.mise.toString(),
        activite: updatedMember.activite,
      });
    }
  }, [updatedMember]);

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
          errorValues = { ...errorValues, [field]: "Renseigner ce champ !" };
        }

        if (field === "mise" && !parseFloat(value)) {
          hasEmptyField = true;
          errorValues = { ...errorValues, mise: "La mise est incorrect !" };
        }
      }
    }
    setError(errorValues);
    if (!hasEmptyField && !!admin) {
      if (!updatedMember) {
        const data = {
          ...values,
          mise: parseFloat(values.mise),
          code_admin: admin.code,
        };
        onAdd(data);
      } else {
        const data = {
          ...values,
          mise: parseFloat(values.mise),
          code_admin_update: admin.code,
        };
        onUpdate(updatedMember, data);
      }
    }
  }, [values, admin, updatedMember]);

  const onChangeText = (field) => (text) => {
    setValues({ ...values, [field]: text });
  };

  const theme = useTheme();
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
                  error={!!error.nom}
                  mode="outlined"
                  label="Nom"
                  value={values.nom}
                  onChangeText={onChangeText("nom")}
                />
                <HelperText type="error" visible={!!error.nom}>
                  {error.nom}
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <TextInput
                  mode="outlined"
                  error={!!error.telephone}
                  label="Téléphone"
                  value={values.telephone}
                  keyboardType="phone-pad"
                  onChangeText={onChangeText("telephone")}
                />
                <HelperText type="error" visible={!!error.telephone}>
                  {error.telephone}
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <Subheading
                  style={{ color: theme.colors.primary, marginVertical: 10 }}
                >
                  Informations sur l'adresse
                </Subheading>

                <TextInput
                  mode="outlined"
                  error={!!error.adresse}
                  label="Adresse"
                  multiline
                  numberOfLines={5}
                  value={values.adresse}
                  onChangeText={onChangeText("adresse")}
                />
                <HelperText type="error" visible={!!error.adresse}>
                  {error.adresse}
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <Subheading
                  style={{ color: theme.colors.primary, marginVertical: 10 }}
                >
                  Autre Informations
                </Subheading>

                <TextInput
                  mode="outlined"
                  error={!!error.activite}
                  label="Activité"
                  value={values.activite}
                  onChangeText={onChangeText("activite")}
                />
                <HelperText type="error" visible={!!error.activite}>
                  {error.activite}
                </HelperText>
              </S.InputContainer>

              <S.InputContainer>
                <TextInput
                  mode="outlined"
                  error={!!error.mise}
                  label="Mise"
                  value={values.mise}
                  keyboardType="numeric"
                  onChangeText={onChangeText("mise")}
                />
                <HelperText type="error" visible={!!error.mise}>
                  {error.mise}
                </HelperText>
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
        icon={!!updatedMember ? "content-save-edit" : "content-save"}
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
