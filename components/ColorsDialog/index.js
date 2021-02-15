import React, { useState, useEffect } from "react";

import { ScrollView, Dimensions } from "react-native";
import { Dialog, Portal, Button, RadioButton } from "react-native-paper";

import { primaryColors } from "../../utils/themes";
import { useGlobalPrefereces } from "../../contexts/GlobalState";

const ColorsDialog = ({ visible, onDismiss }) => {
  const { changePrimaryColor, primaryColor } = useGlobalPrefereces();
  const [value, setValue] = useState(primaryColor);

  useEffect(() => {
    setValue(primaryColor);
  }, [primaryColor]);

  const onValueChange = (value) => {
    // setValue(value);
    changePrimaryColor(value);
  };
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ maxHeight: Math.round(Dimensions.get("window").height) - 100 }}
      >
        <Dialog.Title>Couleur Principale</Dialog.Title>
        {/* <Dialog.Content> */}
        <Dialog.ScrollArea style={{ paddingHorizontal: 10 }}>
          <ScrollView>
            <RadioButton.Group onValueChange={onValueChange} value={value}>
              {primaryColors.map((c, i) => (
                <RadioButton.Item
                  key={i}
                  label={c.name}
                  labelStyle={{ color: c.color, textTransform: "capitalize" }}
                  value={c.color}
                  color={c.color}
                  uncheckedColor={c.color}
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

export default ColorsDialog;
