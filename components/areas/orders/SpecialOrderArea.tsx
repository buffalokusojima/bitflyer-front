import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { Picker } from "@react-native-community/picker";

import SelectDropdown from "react-native-select-dropdown";

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
  const [selectedOrder, setSelectedOrder] = React.useState();

  const ordertypes = ["IFDBUY", "IFDSELL", "STOP", "IFDOCOBUY", "IFDOCOSELL"];

  return (
    <>
      <Alert content={alertMessage} />
      <BaseOrderArea>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.heading}>Special Order</Text>
          {Platform.OS === "ios" ? (
            <SelectDropdown
              data={ordertypes}
              onSelect={(selectedItem, index) => {
                setSelectedOrder(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          ) : (
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
          )}

          {/* <View style={styles.picker}>
          <Picker
            selectedValue={selectedOrder}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedOrder(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          {/* </View> */}
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
