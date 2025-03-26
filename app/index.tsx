import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "./HomeScreen"; 
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SingupScreen";
import MianScreen from "./MainScreen";
import AddMed from "./AddMed";
import TodayScheduler  from "./TodayScheduler"
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodayScheduler />  
    </SafeAreaView>
  );
}