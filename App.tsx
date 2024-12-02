import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Navigation />
        <FlashMessage position="top" floating />
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
