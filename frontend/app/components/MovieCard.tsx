import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../models/Movie';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
        style={styles.image} 
      />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>
        {/* Consider adding a star rating component here */}
        <Text style={styles.info}>⭐ {movie.vote_average} | Votes: {movie.vote_count}</Text>
        <Text style={styles.info}>Release Date: {movie.release_date}</Text>
        {/* Add a brief description or list of stars here */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#202020', // Dark background color for the card
      borderRadius: 8,
      width: '19%', // 5 cards per row with a bit of space between
      margin: '0.5%', // Spacing between cards
      overflow: 'hidden', // Ensures the child components don't overflow the card boundaries
      elevation: 5, // Adding some shadow to lift the card from the background
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 0.675, // Aspect ratio for movie posters
    },
    details: {
      padding: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff', // Light color for text to contrast with the dark background
      marginBottom: 4,
    },
    info: {
      fontSize: 12,
      color: '#fff', // Light color for text to contrast with the dark background
      marginBottom: 2,
    },
  });

export default MovieCard;
