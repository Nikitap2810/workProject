import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen: React.FC = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>  
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
