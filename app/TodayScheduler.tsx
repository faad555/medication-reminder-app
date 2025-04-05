import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert, FlatList, ActivityIndicator } from "react-native";
import { Text } from './components/customizableFontElements';
import { database, account, config } from "../config/appwriteConfig";
import { ID, Permission, Role, Query } from 'appwrite';

export default function MedicationSchedule() {
  const [medicinesReminders, setMedicineReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // 'yyyy-mm-dd'
  };

  const fetchTodayMedicines = async () => {
    setLoading(true);
    try {
      console.log('user is here')
      const user = await account.get();
      console.log('user is here', user)
      const today = getTodayDateString();

      const res = await database.listDocuments(
        config.db,
        config.col.reminders,
        [
          Query.equal("userId", user.$id),
          Query.equal("date", today),
        ],
      );

      console.log('medicines are herer', res.documents)
      console.log('medicines length', res.documents.length)
      setMedicineReminders(res.documents);
    } catch (err) {
      console.error("Fetch error:", err);
      Alert.alert("Error", "Could not fetch your medications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayMedicines();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A235A" />
        <Text>Loading your medications...</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.homeText}></Text>
      <Image source={require("../assets/images/todaySchedule.png")} style={styles.logo} />
      <Text style={styles.headerTitle}>Today's Medication {"\n"} Schedule</Text>
    </View>

    <TouchableOpacity style={styles.dateCard}>
      <Text style={styles.dateText}>📅 Date: {getTodayDateString()}</Text>
    </TouchableOpacity>

    {medicinesReminders.length === 0 ? (
      <Text style={styles.noMedicineText}>No medicines scheduled for today!</Text>
    ) : (
      <FlatList
        data={medicinesReminders}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.medicineCard}>
            <Text style={styles.medicineName}>{item.medicineName}</Text>
            {item.description && (
              <View style={styles.medicineInfo}>
                <Text style={styles.label}>📝 Description:</Text>
                <Text style={styles.value}>{item.medicines?.notes}</Text>
              </View>
            )}
            <View style={styles.medicineInfo}>
              <Text style={styles.label}>💊 Dose(s):</Text>
              <Text style={styles.value}>{item.medicines?.frequency || 'N/A'}</Text>
            </View>
            <View style={styles.medicineInfo}>
              <Text style={styles.label}>⏰ Time:</Text>
              <Text style={styles.value}>{item.time || 'No time set'}</Text>
            </View>
            <View style={styles.medicineInfo}>
              <Text style={styles.label}>✅ Taken:</Text>
              <Text style={[styles.value, { color: item.taken ? "green" : "#E67E22" }]}>
                {item.taken ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.medicineInfo}>
              <Text style={styles.label}>⏳ Snoozed:</Text>
              <Text style={[styles.value, { color: item.snoozed ? "#F39C12" : "#999" }]}>
                {item.snoozed ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        )}
      />
    )}

    <Text style={styles.reminderText}>Stay on track with your medication! ✅</Text>
  </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
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
    elevation: 10,
  },
  dateText: {
    fontWeight: "bold",
    color: "#4A235A",
  },
  noMedicineText: {
    color: "#666",
    marginTop: 20,
  },
  medicineTime: {
    fontWeight: "bold",
    color: "#4A235A",
    textAlign:'center'
  },
  medicineDetail: {
    color: "#666",
    marginTop: 5,
    left: 50

  },
  reminderText: {
    textAlign: "center",
    color: "#4A235A",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
  },

  medicineCard: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    width: "100%", // ✅ full width
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,

  },
  
  medicineName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A235A",
    marginBottom: 10,
    textAlign: "center",
  },
  
  medicineInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 6,
  },
  
  label: {
    fontSize: 14,
    color: "#666",
  },
  
  value: {
    fontSize: 14,
    color: "#4A235A",
    fontWeight: "600",
  },
});
