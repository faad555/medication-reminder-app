import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { database, config } from '../../config/appwriteConfig';

export const useNotificationHandlers = (navigation: any) => {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(async response => {
      const action = response.actionIdentifier;
      const data = response.notification.request.content.data;
      const reminderId = data?.reminderId;

      if (!reminderId) return;

      if (action === 'SNOOZE') {
        await database.updateDocument(config.db, config.col.reminders, reminderId, {
          snoozed: true,
        });
        console.log(`🕒 Snoozed reminder: ${reminderId}`);
      } else if (action === 'TAKEN') {
        await database.updateDocument(config.db, config.col.reminders, reminderId, {
          taken: true,
        });
        console.log(`💊 Marked as taken: ${reminderId}`);
      } else {
        navigation.navigate('ReminderScreen', { reminderId });
      }
    });

    return () => Notifications.removeNotificationSubscription(subscription);
  }, []);
};
