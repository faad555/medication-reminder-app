import React, { useState } from 'react';
import { View, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useFontSize } from "./context/fontSizeContext";
import { Text, Link } from './components/customizableFontElements';
import { account } from '../config/appwriteConfig';
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const { size, setSize } = useFontSize();
  const router = useRouter();

    const handleLogout = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        await account.deleteSession('current');
        router.push({pathname: "/HomeScreen"});
        console.log("Logged out successfully.");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subHeader}>Customize your app</Text>

      <View style={styles.menuContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reminder Notifications</Text>
          <Switch 
            value={reminderNotifications} 
            onValueChange={setReminderNotifications} 
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sound Alerts</Text>
          <Switch 
            value={soundAlerts} 
            onValueChange={setSoundAlerts} 
          />
        </View>
      </View>
      
      {/* Caregiver Access Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Caregiver Access</Text>
        <TouchableOpacity style={styles.button}>
          <Link href={"/AddCaregiver"} style={styles.buttonText}>Add a Caregiver</Link>
        </TouchableOpacity>
        <Text style={styles.description}>Add a trusted person who can help monitor your medications</Text>
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <Text style={styles.label}>Text Size</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.textSizeButton, size === 'small' && styles.selectedButton]} 
            onPress={() => setSize('small')}>
            <Text style={styles.buttonText}>Small</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.textSizeButton, size === 'medium' && styles.selectedButton]} 
            onPress={() => setSize('medium')}>
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.textSizeButton, size === 'large' && styles.selectedButton]} 
            onPress={() => setSize('large')}>
            <Text style={styles.buttonText}>Large</Text>
          </TouchableOpacity>
        </View>
      </View>

        {/* Caregiver Access Section */}
        <View style={styles.section}  >
        <TouchableOpacity  style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#EC6A91',
    padding: 10,
    paddingVertical: 23,
    height: '10%',
    borderTopRightRadius: 70,
  },
  header: {
    fontWeight: 'bold',
    color: '#3D2352',
    top: 30,
  },
  subHeader: {
    color: '#3D2352',
    marginBottom: 20,
    top: 30,
  },
  menuContainer: {
    marginTop: 80,
    width: '110%',
    backgroundColor: '#fff',
    right: 20,
    padding: 20,
    height: '100%',
  },
  section: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#EC6A91',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  textSizeButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#F285A6',
  },
});

export default SettingsScreen;