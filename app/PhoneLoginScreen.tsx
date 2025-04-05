import React, { useState, useEffect } from "react";
import { View,TextInput,TouchableOpacity,StyleSheet,ImageBackground, Alert} from "react-native";
import { Text, Link } from './components/customizableFontElements';

const localImage = require("../assets/images/loginImage.jpg");
const localLogo = require("../assets/images/logo2.png");
import { ID } from "appwrite";
import { useRouter } from "expo-router";
const {config, database, account} = require("../config/appwriteConfig");

const PhoneLoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  // const { token } = useLocalSearchParams();

  // Function to send OTP
  const sendVerificationCode = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      try {
          const token = await account.createPhoneToken(ID.unique(), phoneNumber);
          // console.log(token);
          // setUserID(token.userId);
          router.push({pathname: "/OtpVerificationScreen", params: {
            userId: token.userId,
          }});
          // Alert.prompt("OTP Sent", `OTP has been sent to ${phoneNumber}`)
      } catch (error) {
          console.log(error);
      }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={localImage} style={styles.background}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <ImageBackground source={localLogo} style={styles.logo} />
      </ImageBackground>

      {/* Signup Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Your {"\n"}MedRem Account</Text>
        <Text style={styles.subtitle}>Your Personal Pill Reminder!</Text>

        {/* Phone Number Input */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 XXX XXXXXXX"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={sendVerificationCode}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

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
  },
  title: {
    fontWeight: "bold",
    color: "#35134F",
    marginBottom: 28,
    textAlign: "center",
  },
  subtitle: {
    color: "#777",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 50,
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
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    top: -73,
    right: -120
  },
  signUpButtons: {      
    backgroundColor: "#E75480",
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 15,
    top: -73,
    right: -110
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",

  },
  loginText: {
    marginTop: 10,
  },
  loginLink: {
    color: "#E75480",
    fontWeight: "bold",
  },
});

export default PhoneLoginScreen;