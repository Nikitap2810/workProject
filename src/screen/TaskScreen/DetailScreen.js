import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';

const DetailScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        style={{
          ...styles.poster,
        }}
        source={{uri: route?.params?.data?.urlToImage}}>
        <View
          style={{
            margin: 10,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.title}>{route?.params?.data?.title}</Text>
          <View style={{...styles.container}}>
            <Text style={styles.title}>{route?.params?.data?.author}</Text>
            <Text style={styles.title}>
              {moment(route?.params?.data?.publishedAt).format('DD-MM-YYYYY')}
            </Text>
          </View>

          <Text style={styles.title2}>{route?.params?.data?.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  poster: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Regular',
    color: '#f2f2f2',
  },
  title2: {
    fontSize: 14,
    fontFamily: 'RobotoSlab-Regular',
    color: '#bababa',
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 29,
    fontFamily: 'RobotoSlab-Bold',
    color: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 64,
  },
});
