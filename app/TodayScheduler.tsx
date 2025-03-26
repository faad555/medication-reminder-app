import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function MedicationSchedule() {
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Text style={styles.homeText}>Home</Text>
        <Image source={require("../assets/images/todaySchedule.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>Today's Medication {"\n"} Schedule</Text>
      </View>

    
      <TouchableOpacity style={styles.dateCard}>
        <Text style={styles.dateText}>📅 Date: May 7, Friday</Text>
      </TouchableOpacity>

    
      <View style={styles.medicineCard}>
        <Text style={styles.medicineTime}>8:00 AM – Paracetamol</Text>
      </View>
      <Text style={styles.medicineDetail}>Pain reliever, take with water.</Text>
      <View style={styles.medicineCard}>
        <Text style={styles.medicineTime}>12:00 PM – Vitamin D</Text>
        </View>
        <Text style={styles.medicineDetail}>Bone health, take with food.</Text>
      <View style={styles.medicineCard}>
        <Text style={styles.medicineTime}>6:00 PM – Antibiotic</Text>
      </View>
      <Text style={styles.medicineDetail}>Complete course, take after meal.</Text>
    
      <Text style={styles.reminderText}>
        Stay on track with your medication! ✅
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    paddingTop: 0,
  },
  header: {
    backgroundColor: "#F8C7D2",
    width: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 70,
    borderTopLeftRadius:130,
    alignItems: "center",
    paddingBottom: 40,
  },
  homeText: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 8,
    color: "#555",
    fontSize: 14,
    right:9
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 10,
    right:100
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#4A235A",
    right:50
  },
  dateCard: {
    backgroundColor: "#F8C7D2",
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A235A",
  },
  medicineCard: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  medicineTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A235A",
    textAlign:'center'
  },
  medicineDetail: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
    left: 50

  },
  reminderText: {
    marginTop: 40,
    fontSize: 14,
    color: "#4A235A",
  },
});
