import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Keep Track Stay</Text>
        <Text style={styles.title2}>Healthy</Text>
        <Text style={styles.subtitle}>Your Health, Your Control, Check Today’s Meds</Text>
      </View>
      
      
      <View style={styles.menuContainer}>
        <MenuButton title="Add your Med" icon={require('../assets/images/AddMed.png')} />
        <MenuButton title="Today Schedule" icon={require('../assets/images/todaySchedule.png')} />
        <MenuButton title="Settings" icon={require('../assets/images/setting.png')} />
        <MenuButton title="Report" icon={require('../assets/images/Report.png')} />
      </View>
    </View>
  );
};

const MenuButton = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.menuButton}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0F1',
    alignItems: 'center',
    
  },
  header: {
    backgroundColor: '#F8C8DC',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 23,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 65,
    borderTopLeftRadius:65
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D2352',
    top: 30
  },
  title2: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D2352',
    top: 30
  },
  subtitle: {
    fontSize: 15,
    color: '#6D6A75',
    marginTop: 80,
  },
  menuContainer: {
    marginTop: 50,
    width: '80%',
  },
  menuButton: {
    backgroundColor: '#FFC0CB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 17,
    marginBottom: 17,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    right: 22,
    top: 40
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D2352',
    left: 40,
    
  },
  icon: {
    width: 45,
    height: 45,
    left: 57,
  },
});

export default HomeScreen;
