import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    if (email == 'admin@gmail.com') {
      showMessage({
        message: 'otp send Successfully',
        description: 'Otp is 123456',
        type: 'success',
      });
      navigation.navigate('Otp');
    } else {
      showMessage({
        message: 'Enter Valid Email',
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
        <Text style={{...styles.title}}>Email</Text>
        <TextInput
          mode="outlined"
          contentStyle={{height: 45}}
          value={email}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          style={{height: 45}}
          cursorColor="#000"
        />

        <Button onPress={onSubmit} style={{marginTop: 50}} mode="contained">
          Login
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

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
});
