import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';

const NewHomeScreen = () => {
  const [button, setButton] = useState(1);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Text style={{...styles.header}}>Home Screen</Text>

      <View style={{...styles.container}}>
        <Pressable
          onPress={() => setButton(1)}
          style={{
            ...styles.buttonContiner,
            backgroundColor: button == 1 ? '#FFF000' : '#FFFFFF',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}>
          <Text style={{...styles.title}}>Container 1</Text>
        </Pressable>
        <Pressable
          onPress={() => setButton(2)}
          style={{
            ...styles.buttonContiner,
            backgroundColor: button == 2 ? '#FFF000' : '#FFFFFF',
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <Text style={{...styles.title}}>Container 2</Text>
        </Pressable>
      </View>

      {button == 1 ? (
        <View style={{...styles.bContiner, backgroundColor: 'red'}}>
          <Text style={{...styles.title, color: '#FFF'}}>component 1</Text>
        </View>
      ) : (
        <View style={{...styles.bContiner, backgroundColor: 'blue'}}>
          <Text style={{...styles.title, color: '#FFF'}}>component 2</Text>
        </View>
      )}
    </View>
  );
};

export default NewHomeScreen;

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontSize: 20,
    fontWeight: '800',
    margin: 15,
  },
  container: {
    borderWidth: 1,

    borderRadius: 15,
    height: 45,
    margin: 15,
    flexDirection: 'row',
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  buttonContiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bContiner: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
