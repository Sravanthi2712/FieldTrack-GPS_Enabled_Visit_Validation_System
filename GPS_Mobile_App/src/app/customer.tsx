import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { BASE_URL } from "../../config";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
} from "react-native";

export default function CustomerScreen() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getCurrentLocation = async () => {
    console.log("Function Started");
    Alert.alert("Function Started");
    
    try {
      // Check GPS
      const enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        Alert.alert("Error", "Please turn on GPS");
        return;
      }

      // Request permission
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required."
        );
        return;
      }

      // Get location
      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
      Alert.alert(
        "Location Found",
        `${location.coords.latitude}, ${location.coords.longitude}`
      );

      const lat =
        location.coords.latitude.toString();

      const lng =
        location.coords.longitude.toString();

      setLatitude(lat);
      setLongitude(lng);

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Unable to get current location."
      );
    }
  };

  const createCustomer = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/customers/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Customer created successfully",
      });

      setName("");
      setLatitude("");
      setLongitude("");
    } else {
      const errorMessage = Object.entries(data)
    .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
    .join(" | ");

  Toast.show({
    type: "error",
    text1: "Validation Error",
    text2: errorMessage,
  });

  return;
    }
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Could not connect to server"
    );
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
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
        onPress={() => {
          console.log("Button Clicked");
          Alert.alert("Button Clicked");
          getCurrentLocation();
        }}
      />

      <Button
        title="Create Customer"
        onPress={createCustomer}
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
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
  },
});