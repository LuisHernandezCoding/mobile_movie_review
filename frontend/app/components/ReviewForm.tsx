import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, TextStyle } from 'react-native';

const ReviewForm = ({ onSubmit }: { onSubmit: (review: { content: string; rating: number; }) => void }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarPress = (newRating: number) => {
    setRating(newRating);
  };

  const submitReview = () => {
    // Construct the review object
    const review = { content, rating };
    // Call the onSubmit function passed through props
    onSubmit(review);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
        placeholder="Write your review..."
        placeholderTextColor="#666"
        multiline
      />
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Text style={getStarStyle(rating >= star)}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={submitReview} style={styles.button}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStarStyle = (filled: boolean): TextStyle => ({
  fontSize: 30,
  color: filled ? '#FFD700' : '#757575', 
  marginHorizontal: 2,
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#333',
  },
  input: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  star: {
    fontSize: 30,
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewForm;