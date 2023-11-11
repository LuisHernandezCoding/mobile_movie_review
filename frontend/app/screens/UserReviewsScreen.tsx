import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';

type UserReviewsScreenRouteProp = RouteProp<RootStackParamList, 'UserReviews'>;

interface UserReviewsScreenProps {
  tmdbId: number;
}

const API_BASE_URL = 'http://localhost:3000';

interface Review {
  content: string;
  rating: number;
}

interface ReviewsProps {
  tmdbId: string;
}

export default function UserReviewsScreen({ tmdbId }: UserReviewsScreenProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${tmdbId}/reviews`);
      if (!response.ok) {
        throw new Error('Problem fetching reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tmdbId]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.reviewContent}>{review.content}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
                <Text key={star} style={star <= review.rating ? styles.fullStar : styles.emptyStar}>★</Text>
              ))}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noReviews}>No reviews yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0A0A0A',
  },
  reviewCard: {
    backgroundColor: '#202020',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  reviewContent: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  fullStar: {
    color: '#FFD700',
    fontSize: 20,
  },
  emptyStar: {
    color: '#444',
    fontSize: 20,
  },
  noReviews: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});