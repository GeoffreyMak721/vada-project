import React from "react";
import { View, Dimensions } from "react-native";
import {
  Card,
  Headline,
  Avatar,
  Button,
  TouchableRipple,
  Colors,
  Subheading,
  Paragraph,
} from "react-native-paper";

const buttonSize = Dimensions.get("window").width / 2 - 30;

const CardButton = (props) => {
  const { title, icon, onPress, background, iconBackground } = props;
  return (
    <Card
      style={{
        backgroundColor: background || Colors.orange200,
        borderRadius: 10,
        overflow: "hidden",
        width: buttonSize * 1.5,
        height: buttonSize + 30,
        margin: 10,
      }}
    >
      <TouchableRipple onPress={onPress} style={{ flex: 1 }}>
        <View
          style={{
            padding: 20,
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Avatar.Icon
            icon={icon}
            backgroundColor={iconBackground || Colors.orange300}
          />
          <Subheading style={{ color: "#fff" }}>{title}</Subheading>
        </View>
      </TouchableRipple>
    </Card>
  );
};

export default CardButton;
