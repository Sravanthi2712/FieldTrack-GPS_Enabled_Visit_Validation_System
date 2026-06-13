import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { BASE_URL } from "../../config";

export default function VisitHistoryScreen() {

  const [visits, setVisits] = useState([]);

  const fetchVisits = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/visits/`
      );

      const data = await response.json();

      console.log(data);

      setVisits(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
      }}>
        Visit History
      </Text>
      <FlatList
        data={visits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.customerName}>
              {item.customer_name}
            </Text>

            <Text style={styles.label}>
              Sales Rep: <Text style={styles.value}>{item.sales_rep_name}</Text>
            </Text>

          <Text style={styles.label}>
            Distance: <Text style={styles.value}>
              {Math.round(item.distance_in_meters)} m
            </Text>
          </Text>

          <Text style={styles.label}>
            Latitude: <Text style={styles.value}>{item.checkin_latitude}</Text>
          </Text>

          <Text style={styles.label}>
            Longitude: <Text style={styles.value}>{item.checkin_longitude}</Text>
          </Text>

          <Text style={styles.time}>
            {new Date(item.checkin_time).toLocaleString()}
          </Text>

          </View>
        )}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },

  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  value: {
    color: "#000",
    fontWeight: "600",
  },

  time: {
    marginTop: 10,
    fontSize: 12,
    color: "#888",
  },
});