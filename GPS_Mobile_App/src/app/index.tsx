import { View, Button } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 10,
        padding: 20,
      }}
    >
      <Button
        title="Customers"
        onPress={() => router.push("/customer")}
      />

      <Button
        title="Sales Reps"
        onPress={() => router.push("/sales-representative")}
      />

      <Button
        title="Check In"
        onPress={() => router.push("/check-in")}
      />

      <Button
        title="Visit History"
        onPress={() => router.push("/visit-history")}
      />
    </View>
  );
}