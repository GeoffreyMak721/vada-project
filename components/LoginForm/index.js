import React, { useState, useEffect } from "react";
import { StatusBar, ScrollView, Dimensions } from "react-native";
import {
  HelperText,
  TextInput,
  Avatar,
  useTheme,
  Subheading,
  Headline,
} from "react-native-paper";

import * as S from "./styles";

const windowHeight = Dimensions.get("window").height;

export default function LoginForm({ navigation, onLogin, loginState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loginState.success) {
      setUsername("");
      setPassword("");
      navigation.navigate("Main");
    }
  }, [loginState]);

  const { error } = loginState;

  const handleLogin = () => {
    onLogin({ username, password });
  };

  const theme = useTheme();
  return (
    <ScrollView style={{ backgroundColor: "#eee", flex: 1 }}>
      <S.Wrapper
        style={{
          flex: 1,
          backgroundColor: theme.colors.background2,
          height: windowHeight + StatusBar.currentHeight,
        }}
      >
        <S.Top>
          <S.LogoContainer>
            <Avatar.Icon
              style={{ backgroundColor: theme.colors.background2 }}
              color={theme.colors.primary}
              size={130}
              icon="lock"
            />

            <S.LogoTitle>LOGIN</S.LogoTitle>
          </S.LogoContainer>
        </S.Top>
        <S.Bottom>
          <S.FormContainer>
            <S.InputContainer>
              <Subheading>Nom d'utilisateur </Subheading>
              <TextInput
                error={!!error.username}
                mode="outlined"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <HelperText type="error" visible={!!error.username}>
                {error.username}
              </HelperText>
            </S.InputContainer>

            <S.InputContainer>
              <Subheading>Mot de passe </Subheading>
              <TextInput
                mode="outlined"
                error={!!error.password}
                secureTextEntry={!visible}
                right={
                  <TextInput.Icon
                    icon={!visible ? "eye-outline" : "eye-off-outline"}
                    onPress={() => setVisible(!visible)}
                  />
                }
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <HelperText type="error" visible={!!error.password}>
                {error.password}
              </HelperText>
            </S.InputContainer>
          </S.FormContainer>
          <S.ButtonContainer>
            <S.Button
              mode="contained"
              onPress={handleLogin}
              loading={loginState.loading}
              disabled={loginState.loading}
            >
              S' authentifier
            </S.Button>
          </S.ButtonContainer>
        </S.Bottom>
      </S.Wrapper>
    </ScrollView>
  );
}
