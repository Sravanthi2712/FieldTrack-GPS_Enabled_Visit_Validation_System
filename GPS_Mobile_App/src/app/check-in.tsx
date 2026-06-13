import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { BASE_URL } from "../../config";

export default function CheckInScreen() {

  const [customerId, setCustomerId] = useState("");
  const [salesRepId, setSalesRepId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getCurrentLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Location permission denied");
      return;
    }

    const location =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    setLatitude(
      location.coords.latitude.toString()
    );

    setLongitude(
      location.coords.longitude.toString()
    );
  };

  const checkIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/visits/check-in/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        customer_id: parseInt(customerId),
        sales_rep_id: parseInt(salesRepId),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      Toast.show({
        type: "success",
        text1: "Check-In Successful",
        text2: `Distance: ${data.distance} meters`,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Check-In Denied",
        text2: data.message,
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Unable to connect to server",
    });
  }
};

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
        style={styles.input}
      />

      <TextInput
        placeholder="Sales Rep ID"
        value={salesRepId}
        onChangeText={setSalesRepId}
        style={styles.input}
      />

      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        //editable={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        //editable={false}
        style={styles.input}
      />

      <Button
        title="Get Current Location"
        onPress={getCurrentLocation}
      />

      <Button
        title="Check In"
        onPress={checkIn}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});