/* eslint-disable no-console */
import ENV from 'config/environmentVariables';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useUserStore } from 'store/user';

const useOneSignal = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useUserStore((store) => store.user);

  useEffect(() => {
    async function getDeviceState() {
      const deviceState = await OneSignal.getDeviceState();
      console.log('>>>>>> deviceState', deviceState);
      setIsSubscribed(deviceState?.isSubscribed || false);
    }
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(ENV.ONESIGNAL);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent
        );
        const notification = notificationReceivedEvent.getNotification();
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      }
    );

    if (user.email) {
      OneSignal.setExternalUserId(user.email, (result) => {
        console.log('>>>>>>>>>>>>> setExternalUserId', result);
      });
      OneSignal.sendTag('email', user.email);
    }

    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      console.log('OneSignal: subscription changed:', event);
      setIsSubscribed(event.to.isSubscribed);
    });
    OneSignal.addPermissionObserver((event) => {
      console.log('OneSignal: permission changed:', event);
    });
    getDeviceState();
  });

  return isSubscribed;
};

export default {
  title: 'Push Notifications',
  hook: useOneSignal,
};
