import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});