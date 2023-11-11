import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import MovieCard from '../components/MovieCard';
import { Movie } from '../models/Movie';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const API_BASE_URL = 'http://localhost:3000';

export default function HomeScreen({ navigation }: HomeScreenProps)  {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      const json = await response.json();
      setMovies(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePressMovie = (tmdbId: number) => {
    navigation.navigate('MovieDetails', { tmdbId });
  };

  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard 
          movie={item} 
          onPress={() => handlePressMovie(item.tmdb_id)}
        />
      )}
      style={styles.main}
      keyExtractor={(item) => item.id.toString()}
      numColumns={5}
      columnWrapperStyle={styles.columnWrapper} // Style for each row's wrapper
      contentContainerStyle={styles.listContent} // Style for the overall container
    />
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
