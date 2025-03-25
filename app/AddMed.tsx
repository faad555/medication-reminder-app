import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const AddMedicineScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/AddMed.png')} style={styles.logo} />
        <Text style={styles.headerText}>Add new Medicine</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Scan via Camera</Text>
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanText}>📷 Scan</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} placeholder='Dose (eg - 2)' />
        <Text style={styles.label}>Reminder</Text>
        <TextInput style={styles.input} placeholder='dd/mm/yy' />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Med</Text>
        </TouchableOpacity>
        <Text style={styles.redirectingText}>Redirecting...</Text>
      </View>
    </View>
  );
};
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e0e5',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height:'30%',
    backgroundColor: '#f8c6d2',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 70,
    borderTopLeftRadius: 70
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
    right:120
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4d004d',
    right:60
  },
  formContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EBEBEB',
    marginTop: -3,
    padding: 25,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4d004d',
    marginBottom: 5,
  },
  scanButton: {
    backgroundColor: '#f8c6d2',
    padding: 8,
    top: -30,
    left: 190,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 30
  },
  scanText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4d004d',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#4d004d',
    fontSize: 20
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#f8c6d2',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4d004d',
  },
  redirectingText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#888',
  },
});

export default AddMedicineScreen;