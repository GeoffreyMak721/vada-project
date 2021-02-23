import React from "react";
import { Appbar, Surface, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import LoginForm from "../components/LoginForm";
import DismissKeyboard from "../components/DismissKeyboard";

import { connect } from "react-redux";
import { loginAdmin } from "../redux/actions/loginActions";

function LoginScreen(props) {
  const { login, loginAdmin } = props;
  return (
    <DismissKeyboard>
      <Surface style={{ flex: 1 }}>
        <LoginForm
          navigation={props.navigation}
          loginState={login}
          onLogin={loginAdmin}
        />
      </Surface>
    </DismissKeyboard>
  );
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, {
  loginAdmin,
})(LoginScreen);
