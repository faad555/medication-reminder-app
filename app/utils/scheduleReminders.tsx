import * as Notifications from 'expo-notifications';
import { account, database, config } from '../../config/appwriteConfig';
import { Platform } from 'react-native';
import { ID, Permission, Role } from 'appwrite';

export const scheduleReminders = async (
  times: string[],
  medicineName: string,
  description: string,
  medicineId: string
) => {
  console.log("Scheduling reminder...", times);
  const user = await account.get();
  const secondsFromNow = 10; // for instant test
  

  // const { status: existingStatus } = await Notifications.getPermissionsAsync();
  // let finalStatus = existingStatus;

  // if (existingStatus !== 'granted') {
  //   const { status } = await Notifications.requestPermissionsAsync();
  //   finalStatus = status;
  // }

  // if (finalStatus !== 'granted') {
  //   console.warn('Notification permission not granted');
  //   return;
  // }

  // if (Platform.OS === 'android') {
  //   await Notifications.setNotificationChannelAsync('med-reminders', {
  //     name: 'Medication Reminders',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     sound: 'default',
  //     lightColor: '#FF231F7C',
  //   });
  // }

  for (const t of times) {
    const [hourStr, minuteStr] = t.split(':');
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    const reminderDate = new Date();
    reminderDate.setHours(hour);
    reminderDate.setMinutes(minute);
    reminderDate.setSeconds(0);

    const now = new Date();
    const secondsUntilReminder = Math.floor((reminderDate.getTime() - now.getTime()) / 1000);

    if (secondsUntilReminder <= 0) {
      console.warn(`Skipping reminder for ${t} — time is in the past.`);
      continue;
    }

    const reminder = {
      medicineName,
      time: t,
      description,
      taken: false,
      snoozed: false,
      date: reminderDate.toISOString().split('T')[0],
      userId: user.$id,
      medicines: medicineId,
    };

    const saved = await database.createDocument(
      config.db,
      config.col.reminders,
      ID.unique(),
      reminder,
      [Permission.read(Role.user(user.$id)), Permission.write(Role.user(user.$id))],
    );

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: `Time for ${medicineName}`,
    //     body: description || 'Tap to manage this medication',
    //     sound: 'default',
    //     data: {
    //       ...reminder,
    //       reminderId: saved.$id,
    //     },
    //   },
    //   trigger: {
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     seconds: secondsFromNow,
    //     repeats: false,
    //   },
    //   android: {
    //     channelId: 'med-reminders',
    //   },
    // });
  }

  console.log("✅ Notification scheduled to fire in", secondsFromNow, "seconds");
};


// export const scheduleReminders = async (
//   times: string[],
//   medicineName: string,
//   description: string,
//   medicineId: string
// ) => {
//   console.log("Scheduling reminder...", times);
//   const user = await account.get();
//   const secondsFromNow = 10; // for instant test (10 sec delay)

//   // Make sure Android channel with sound is created
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('med-reminders', {
//       name: 'Medication Reminders',
//       importance: Notifications.AndroidImportance.MAX,
//       sound: 'default', // 🔔 ensures alarm-like behavior
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   for (const t of times) {
//     const [hourStr, minuteStr] = t.split(':');
//     const hour = parseInt(hourStr);
//     const minute = parseInt(minuteStr);

//     const reminderDate = new Date();
//     reminderDate.setHours(hour);
//     reminderDate.setMinutes(minute);
//     reminderDate.setSeconds(0);

//     const now = new Date();
//     const secondsUntilReminder = Math.floor((reminderDate.getTime() - now.getTime()) / 1000);

//     if (secondsUntilReminder <= 0) {
//       console.warn(`Skipping reminder for ${t} — time is in the past.`);
//       continue;
//     }

//     const reminder = {
//       medicineName,
//       time: t,
//       description,
//       taken: false,
//       snoozed: false,
//       date: reminderDate.toISOString().split('T')[0],
//       userId: user.$id,
//       medicines: medicineId,
//     };

//     // Save to Appwrite
//     const saved = await database.createDocument(
//       config.db,
//       config.col.reminders,
//       ID.unique(),
//       reminder,
//       [Permission.read(Role.user(user.$id)),
//       Permission.write(Role.user(user.$id))],
//     );

//     // Schedule local push notification with sound
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: `Time for ${medicineName}`,
//         body: description || 'Tap to manage this medication',
//         sound: 'default', // 🔔 alarm sound
//         data: {
//           ...reminder,
//           reminderId: saved.$id,
//         },
//         android: {
//           channelId: 'med-reminders', // must match created channel
//         },
//       } as Notifications.NotificationContentInput, // ✅ Fix TS typing
//       trigger: {
//         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//         seconds: secondsFromNow,
//         repeats: false,
//       },
//     });
//   }
//   console.log("✅ Notification scheduled to fire in", secondsFromNow, "seconds");
// };
