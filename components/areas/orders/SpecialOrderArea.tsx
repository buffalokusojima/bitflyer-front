import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import BaseOrderArea from "./BaseOrderArea";
import {
  IFDBuyOrderForm,
  IFDSellOrderForm,
  StopOrderForm,
  IFDOCOBuyOrderForm,
  IFDOCOSellOrderForm,
} from "../../forms/OrderForm";

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
            <Picker.Item label="STOP" value="STOP" />
            <Picker.Item label="IFDOCOBUY" value="IFDOCOBUY" />
            <Picker.Item label="IFDOCOSELL" value="IFDOCOSELL" />
          </Picker>
        </View>
        {selectedOrder === "IFDSELL" ? (
          <IFDSellOrderForm setAlert={setAlertMessage} />
        ) : selectedOrder === "STOP" ? (
          <StopOrderForm setAlert={setAlertMessage} />
        ) : selectedOrder === "IFDOCOBUY" ? (
          <IFDOCOBuyOrderForm setAlert={setAlertMessage} />
        ) : selectedOrder === "IFDOCOSELL" ? (
          <IFDOCOSellOrderForm setAlert={setAlertMessage} />
        ) : (
          <IFDBuyOrderForm setAlert={setAlertMessage} />
        )}
      </BaseOrderArea>
    </>
  );
};

export default SpecialOrderArea;
