import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const localImage = require("../assets/images/loginImage.jpg");
const localLogo = require("../assets/images/logo2.png");
const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      <ImageBackground
        source={localImage} 
        style={styles.background}
      >
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <ImageBackground
        source={localLogo} 
        style={styles.logo}
      />
      </ImageBackground>
      {/* Signup Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Your {"\n"}MedRem Account</Text>
        <Text style={styles.subtitle}>Your Personal Pill Reminder!</Text>

        {/* Name Input */}
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        {/* Email Input */}
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="example@gmail.com" keyboardType="email-address" />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="at least 8 characters"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </View>
    </View>
  );
};

//Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0B5D8", // Default color, replace with image if needed
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
  },
  backText: {
    color: "#35134F",
    fontSize: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 20,
  },
  card: {
    width: "100%",
    height: "90%",
    backgroundColor: "#EBEBEB",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#35134F",
    marginBottom: 28,
    top: 10,
    right: 30
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
    right: 53
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#FDEFF4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FDEFF4",
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  signUpButton: {
    backgroundColor: "#E75480",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 14,
    marginTop: 10,
  },
  loginLink: {
    color: "#E75480",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
