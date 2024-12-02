import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

const OtpScreen = ({navigation}) => {
  const [resendVisible, setResendVisible] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const timer =
      seconds > 0
        ? setInterval(() => setSeconds(seconds - 1), 1000)
        : setResendVisible(true);
    return () => clearInterval(timer);
  }, [seconds]);

  const onSubmit = () => {
    if (otp == 123456) {
      showMessage({
        message: 'login Successfully',
        type: 'success',
      });
      navigation.navigate('NewHome');
    } else {
      showMessage({
        message: 'Invalid Otp',
        type: 'danger',
      });
    }
  };

  return (
    <View style={{...styles.container}}>
      <Image
        style={{marginTop: 50}}
        source={require('../../assets/images/login.png')}
      />

      <View style={{width: '100%', padding: 15, marginTop: 50}}>
        <Text style={{...styles.title, marginTop: 20}}>Otp</Text>
        <TextInput
          mode="outlined"
          contentStyle={{height: 45}}
          keyboardType="number-pad"
          style={{height: 45}}
          value={otp}
          onChangeText={text => setOtp(text)}
          cursorColor="#000"
        />

        <Pressable
          style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...styles.text}}>Did n't received otp ?</Text>
          {resendVisible ? (
            <Pressable style={{}} onPress={() => setSeconds(60)}>
              <Text style={{...styles.text}}>Resend Otp</Text>
            </Pressable>
          ) : (
            <Text style={{...styles.text}}>
              Resend code in {seconds} seconds
            </Text>
          )}
        </Pressable>

        <Button onPress={onSubmit} style={{marginTop: 50}} mode="contained">
          Submit
        </Button>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});
