import styled from "styled-components/native";

import { Button as PaperButtom, Colors, Paragraph } from "react-native-paper";
export const Wrapper = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
`;

export const Top = styled.ImageBackground`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View`
  padding: 8px;
  border-radius: 8px;
`;
export const Bottom = styled.ImageBackground`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background-color: transparent;
`;

export const Container = styled.View`
  width: 100%;
  flex: 1;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

export const InputContainer = styled.View`
  margin: 0;
`;

export const InputLabel = styled(Paragraph)``;

export const Button = styled(PaperButtom)`
  padding: 8px;
  border-radius: 8px;
`;

export const Separator = styled.View`
  height: 30px;
`;
