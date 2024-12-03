import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, getUserProductReview, updateProductReview } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { addProductReview, Input } from "../index";

const MyReviewPage = () => {
  const { productReviews } = useSelector((state) => state.productReviews);
  const [review, setReview] = useState("");
  const [editReview, setEditReview] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();

  const handleAddReview = (id) => {
    dispatch(
      addProductReview({ productId: id, comment: review, rating: rating })
    );
    setReview("");
    
    setIsReview(false);
    setRating(1);
  };
  const handleUpdateReview = ({ reviewId }) => {
    dispatch(
      updateProductReview({
        reviewId: reviewId,
        review: editReview,
        rating: rating,
      })
    );
    dispatch(getUserProductReview());
    setEditReview("");
    setIsEdit("");
    setRating(1);
  };
  useEffect(() => {
    console.log(productReviews);
  }, [productReviews]);
  return (
    <section className="flex justify-center">
      <div className="container lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
          <h4>My Reviews</h4>
          <p>manage your Reviews and Add new Review</p>
        </div>
        {productReviews?.length > 0 ? (
          <div className="content grid gap-lg">
            <div className="content">
              <div className="title grid grid-cols-4 lg:grid-cols-5 border-black border-b bg-[#07010128] py-p-sm">
                <div className="name py-sm px-xs">Product</div>
                <div className="name py-sm px-xs">Status</div>
                <div className="name py-sm px-xs col-span-3">Review</div>
              </div>
            </div>
            <div className="productContainer ">
              {productReviews?.map((product) => (
                <div
                  key={product._id}
                  className="product border-b-2 grid gap-xs grid-cols-4 lg:grid-cols-5 py-p-xs"
                >
                  <div className="name py-sm px-xs">{product.productName}</div>
                  <div className="status py-sm px-xs">{product.status}</div>

                  {isEdit === product._id ? (
                    <div className="status py-sm px-xs col-span-3">
                      <Input
                        className="w-full outline-none"
                        value={editReview}
                        onChange={(e) => setEditReview(e.target.value)}
                        placeholder="Write your review"
                      />
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        className="w-full outline-none"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                      />
                      <button
                        onClick={() =>
                          handleUpdateReview({ reviewId: product.reviewId })
                        }
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                  ) : isReview === product._id ? (
                    <>
                      <Input
                        className="w-full outline-none"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review"
                      />
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        className="w-full outline-none"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                      />
                      <button
                        onClick={() => handleAddReview(product.productId)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </>
                  ) : product.comment ? (
                    <div className="comment py-sm px-xs col-span-3">
                      <div> {product.comment} </div>
                      <div>
                        <Button
                          onClick={() => {
                            setIsEdit(product._id),
                              setEditReview(product.comment);
                          }}
                          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="comment py-sm px-xs col-span-3">
                      <button
                        onClick={() => setIsReview(product._id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                      >
                        Add Review
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty">No orders found</div>
        )}
      </div>
    </section>
  );
};

export default MyReviewPage;