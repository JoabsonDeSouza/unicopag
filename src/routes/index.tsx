import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as PAGES from 'pages';
import { useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';

import * as screens from './screenNames';
import DrawerScreen from 'routes/Drawer';
import Profile from 'pages/Profile';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const InitialStack = createStackNavigator();
const MainStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name={screens.DASHBOARD}
        component={PAGES.DashboardScreen}
        options={{ gestureEnabled: false }}
      />
    </MainStack.Navigator>
  );
}

function Drawer() {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <DrawerStack.Screen name={screens.HOME} component={MainStackScreen} />
      <DrawerStack.Screen name={screens.PROFILE} component={Profile} />
    </DrawerStack.Navigator>
  );
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={screens.LOGIN} component={PAGES.LoginScreen} />

      <AuthStack.Screen
        name={screens.RECOVER_PASSWORD}
        component={PAGES.RecoverPasswordScreen}
      />

      <AuthStack.Screen
        name={screens.CREATE_ACCOUNT}
        component={PAGES.CreateAccountScreen}
      />
    </AuthStack.Navigator>
  );
};

function InitialStackScreen() {
  return (
    <InitialStack.Navigator screenOptions={{ headerShown: false }}>
      <InitialStack.Screen
        name={screens.SPLASH}
        component={PAGES.SplashScreen}
      />

      <InitialStack.Screen
        name={screens.AUTH}
        component={AuthStackScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <InitialStack.Screen
        name={screens.MAIN}
        component={Drawer}
        options={{ gestureEnabled: false }}
      />
    </InitialStack.Navigator>
  );
}

function RootStackScreen() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }, [])
  );

  return (
    <RootStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <RootStack.Screen
        name="Initial Stack"
        component={InitialStackScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
