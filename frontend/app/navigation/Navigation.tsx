import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import UserReviewsScreen from '../screens/UserReviewsScreen';
import { StyleSheet } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { tmdbId: number };
  UserReviews: { tmdbId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: '#101010' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#101010' },
        }}
      >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      <Stack.Screen name="UserReviews" component={UserReviewsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  main: {
    backgroundColor: '#101010',
  }
});

export default Navigation;
