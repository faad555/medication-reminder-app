import { Stack } from 'expo-router';
import { FontSizeProvider } from './context/fontSizeContext';

import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

import { useNavigationContainerRef } from '@react-navigation/native';
import { useNotificationHandlers } from './hooks/useNotificationHandlers';
import { Platform } from 'react-native';


const RootLayout = () => {
  const router = useRouter();
  const responseListener = useRef<Notifications.Subscription | null>(null);
  // const navigationRef = useNavigationContainerRef();
  // useNotificationHandlers(navigationRef); // 🔔 Listen for notification taps
  
  useEffect(() => {
    const setupNotifications = async () => {
      // await Notifications.cancelAllScheduledNotificationsAsync();

      // ✅ Set Android Notification Channel (Android only)
      console.log('testt')
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('med-reminders', {
          name: 'Medication Reminders',
          importance: Notifications.AndroidImportance.MAX,
          sound: 'default',
          lightColor: '#FF231F7C',
          vibrationPattern: [0, 250, 250, 250],
        });

        // await Notifications.setNotificationCategoryAsync('med-reminders-category', [
        //   {
        //     identifier: "SNOOZE",
        //     buttonTitle: '🕒 Snooze',
        //     options: {
        //       opensAppToForeground: false,
        //       isAuthenticationRequired: false,
        //       isDestructive: false,
        //     },
        //   },
        //   {
        //     identifier: "TAKEN",
        //     buttonTitle: '✅ Taken',
        //     options: {
        //       opensAppToForeground: false,
        //       isAuthenticationRequired: false,
        //       isDestructive: false,
        //     },
        //   },
        // ]);
      }
    };
  
    setupNotifications();
  }, []);


  // useEffect(() => {
  //   // Top level - only once, typically on app load
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: true,
  //     }),
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
  //     const data = response.notification.request.content.data;

  //     if (data && data.medicineName && data.time) {
  //       // Navigate to the ReminderNotification screen
  //       router.push({
  //         pathname: '/ReminderNotification',
  //         params: {
  //           time: data.time,
  //           medicineName: data.medicineName,
  //           description: data.description,
  //           reminderId: data.reminderId ?? data.$id,
  //         },
  //       });
  //     }
  //   });

  //   return () => {
  //     if (responseListener.current) {
  //      Notifications.removeNotificationSubscription(responseListener.current);
  //     }
  //   };
  // }, []);

  return (
    <FontSizeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="ManuallyAdd" options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="AddMedicine" options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" options={{ headerShown: false }} />
        <Stack.Screen name="PhoneLoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="ScanMedicineScreen" options={{ headerShown: false }} />
        <Stack.Screen name="OtpVerificationScreen" options={{ headerShown: false }} />
        <Stack.Screen name="TodayScheduler" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
        <Stack.Screen name="MedicineReportHistory" options={{ headerShown: false }} />
        <Stack.Screen name="ReminderNotification" options={{ headerShown: false }} />
      </Stack>
    </FontSizeProvider>
  );
};

export default RootLayout;
