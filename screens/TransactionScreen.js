import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet, Linking, View, ScrollView } from "react-native";

import {
  Appbar,
  RadioButton,
  useTheme,
  Card,
  List,
  Avatar,
  IconButton,
  Colors,
  Text,
  Button,
  TextInput,
  Divider,
} from "react-native-paper";

import moment from "moment";
import Layout from "../components/Layout";
import Table from "../components/Table";

import { connect } from "react-redux";

import {
  addTransaction,
  getTransaction,
} from "../redux/actions/transactionActions";

const ITEM_PER_PAGE = 4;

const TransactionScreen = (props) => {
  const {
    navigation,
    route,
    addTransaction,
    getTransaction,
    transactionsState,
    admin,
  } = props;

  const [montant, setMontant] = useState(null);
  const [type, setType] = useState("D");
  const { member } = route.params;
  const theme = useTheme();

  const { success, loading } = transactionsState.adding;

  const handleReset = () => {
    setMontant(null);
    setType("D");
  };

  useEffect(() => {
    getTransaction(member);
  }, [member, getTransaction]);

  useEffect(() => {
    if (success) {
      handleReset();
    }
  }, [success]);

  const transactions = useMemo(() => {
    if (
      !!transactionsState.data &&
      !!member &&
      transactionsState.data.hasOwnProperty(member.compte)
    ) {
      return transactionsState.data[member.compte];
    } else {
      return [];
    }
  }, [transactionsState, member]);

  const solde = useMemo(() => {
    let solde = 0;
    if (!!transactions && !!transactions.length) {
      const depotSomme = transactions
        .filter((t) => t.type === "D")
        .reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) + parseFloat(currentValue.montant),
          0
        );

      const retraitSomme = transactions
        .filter((t) => t.type === "R")
        .reduce(
          (accumulator, currentValue) =>
            parseFloat(accumulator) + parseFloat(currentValue.montant),
          0
        );

      solde = parseFloat(depotSomme - retraitSomme);
    }
    return solde;
  }, [transactions]);

  const _pressCall = (phone) => {
    const url = `tel://${phone}`;
    Linking.openURL(url);
  };

  const onAdd = () => {
    if (!!parseFloat(montant)) {
      const data = {
        montant: parseFloat(montant),
        type,
        date: new Date().toISOString(),
        compte: member.compte,
        code_admin: admin.code,
      };
      addTransaction(data);
    }
  };

  const getFormatedDate = (date) => moment(date).format("DD/MM/YYYY");
  const getTransactionType = (type) => (type === "D" ? "Dépot" : "Rétrait");
  const getFieldColor = (fiedlKey, field) =>
    field.type === "D" ? Colors.green500 : Colors.red500;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Transactions" />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: theme.colors.background2 }}>
        <Layout>
          <Card style={{ marginBottom: 20 }}>
            <List.Item
              onPress={() => {}}
              title={member.nom}
              description={member.telephone}
              left={(props) => (
                <Avatar.Icon
                  style={{ marginTop: 10, marginRight: 10 }}
                  size={40}
                  icon="account"
                />
              )}
              right={(props) => (
                <IconButton
                  icon="phone"
                  style={{ marginTop: 10 }}
                  color={Colors.green700}
                  onPress={() => _pressCall(member.telephone)}
                />
              )}
            />
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <Card.Title title="Transaction" />
            <Divider />
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Montant"
                value={montant}
                onChangeText={(text) => setMontant(text)}
                keyboardType="numeric"
                dense
              />
              <View style={{ marginTop: 15 }}>
                <RadioButton.Group
                  onValueChange={(type) => setType(type)}
                  value={type}
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
                      <Text style={{ marginTop: 5, color: Colors.green500 }}>
                        Dépot
                      </Text>
                      <RadioButton
                        value="D"
                        uncheckedColor={Colors.green500}
                        color={Colors.green500}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 20,
                      }}
                    >
                      <Text style={{ marginTop: 5, color: Colors.red500 }}>
                        Rétrait
                      </Text>
                      <RadioButton
                        value="R"
                        color={Colors.red500}
                        uncheckedColor={Colors.red500}
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </Card.Content>
            <Divider />
            <Card.Actions style={{ justifyContent: "flex-end" }}>
              <Button onPress={handleReset} disabled={loading}>
                Annuler
              </Button>
              <Button disabled={loading} loading={loading} onPress={onAdd}>
                Confirmer
              </Button>
            </Card.Actions>
          </Card>

          <Card>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 10,
                paddingTop: 10,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: Colors.white, fontWeight: "bold" }}>
                Solde
              </Text>
              <Text style={{ color: Colors.grey300 }}>{solde}</Text>
            </View>
          </Card>

          <Divider />

          <Table
            colomns={[
              {
                field: "date",
                label: "Date",
                transform: getFormatedDate,
                getFieldColor,
              },
              {
                field: "type",
                label: "Type",
                transform: getTransactionType,
                getFieldColor,
              },
              {
                field: "montant",
                label: "Montant",
                getFieldColor,
              },
            ]}
            rows={transactions}
            itemsPerPage={ITEM_PER_PAGE}
          />
        </Layout>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => ({
  transactionsState: state.transactions,
  admin: state.admin.data,
});

export default connect(mapStateToProps, {
  addTransaction,
  getTransaction,
})(TransactionScreen);

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 20,
  },
});
