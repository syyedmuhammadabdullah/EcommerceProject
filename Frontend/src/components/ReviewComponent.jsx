import React, { useEffect, useState } from 'react'
import { Button, StarRating, addProductReview,updateProductReview } from '../index'
import { useDispatch } from 'react-redux'

const ReviewComponent = ({ productId,isReview,reviewId,comment="",rating=0,selectedReview = ()=>{} } ) => {
  const dispatch = useDispatch();
  const [starRating, setStarRating] = useState(rating);
  const [review, setReview] = useState(comment);
  const handleReviewSubmit = () => {
    const reviewData = {
      productId,
      comment:review,
      rating: starRating,
    };
    if(isReview){
      dispatch(updateProductReview({ ...reviewData, reviewId }));
    } else {
      dispatch(addProductReview(reviewData));
    }
    selectedReview("");
  };

  const handleClick = (index) => {
    setStarRating(index);
  };

  return (
    <div className="reviewBox flex  justify-center items-center bg-black/40 absolute top-0 left-0 w-full h-full">
      <div className='bg-white border border-border-primary  px-xl py-lg rounded-md'>

      <h3>Review</h3>

      <StarRating
        size="text-xl cursor-pointer"
        rating={starRating}
        onClick={handleClick}
      />

      <textarea
        name="review"
        cols="30"
        rows="4"
        placeholder="Write a review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        maxLength={560}
        minLength={10}
        className="border-2 w-[300px] h-[270px] resize-none border-b-border-primary outline-none rounded-md"
      />
    <div className='btns flex justify-between'>

      <Button
        className="bg-primary-base text-white rounded-md px-xl py-2"
        onClick={handleReviewSubmit}
        >
        Submit Review
      </Button>
      <Button
        className="bg-red-500 text-white rounded-md px-xl py-2"
        onClick={() => selectedReview("")}
        >Cancel</Button>
        </div>
    </div>
        </div>
  );
};

export default ReviewComponent;