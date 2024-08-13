import React, { useState } from 'react';
import { userServices } from './services/userServices'; // Adjust the path as needed

const ReviewForm = ({ tourId, existingReview }) => {
  const [reviewText, setReviewText] = useState(existingReview?.reviewText || '');
  const [rating, setRating] = useState(existingReview?.rating || 1); // Default rating value

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText || !rating) {
      alert("Review text and rating are required.");
      return;
    }

    try {
      if (existingReview) {
        await userServices.updateReview(existingReview._id, reviewText, rating);
        alert('Review updated successfully');
      } else {
        await userServices.addReview(reviewText, rating, tourId);
        alert('Review submitted successfully');
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Review Text:
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
            <option value="">Select Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
      <button type="submit">{existingReview ? 'Update Review' : 'Submit Review'}</button>
    </form>
  );
};

export default ReviewForm;
