import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screen/SplashScreen';
import HomeScreen from '../screen/HomeScreen';
import UserCalendarEventsScreen from '../screen/AuthScreen/UserCalendarEventsScreen';
import LoginScreen from '../screen/AuthScreen/LoginScreen';
import OtpScreen from '../screen/AuthScreen/OtpScreen';
import NewHomeScreen from '../screen/AuthScreen/NewHomeScreen';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="NewHome" component={NewHomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="UserCalendarEvents"
        component={UserCalendarEventsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
