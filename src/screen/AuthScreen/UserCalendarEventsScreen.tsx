import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarEvents from 'react-native-calendar-events';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

const UserCalendarEventsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    requestCalendarPermissions();
  }, []);

  const requestCalendarPermissions = async () => {
    const permission = await CalendarEvents.requestPermissions();
    if (permission === 'authorized') {
      fetchUpcomingEvents();
    } else {
      setLoading(false);
      Alert.alert('Permission denied', 'Unable to access calendar events.');
    }
  };

  const fetchUpcomingEvents = async () => {
    const startDate = new Date().toISOString();
    const endDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();

    try {
      const events = await CalendarEvents.fetchAllEvents(startDate, endDate);
      const upcomingEvents = events.map((event: any) => ({
        id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
      }));
      setEvents(upcomingEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', 'Could not fetch calendar events.');
    } finally {
      setLoading(false);
    }
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <View style={styles.eventDateContainer}>
      <MaterialCommunityIcons name="calendar-month" size={18} color="#007BFF" style={styles.icon} />
        <Text style={styles.eventDate}>
          {new Date(item.startDate).toLocaleString()} - {new Date(item.endDate).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.emptyImage} />
          <Text style={styles.noEventsText}>No upcoming events.</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default UserCalendarEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#fff',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  listContainer: {
    paddingBottom: 10,
  },
  eventContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007BFF',
    marginBottom: 5,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noEventsText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});