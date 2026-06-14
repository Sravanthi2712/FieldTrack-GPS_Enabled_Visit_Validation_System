import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BASE_URL } from "../../config";

export default function CheckInScreen() {

  const [customerId, setCustomerId] = useState("");
  const [salesRepId, setSalesRepId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [customers, setCustomers] = useState<{ id: number; name: string }[]>([]);
  const [salesReps, setSalesReps] = useState<{ id: number; name: string }[]>([]);

  const [customerSearch, setCustomerSearch] = useState("");
  const [salesRepSearch, setSalesRepSearch] = useState("");

  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showSalesRepDropdown, setShowSalesRepDropdown] = useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchSalesReps();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customers/`);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const fetchSalesReps = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sales-representatives/`);
      if (response.ok) {
        const data = await response.json();
        setSalesReps(data);
      }
    } catch (error) {
      console.log("Error fetching sales reps:", error);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredSalesReps = salesReps.filter((s) =>
    s.name.toLowerCase().includes(salesRepSearch.toLowerCase())
  );

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
    if (!customerId) {
      Alert.alert("Validation Error", "Please select a Customer first.");
      return;
    }
    if (!salesRepId) {
      Alert.alert("Validation Error", "Please select a Sales Representative first.");
      return;
    }
    if (!latitude || !longitude) {
      Alert.alert("Validation Error", "Please click 'Get Current Location' or enter valid coordinates.");
      return;
    }
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
      {/* Customer Field */}
      <View style={[styles.fieldContainer, { zIndex: 10 }]}>
        <Text style={styles.label}>Customer</Text>
        <TextInput
          placeholder="Enter customer Name.."
          value={customerSearch}
          onChangeText={(text) => {
            setCustomerSearch(text);
            setShowCustomerDropdown(true);
            if (!text) {
              setCustomerId("");
            }
          }}
          onFocus={() => setShowCustomerDropdown(true)}
          style={styles.input}
        />
        {showCustomerDropdown && (
          <View style={styles.dropdown}>
            <ScrollView keyboardShouldPersistTaps="always" style={{ maxHeight: 150 }}>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => {
                      setCustomerId(c.id.toString());
                      setCustomerSearch(c.name);
                      setShowCustomerDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{c.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No customers found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        {customerId ? (
          <Text style={styles.selectionHint}>Selected ID: {customerId}</Text>
        ) : null}
      </View>

      {/* Sales Representative Field */}
      <View style={[styles.fieldContainer, { zIndex: 5 }]}>
        <Text style={styles.label}>Sales Representative</Text>
        <TextInput
          placeholder="Enter SalesRep Name..."
          value={salesRepSearch}
          onChangeText={(text) => {
            setSalesRepSearch(text);
            setShowSalesRepDropdown(true);
            if (!text) {
              setSalesRepId("");
            }
          }}
          onFocus={() => setShowSalesRepDropdown(true)}
          style={styles.input}
        />
        {showSalesRepDropdown && (
          <View style={styles.dropdown}>
            <ScrollView keyboardShouldPersistTaps="always" style={{ maxHeight: 150 }}>
              {filteredSalesReps.length > 0 ? (
                filteredSalesReps.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    onPress={() => {
                      setSalesRepId(s.id.toString());
                      setSalesRepSearch(s.name);
                      setShowSalesRepDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{s.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No representatives found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        {salesRepId ? (
          <Text style={styles.selectionHint}>Selected ID: {salesRepId}</Text>
        ) : null}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Latitude</Text>
        <TextInput
          placeholder="Latitude"
          value={latitude}
          onChangeText={setLatitude}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Longitude</Text>
        <TextInput
          placeholder="Longitude"
          value={longitude}
          onChangeText={setLongitude}
          style={styles.input}
        />
      </View>

      <View style={{ gap: 10, marginTop: 10 }}>
        <Button
          title="Get Current Location"
          onPress={getCurrentLocation}
        />

        <Button
          title="Check In"
          onPress={checkIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
    justifyContent: "center",
    backgroundColor: "#f7f9fc",
  },
  fieldContainer: {
    position: "relative",
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e0",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#2d3748",
  },
  dropdown: {
    position: "absolute",
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    maxHeight: 160,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f7fafc",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#2d3748",
  },
  noResults: {
    padding: 16,
    alignItems: "center",
  },
  noResultsText: {
    color: "#a0aec0",
    fontSize: 14,
  },
  selectionHint: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
    fontStyle: "italic",
  },
});