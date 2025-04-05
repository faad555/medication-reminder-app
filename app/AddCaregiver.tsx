import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Text, Link } from './components/customizableFontElements';

export default function AddCaregiver() {
  const [phone, setPhone] = useState("");

  // Function to handle sending the invitation
  const handleSendInvitation = () => {
    if (!phone) {
      Alert.alert("Error", "Please enter a phone number before sending the invitation.");
      return;
    }

    // Simulate sending the invitation (replace this with an API call if needed)
    Alert.alert("Success", `Invitation sent successfully to ${phone}!`);

    // Reset the phone number field
    setPhone("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add a Caregiver</Text>
      </View>

      <Text style={styles.description}>
        Invite a caregiver to assist with managing your medications. They will get an invitation to download the app.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Caregiver's Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: phone ? "#F8C8DC" : "#ccc" }]} // Disable button if no phone number
        onPress={handleSendInvitation}
        disabled={!phone} // Disable button if phone is empty
      >
        <Text style={styles.buttonText}>Send Invitation</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Caregivers will have access to your medication reminders and schedule, but your personal details will remain private.
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton}>
        <Link href={"/Settings"} style={styles.backText}>
          Back
        </Link>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    top: 100,
    borderTopRightRadius: 70,
  },
  header: {
    backgroundColor: "#F8C8DC",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    top: 40,
  },
  headerText: {
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    top: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    top: 40,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    top: 40,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  infoBox: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    top: 40,
  },
  infoText: {
    textAlign: "center",
    color: "#000",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#F8C8DC",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    top: 40,
  },
  backText: {
    color: "#000",
    fontWeight: "bold",
  },
});
