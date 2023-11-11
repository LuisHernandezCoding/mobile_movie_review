import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ReviewForm from '../components/ReviewForm';
import { Movie } from '../models/Movie';
import UserReviewsScreen from './UserReviewsScreen';

const API_BASE_URL = 'http://localhost:3000';
const screenWidth = Dimensions.get('window').width;

interface MovieDetailProps {
  route: {
    params: {
      tmdbId: number;
    };
  };
}

export default function MovieDetailsScreen({ route }: MovieDetailProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${route.params.tmdbId}`);
      if (!response.ok) {
        throw new Error('Problem fetching movie details');
      }
      const data = await response.json();
      setMovie(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = (review: { content: string; rating: number; }) => {
    // Here you would send the review to your backend
    if (movie === null) {
      console.error('Error: Movie is null');
      return;
    }
    fetch(`${API_BASE_URL}/movies/${movie.tmdb_id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review }),
    })
    .then((response) => {
      if (response) {
        setIsReviewFormVisible(false);
      }
    })
    .catch((error) => {
      console.error('Error submitting review:', error);
    });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [route.params.tmdbId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  
  if (!movie) {
    return <Text style={styles.noDetailsText}>No Movie found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
          style={styles.backdrop}
        />

        <View style={styles.contentContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.releaseDate}>Release date: {movie.release_date}</Text>
            <Text style={styles.rating}>
              ⭐ Rating: {movie.vote_average} ({movie.vote_count} votes)
            </Text>
            <Text style={styles.description}>{movie.description}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.reviewToggleButton} onPress={() => setIsReviewFormVisible(!isReviewFormVisible)}>
          <Text style={styles.reviewToggleButtonText}>{isReviewFormVisible ? 'Hide Review Form' : 'Write Review'}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        {isReviewFormVisible ? (
          <ReviewForm onSubmit={(review) => submitReview(review)} />
        ) : (
          <UserReviewsScreen tmdbId={movie.tmdb_id} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  noDetailsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  backdrop: {
    width: screenWidth,
    height: screenWidth / 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  posterContainer: {
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 10,
  },
  poster: {
    width: 240,
    height: 360,
    borderRadius: 8,
    marginRight: 30,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FAFAFA',
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 22,
    color: '#FAFAFA',
    marginBottom: 4,
  },
  rating: {
    fontSize: 20,
    color: '#D1D1D1',
    marginBottom: 10,
  },
  description: {
    fontSize: 22,
    color: '#C1C1C1',
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  divider: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  reviewToggleButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#E1E1E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 20,
  },
  reviewToggleButtonText: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

