import React, { useState, useEffect } from "react";
import { View,StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Text, Link } from './components/customizableFontElements';
import * as Print from "expo-print";

const MedicineReportHistory = () => {
  const [date, setDate] = useState("");
  interface Medication {
    name: string;
    dose: number;
  }
  
  const [taken, setTaken] = useState<Medication[]>([]);
  const [missed, setMissed] = useState<Medication[]>([]);
  const [adherence, setAdherence] = useState(0);
  
  // Get today's date in the format "dd/mm/yyyy"
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch medication report from the backend
  const fetchMedicationReport = async () => {
    const todayDate = getTodayDate();
    setDate(todayDate);

    try {
      const response = await fetch("Dawood jani add link here", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: todayDate }),
      });
      const data = await response.json();

     if (data.success) {
        setTaken(data.taken);
        setMissed(data.missed);
        setAdherence(data.adherence);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch medication report.");
    }
  };

   // Generate PDF Report
   const generatePDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Medication Report</h1>
          <p>Date: ${date}</p>
          <h2>Taken Medications</h2>
          <ul>
            ${taken.map((med) => `<li>${med.name} - ${med.dose} dose(s)</li>`).join("")}
          </ul>
          <h2>Missed Medications</h2>
          <ul>
            ${missed.map((med) => `<li>${med.name} - ${med.dose} dose(s)</li>`).join("")}
          </ul>
          <h2>Adherence</h2>
          <p>${adherence}% adherence</p>
        </body>
      </html>
    `;
  
    try {
      const { uri } = await Print.printToFileAsync({ html });
      Alert.alert("Success", `PDF saved to ${uri}`);
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF.");
    }
  };

  useEffect(() => {
    fetchMedicationReport();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="time-outline" size={40} color="#d47fa6" />
        </View>
        <Text style={styles.heading}>Medication History & Reports</Text>
      </View>

      {/* Date */}
      <View style={styles.dateBox}>
        <FontAwesome5 name="calendar-alt" size={18} color="#6e4b5e" />
        <Text style={styles.dateText}> Date: {date}</Text>
      </View>

      {/* Taken Medications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Taken Medications</Text>
          <Text style={styles.statusTitle}>Taken</Text>
        </View>
        {taken.map((med) => renderMedication(med.name, med.dose, true))}
      </View>

      {/* Missed Medications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Missed Medications</Text>
          <Text style={styles.statusTitle}>Missed</Text>
        </View>
        {missed.map((med) => renderMedication(med.name, med.dose, false))}
      </View>

      {/* Adherence Report */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adherence Report</Text>
        <Text style={styles.reportText}>Today: {adherence}% adherence</Text>
      </View>

      {/* Export Report Button */}
      <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
        <Text style={styles.exportButtonText}>Export Report (PDF)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Function to render each medication entry
const renderMedication = (name: string, dose: number, isTaken: boolean) => (
  <View style={styles.medicationRow} key={name}>
    <Text style={styles.medicationText}>
      {name} – {dose} dose(s)
    </Text>
    {isTaken ? (
      <MaterialIcons name="check-circle" size={20} color="green" />
    ) : (
      <MaterialIcons name="cancel" size={20} color="red" />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fce4ec",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 50,
    elevation: 3,
  },
  heading: {
    fontWeight: "bold",
    color: "#6e4b5e",
    marginTop: 10,
    textAlign: "center",
  },
  dateBox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  dateText: {
    fontWeight: "bold",
    marginLeft: 8,
    color: "#6e4b5e",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#6e4b5e",
  },
  statusTitle: {
    fontWeight: "bold",
    color: "#6e4b5e",
  },
  medicationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  medicationText: {
    color: "#333",
  },
  reportText: {
    color: "#555",
    marginTop: 5,
  },
  exportButton: {
    backgroundColor: "#f8bbd0",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  exportButtonText: {
    fontWeight: "bold",
    color: "#6e4b5e",
  },
});

export default MedicineReportHistory;
