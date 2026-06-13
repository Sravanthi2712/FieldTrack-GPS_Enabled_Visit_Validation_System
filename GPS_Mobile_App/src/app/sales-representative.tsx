import { useState } from "react";
import Toast from "react-native-toast-message"
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { BASE_URL } from "../../config";

export default function SalesRepresentativeScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createSalesRepresentative = async () => {
    try {

      const response = await fetch(
        `${BASE_URL}/sales-representatives/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Sales Representative created successfully",
        });

        setName("");
        setEmail("");
        setPassword("");

      } else {

        Alert.alert(
          "Error",
          JSON.stringify(data)
        );

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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />


      <Button
        title="Create Sales Representative"
        onPress={createSalesRepresentative}
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