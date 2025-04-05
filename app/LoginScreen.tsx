import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, ImageBackground,Image, Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";
const localImage = require("../assets/images/loginImage.jpg");
const localLogo = require("../assets/images/logo.png");
import { Text, Link } from './components/customizableFontElements';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

   // Function to handle login
   const handleLogin = async () => {
    try {
      const response = await fetch("https://<your-project-id>.cloudfunctions.net/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Success", data.message);
        router.push("/MainScreen"); // Navigate to HomeScreen on successful login
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
    
      <ImageBackground
        source={localImage} 
        style={styles.background}
      >
        <TouchableOpacity style={styles.backButton}>
          <Link href={"/HomeScreen"} style={styles.backText}>Back</Link>
        </TouchableOpacity>
        <Image
          source={localLogo} 
          style={styles.logo}
        />
      </ImageBackground>

      
      <View style={styles.card}>
        <Text style={styles.title}>Login to MedRem</Text>
        <Text style={styles.subtitle}>Your Smart Medication Reminder</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
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

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Link href = {"/AddCaregiver"} style={styles.signupLink}>Sign up</Link>
        </Text>
      </View>
    </View>
  );
};


// Styles
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
  backButton: {
    position: "absolute",
    top: 10,
    left: 15,
  },
  backText: {
    color: "#35134F",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 40,
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
    fontWeight: "bold",
    color: "#35134F",
    marginBottom: 50,
    top: 30
  },
  subtitle: {
    color: "#777",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    color: "#777",
    alignSelf: "flex-end",
    marginTop: 10,
    left:110
  },
  loginButton: {
    backgroundColor: "#E75480",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 20,
    marginTop: 35,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 10,
  },
  signupLink: {
    color: "#E75480",
    fontWeight: "bold",
  },
});

export default LoginScreen;
