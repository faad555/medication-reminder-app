// pushNotifications.ts

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { account, database, config } from '../../config/appwriteConfig';
import { Query, ID, Permission, Role } from 'appwrite';

export const registerPushToken = async () => {
  console.log('passoed not')

  if (!Device.isDevice) return;

  console.log('passoed')
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  console.log('granted')

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  console.log(' not granted')
  
  if (finalStatus !== 'granted') {
    console.warn('Push permission not granted!');
    return;
  }

  console.log('not not granted')

  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  // const projectId = '67e8cee6002ab8f4812d';
  console.log('id' ,projectId)

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  console.log('token' ,token)

  const user = await account.get();

  console.log('granteduser' ,user)

  const existing = await database.listDocuments(config.db, config.col.pushTokens, [Query.equal('userId', user.$id)]);

  console.log('eixintg total', existing.total)
  console.log('eixintgl', existing)
  if (existing.total === 0) {
    const newtoken = await database.createDocument(
      config.db,
      config.col.pushTokens,
      ID.unique(),
      {
        userId: user.$id,
        token,
      },
      [Permission.read(Role.user(user.$id)),
        Permission.write(Role.user(user.$id))
            ]
    );
    console.log('✅ Push token saved');
  } else {
     // Update the first matching document
    const docId = existing.documents[0].$id;

    await database.updateDocument(config.db, config.col.pushTokens, docId, {
      token,
    }, [Permission.read(Role.user(user.$id)),
      Permission.write(Role.user(user.$id))
          ]);
    console.log('✅ Push token already exists, skipping');
  }
};
