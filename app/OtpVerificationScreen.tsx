import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Keyboard,
  Alert,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { account } from '../config/appwriteConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
        confirmVerificationCode(newOtp.join(''));
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const confirmVerificationCode = async (verificationCode: string) => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing');
      return;
    }

    try {
      
      const activeSession = await account.getSession('current').catch(() => null);
    
      if (activeSession) {
        console.log('✅ Active session already exists:', activeSession);
        router.push('/MainScreen');
        return;
      }

      //await account.deleteSessions(); // deletes all active sessions



      const session = await account.updatePhoneSession(userId, verificationCode);
      console.log('✅ Session:', session);

      router.push({
        pathname: '/MainScreen',
        params: { fromLogin: 'true' }});
    } catch (error) {
      Alert.alert('Invalid OTP', 'Please enter the correct code.');
      console.error('❌ Verification Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 OTP Verification</Text>
      <Text style={styles.subtext}>Enter the code sent to your phone</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="done"
          />
        ))}
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D63384',
    marginBottom: 8,
  },
  subtext: {
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  footerText: {
    fontSize: 14,
    marginTop: 30,
    color: '#555',
  },
  resend: {
    color: '#D63384',
    fontWeight: 'bold',
  },
});