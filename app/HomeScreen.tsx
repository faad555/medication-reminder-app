import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,ImageBackground } from "react-native";
const localImage = require("../assets/images/background.jpg");
const localLogo = require("../assets/images/logo.png");
const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
     <ImageBackground 
        source={localImage}  
        style={styles.background}
        
      ></ImageBackground>

      {/* Content Box */}
      <View style={styles.card}>
        <ImageBackground 
        source={localLogo}  
        style={styles.logoPlaceholder}
        
      ></ImageBackground>

        <Text style={styles.title}>Welcome to </Text>
        <Text style={styles.subtitle}>MedRem</Text>
        <Text style={styles.description}>Never miss a Med Again</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",         
    height: "100%",   
    top: -50,                          
    resizeMode: "cover", 
  },
  card: {
    width: "99%",
    height: "70%",
    backgroundColor: "#EBEBEB",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 115
  },
  logoPlaceholder: {
    width: 115,
    height: 117,
    backgroundColor: "#EBEBEB", 
    borderRadius: 50,
    marginBottom: 10,
    top: 50
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#5A3E85",
    top: 50
  },
  subtitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A3E85",
    marginBottom: 5,
    top: 50
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
    top: 60
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 40,
    top: 155
  },
  signUpButton: {
    backgroundColor: "#F8C8DC", // Light pink
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderRadius: 20,
  },
  loginButton: {
    backgroundColor: "#E75480", // Dark pink
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
