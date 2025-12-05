import * as Notifications from 'expo-notifications';

export async function debugNotify(message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "DEBUG",
      body: String(message),
    },
    trigger: null,
  });
}