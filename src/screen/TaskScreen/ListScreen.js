import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';

const ListScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const currentDate = new Date();
  const prevMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate(),
  );

  useEffect(() => {
    getHomeList(page);
  }, [page]);

  const getHomeList = async pageNumber => {
    const pageSize = 5;
    try {
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=${moment(
          prevMonthDate,
        ).format(
          'DD-MM-YYYY',
        )}&sortBy=publishedAt&page=${pageNumber}&pageSize=${pageSize}&apiKey=0f80b9031bdd43128d52115e3bdbe890`,
      );

      if (res?.status === 200) {
        setData(prevData => [...prevData, ...res?.data?.articles]);
      } else {
        showMessage({
          message: res?.error || 'Failed to fetch data',
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: error.message || 'Something went wrong',
        type: 'danger',
        icon: 'danger',
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Detail', {data: item})}
        key={index}
        style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.poster}
          source={{uri: item?.urlToImage}}>
          <View style={{margin: 10, flex: 1, justifyContent: 'flex-end'}}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.title2}>
              {item?.author} {moment(item?.publishedAt).format('DD-MM-YYYY')}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  });

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f1f1f1" />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>HEADLINES</Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#464646'}}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <FlatList
            data={data}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 29,
    fontFamily: 'RobotoSlab-Bold',
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 50,
  },
  container: {
    shadowColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderRadius: 20,
    height: 250,
    margin: 16,
  },
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
    fontSize: 12,
    fontFamily: 'RobotoSlab-Bold',
    color: '#bababa',
    marginTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
