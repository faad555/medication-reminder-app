import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert, BackHandler } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { database, config } from "../config/appwriteConfig";
import { addMinutesToUTCTimeString, convertUTCToLocalTime } from "./utils/utcTimeConversion";

const ReminderNotification = () => {
  const { time, medicineName, description, reminderId } = useLocalSearchParams<{
    time: string;
    medicineName: string;
    description?: string;
    reminderId?: string;
  }>();

  const [taken, setTaken] = useState(false); 
  const [snoozed, setSnoozed] = useState(false);

  const handleTaken = async () => {
    console.log(time, medicineName, description, reminderId);
    setTaken(true);
    Alert.alert("✅ Medication Taken", `You marked ${medicineName} as taken.`);

    if (reminderId) {
      await database.updateDocument(config.db, config.col.reminders, reminderId, {
        taken: true,
      });
      BackHandler.exitApp();
    }
  };

  const handleSnooze = async () => {
    setSnoozed(true);
    Alert.alert("🔔 Snoozed", `Reminder for ${medicineName} will repeat in 10 minutes.`);

    if (reminderId) {
      await database.updateDocument(config.db, config.col.reminders, reminderId, {
        snoozed: true,
        time: addMinutesToUTCTimeString(time, 5)
        
      });
      BackHandler.exitApp();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../assets/images/Alarm.png")} style={styles.icon} />
        <Text style={styles.title}>{medicineName || "Medication Reminder"}</Text>
        <Text style={styles.time}>Scheduled for: <Text style={styles.timeHighlight}>{convertUTCToLocalTime(time || '')}</Text></Text>
        {description && <Text style={styles.description}>{description}</Text>}

        <View style={styles.buttons}>
          <Pressable
            onPress={handleSnooze}
            style={[styles.button, styles.snoozeBtn, snoozed && styles.buttonActive]}
          >
            <Text style={styles.buttonText}>Snooze</Text>
          </Pressable>

          <Pressable
            onPress={handleTaken}
            style={[styles.button, styles.takenBtn, taken && styles.buttonActive]}
          >
            <Text style={styles.buttonText}>Taken</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Reminder Notification</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 8,
    width: "100%",
    maxWidth: 380,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  time: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  timeHighlight: {
    color: "#5A67D8",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: "center",
  },
  snoozeBtn: {
    backgroundColor: "#FBBF24",
  },
  takenBtn: {
    backgroundColor: "#34D399",
  },
  buttonActive: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },
});

export default ReminderNotification;
