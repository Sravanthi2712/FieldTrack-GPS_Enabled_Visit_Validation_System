import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

export default function CustomerScreen() {

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
        style={styles.input}
      />

      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        style={styles.input}
      />

      <Button
        title="Create Customer"
        onPress={() => {}}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});