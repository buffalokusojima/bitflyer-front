import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { OrderBuyButton, OrderSellButton } from "../buttons/Button";

import { handleNumericInput } from "../../functions/utils";

import { submitOrder, submitAutoOrder } from "../../utils/API/order";

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    width: 150,
    padding: 15,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 20,
  },
});

interface OrderProps {
  setAlert: void;
}

export const LimitOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "FX_BTC_JPY",
      type: "LIMIT",
      size: num,
      price: price,
      side: "BUY",
    };

    submitOrder(handleAlert, data);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const data = {
      coin_pair: "FX_BTC_JPY",
      type: "LIMIT",
      size: num,
      price: price,
      side: "SELL",
    };

    submitOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>Limit Order</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={price}
        onChangeText={(e) => {
          handleNumericInput(setPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={num}
        onChangeText={(e) => {
          handleNumericInput(setNum, e);
        }}
      />
      <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
          <OrderSellButton func={submitSellOrder} />
        </View>
      </View>
    </View>
  );
};

export const MarketOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [num, setNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!num) return;

    const data = {
      coin_pair: "FX_BTC_JPY",
      type: "MARKET",
      size: num,
      side: "BUY",
    };

    submitOrder(handleAlert, data);
  };

  const submitSellOrder = () => {
    if (!num) return;

    const data = {
      coin_pair: "FX_BTC_JPY",
      type: "MARKET",
      size: num,
      side: "SELL",
    };

    submitOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>Market Order</Text>
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={num}
        onChangeText={(e) => {
          handleNumericInput(setNum, e);
        }}
      />

      <View style={{ position: "absolute", bottom: 0 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
          <OrderSellButton func={submitSellOrder} />
        </View>
      </View>
    </View>
  );
};

export const IFDBuyOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!stopBuyPrice || !stopBuyNum || !stopSellPrice || !stopSellNum) return;

    const parameters = [
      {
        type: "STOP",
        side: "BUY",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
      {
        type: "STOP",
        side: "SELL",
        price: stopSellPrice,
        size: stopSellNum,
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "IFD",
    };

    submitOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>STOP BUY</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={stopBuyPrice}
        onChangeText={(e) => {
          handleNumericInput(setStopBuyPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={stopBuyNum}
        onChangeText={(e) => {
          handleNumericInput(setStopBuyNum, e);
        }}
      />
      <Text style={styles.heading}>STOP SELL</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={stopSellPrice}
        onChangeText={(e) => {
          handleNumericInput(setStopSellPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={stopSellNum}
        onChangeText={(e) => {
          handleNumericInput(setStopSellNum, e);
        }}
      />
      <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
        </View>
      </View>
    </View>
  );
};

export const IFDSellOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [stopSellPrice, setStopSellPrice] = React.useState("0");
  const [stopSellNum, setStopSellNum] = React.useState("0");
  const [stopBuyPrice, setStopBuyPrice] = React.useState("0");
  const [stopBuyNum, setStopBuyNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!stopBuyPrice || !stopBuyNum || !stopSellPrice || !stopSellNum) return;

    const parameters = [
      {
        type: "STOP",
        side: "BUY",
        price: stopSellPrice,
        size: stopSellNum,
      },
      {
        type: "STOP",
        side: "SELL",
        price: stopBuyPrice,
        size: stopBuyNum,
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "IFD",
    };

    submitOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>STOP SELL</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={stopSellPrice}
        onChangeText={(e) => {
          handleNumericInput(setStopSellPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={stopSellNum}
        onChangeText={(e) => {
          handleNumericInput(setStopSellNum, e);
        }}
      />
      <Text style={styles.heading}>STOP BUY</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={stopBuyPrice}
        onChangeText={(e) => {
          handleNumericInput(setStopBuyPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={stopBuyNum}
        onChangeText={(e) => {
          handleNumericInput(setStopBuyNum, e);
        }}
      />
      <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
        </View>
      </View>
    </View>
  );
};

export const StopOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "BUY",
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "SIMPLE",
    };

    submitOrder(handleAlert, data);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "SELL",
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "SIMPLE",
    };

    submitOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>Limit Order</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={price}
        onChangeText={(e) => {
          handleNumericInput(setPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={num}
        onChangeText={(e) => {
          handleNumericInput(setNum, e);
        }}
      />
      <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
          <OrderSellButton func={submitSellOrder} />
        </View>
      </View>
    </View>
  );
};

export const AutoOrderForm: React.FC<OrderProps> = ({ setAlert }) => {
  const [price, setPrice] = React.useState("0");
  const [num, setNum] = React.useState("0");

  const handleAlert = (data: object) => {
    setAlert(data.message);
  };

  const submitBuyOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "BUY",
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "SIMPLE",
      mode: "insert",
      price: price,
    };

    submitAutoOrder(handleAlert, data);
  };

  const submitSellOrder = () => {
    if (!price || !num) return;

    const parameters = [
      {
        type: "STOP",
        size: num,
        price: price,
        side: "SELL",
      },
    ];

    const data = {
      coin_pair: "FX_BTC_JPY",
      parameters: parameters,
      order_method: "SIMPLE",
      mode: "insert",
      price: price,
    };

    submitAutoOrder(handleAlert, data);
  };

  return (
    <View>
      <Text style={styles.heading}>Limit Order</Text>
      <Text>price</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1000000"
        value={price}
        onChangeText={(e) => {
          handleNumericInput(setPrice, e);
        }}
      />
      <Text>num</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0.01"
        value={num}
        onChangeText={(e) => {
          handleNumericInput(setNum, e);
        }}
      />
      <View style={{ position: "absolute", bottom: 0, margin: "auto" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <OrderBuyButton func={submitBuyOrder} />
          <OrderSellButton func={submitSellOrder} />
        </View>
      </View>
    </View>
  );
};
