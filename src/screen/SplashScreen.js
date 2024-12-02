import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    async function fetchData() {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      });
    }
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
