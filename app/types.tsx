// types.ts
export type RootStackParamList = {
  ReminderNotification: {
    time: string;
    medicineName: string;
    description?: string;
    reminderId?: string;
  };
};
