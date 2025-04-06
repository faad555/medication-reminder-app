import { router, Stack } from 'expo-router';
import { FontSizeProvider } from './context/fontSizeContext';

import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const RootLayout = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    // ✅ Register notification category for both Android and iOS
    Notifications.setNotificationCategoryAsync('med-reminders-category', [
      {
        identifier: 'TAKEN',
        buttonTitle: '✅ Taken',
        options: { opensAppToForeground: true },
      },
      {
        identifier: 'SNOOZE',
        buttonTitle: '🕒 Snooze',
        options: { opensAppToForeground: false },
      },
    ]);

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      async response => {
        const data = response.notification.request.content.data;
        const reminderId = data?.reminderId;

        if (!reminderId) return;

        const action = response.actionIdentifier;
        console.log('Notification action received:', action);

        // Optional: Handle action (e.g., call API to mark as taken/snoozed)

        router.push({
          pathname: '/ReminderNotification',
          params: { reminderId, time: data?.time, medicineName: data?.medicineName, description: data?.description },
        });
      }
    );

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log('Expo Push Token:', token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default RootLayout;
