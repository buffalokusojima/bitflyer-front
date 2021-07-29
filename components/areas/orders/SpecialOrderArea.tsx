import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import BaseOrderArea from "./BaseOrderArea";
import { IFDBuyOrderForm, IFDSellOrderForm, StopOrderForm } from "../../forms/OrderForm";

import Alert from "../../alerts/Alert";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
  },
});

const SpecialOrderArea: React.FC = () => {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [selectedOrder, setSelectedOrder] = React.useState("");

  return (
    <>
      <Alert content={alertMessage} />
      <BaseOrderArea>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.heading}>Special Order</Text>
          <Picker
            selectedValue={selectedOrder}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOrder(itemValue)
            }
          >
            <Picker.Item label="IFDBUY" value="IFDBUY" />
            <Picker.Item label="IFDSELL" value="IFDSELL" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 450,
            padding: 10,
            justifyContent: "center",
          }}
        >
          {selectedOrder === "IFDSELL" ? (
            <IFDSellOrderForm setAlert={setAlertMessage} />
          ) : selectedOrder === "other" ? (
            <StopOrderForm setAlert={setAlertMessage} />
          ) : (
            <IFDBuyOrderForm setAlert={setAlertMessage} />
          )}
        </View>
      </BaseOrderArea>
    </>
  );
};

export default SpecialOrderArea;
