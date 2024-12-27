import {
  FilterOutlined,
  HeartFilled,
  HeartOutlined,
  MinusSquareFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  StarRating,
  addItemToCart,
  addItemToWishlist,
  createProductQuestion,
  getProductDetails,
  getProductQuestion,
  getProductReviews,
} from "../index";
import {  useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ProductDetailPage = () => {

  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);
  const { productQuestions } = useSelector((state) => state.productQuestions);
  const { productReviews } = useSelector((state) => state.productReviews);
  const {wishlist}=useSelector(state=>state.wishlist)
  const [question, setQuestion] = React.useState("");
  const [quantity,setQuantity]=React.useState(1)
  const [selectedImage,setSelectedImage]=useState("")
  useEffect(() => {
    dispatch(getProductDetails(productId));
    dispatch(getProductQuestion(productId));
    dispatch(getProductReviews(productId));
  
  }, []);
  useEffect(() => {
    console.log(product?.seller?._id);
    if (product && product.additionalImages?.length > 0) {
      setSelectedImage(product.additionalImages[0].url);
    }
    
  }, [product]);
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      localStorage.setItem("pendingProduct", JSON.stringify(product));
      navigate(`/login`);
    }
    dispatch(
    addItemToCart({
      productId: product._id,
        quantity: 1,
        unitPrice: product?.discountPrice
          ? product?.discountPrice
          : product.unitPrice,
        userId: user._id,
      })
    )
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }
    dispatch(addItemToWishlist({ productId: product._id, userId: user._id }));
  };

  const handleQuestion = () => {
    console.log("handle question runs");
    
    dispatch(
      createProductQuestion({ productId, question,sellerId:product?.seller?._id })
    );
    setQuestion("");
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }
   navigate("/checkout",{state:{product}})
  };


  useEffect(() => {
    console.log(productQuestions);
    
    // console.log(productReviews);
    console.log();
    
    

  }, [productQuestions,productReviews]);
  const handleImageClick=(url)=>{
    setSelectedImage(url)
  }

  return (
    <section className="flex justify-center">
      {product && (
        <div className="container  flex-col gap-xxl py-p-lg">
          <div className="product  grid grid-cols-1 xl:grid-cols-[1fr_2fr_1fr]">
            <div className="productImg ">
              <div className="imgplaceholder w-full h-screen xl:h-[400px]">
                <img className="w-full h-full" src={selectedImage} alt="" />
              </div>

              <div className="slider hidden  overflow-x-scroll w-[400px] h-[70px] items-center px-xs xl:flex gap-sm no-scrollbar">
                {product?.additionalImages?.map((image,i) => (
                  <div key={i} className="img w-[60px] flex-shrink-0 h-[60px] cursor-pointer">
                    <img src={image.url} alt="" className="w-full h-full" onMouseEnter={() => handleImageClick(image.url)}/>
                  </div>
                ))}
              </div>
            </div>

            <div className="content  p-p-xxl flex flex-col gap-xxs">
              <div className="p-name">
                <h4>{product.name}</h4>
              </div>

              <div>
                <div className="rating py-p-md flex items-center gap-xs">
                  <div className="stars ">
                    {<StarRating rating={product.averageRating} size={"text-lg"} />}
                  </div>

                  <div className="count text-md">{product.averageRating}</div>
                
                    {
                      wishlist?.item?.find((item)=>item?.productId?._id===product?._id)?._id?  <div
                      className="wishlist ml-auto cursor-warning"
                     
                    ><HeartFilled className="text-red-500 text-[18px]" /></div>: <div
                    className="wishlist ml-auto cursor-pointer"
                    onClick={() => handleAddToWishlist(product)}
                  ><HeartOutlined className="text-[18px]" /></div>
                    }
               
                </div>

                <div className="brand  py-p-md">
                  <p>
                    Brand: <span>{product.brand}</span>
                  </p>
                </div>
              </div>

              <div className="price flex  py-p-md -order-10 xl:order-[0] gap-xs">
                <div className="discountPrice">
                  <p>
                    Rs <span>{product.discountPrice}</span>
                  </p>
                </div>

                <div className="originalPrice line-through">
                  <p>
                    Rs <span>{product.price}</span>
                  </p>
                </div>
              </div>

              {product?.attributes?.map((attribute,i) => (
                <div key={i} className="varient flex flex-col  gap-xs py-p-md">
                  <div className="name_active flex gap-sm">
                    <div className="name">
                      <p>{attribute.name}</p>
                    </div>
                  </div>
                  <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
                    <div className="option w-[82px] sm:w-[120px] text-center border-[#00000026] border px-p-md py-p-xxs">
                      {attribute.value}
                    </div>
                  </div>
                </div>
              ))}

              <div className="action flex flex-col gap-md py-p-md">
                <div className="quantity flex gap-xxs">
                  <div className="name">Quantity</div>
                  <div className="increment" onClick={() => setQuantity(quantity <10 ? quantity+1 : quantity)}>
                    <PlusSquareFilled />
                  </div>
                  <div className="count">{quantity}</div>
                  <div className="decrement" onClick={() => setQuantity(quantity > 1 ? quantity-1 : quantity)}>
                    <MinusSquareFilled />
                  </div>
                </div>

                <div className="buttons flex flex-col lg:flex-row gap-md">
                  <Button
                    onClick={() => handleBuyNow(product)}
                    children="Buy Now"
                    className="  py-p-xs w-full border rounded-md"
                  />
                  <Button
                    onClick={() => handleAddToCart(product)}
                    children="Add to cart"
                    className="bg-primary-base w-full text-white  py-p-xs border rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="additionalinfo flex flex-col gap-xs ">
              <div className="deliveryOptions p-md flex flex-col gap-xs">
                <p className="text-sm">Delivery Options</p>
                <div className="devliveryType flex justify-between">
                  <p>Standard Delivery</p>
                  <p>{product.deliveryTime}</p>
                </div>
                <div className="deliveryCharges flex justify-between">
                  <p>Delivery Charges</p>
                  <p>
                    Rs <span>{product.deliveryCharges}</span>
                  </p>
                </div>
              </div>

              <div className="warrenty p-md flex flex-col gap-xs">
                <div className="title">
                  <p className="text-sm">Warrenty & returns</p>
                </div>
                <div className="storeWarrenty">
                  <p>14 Days easy Return</p>
                </div>
                <div className="productWarrenty">
                  <p>{product.warrenty}</p>
                </div>
              </div>

              <div className="storeDetails grid p-p-md gap-md grid-cols-2">
                <div className="storename">
                  <p>Sold by</p>
                  <h5>{product?.seller?.storeDetails?.storeName}</h5>
                </div>
                <div className="chatnow text-right">
                  <Button
                    children="Chat Now"
                    className=" border text-text-default rounded-md p-p-xs"
                  />
                </div>
                <div className="visitStore col-span-2">
                  <Button
                    children="Visit store"
                    className="w-full bg-primary-base text-white rounded-md py-p-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="productDes grid gap-xl p-md">
            <div className="title">
              <h5>Product Details of {product.name}</h5>
            </div>

            <div className="details">
              <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        
            </div>
          </div>

          <div className="productReviews grid gap-xl p-md">
            <div className="title">
              <h5>Product Review & Ratings</h5>
            </div>

            <div className="rating  bg-background-layout flex flex-col sm:flex-row gap-lg">
              <div className="overrallRating  p-p-md">
                <div className="avg">
                  <p className="text-xxl text-black">{product.averageRating} / 5</p>
                </div>
                <div className="stars flex gap-xxs ">
                  <StarRating rating={product.averageRating} size={"text-xxl"} />
                </div>
                <div className="totalReviews">
                  <p>{product.ratingCount} Review(s)</p>
                </div>
              </div>
              
              <div className="stars flex gap-sm flex-col">
                <div className="fiveStars flex gap-md">
                  <StarRating rating={5} size={"text-lg"} />
                  <div className="count flex gap-xs items-center">
                    <div className="bar w-[100px] h-[10px] bg-border-secondary relative ">
                      <div className="range absolute left-0 top-0 bg-primary-base h-full w-[10px]"></div>
                    </div>
                    <p>{product.fiveStars}</p>
                  </div>
                </div>
                <div className="fourStars flex gap-xxs">
                  <StarRating rating={4} size={"text-lg"} length={4} />
                  <div className="count flex gap-xs items-center">
                    <div className="bar w-[100px] h-[10px] bg-border-secondary relative ">
                      <div className="range absolute left-0 top-0 bg-primary-base h-full w-[10px]"></div>
                    </div>
                    <p>{product.fourStars}</p>
                  </div>
                </div>

                <div className="threeStars flex gap-xxs">
                  <StarRating rating={3} size={"text-lg"} length={3} />
                  <div className="count flex gap-xs items-center">
                    <div className="bar w-[100px] h-[10px] bg-border-secondary relative ">
                      <div className="range absolute left-0 top-0 bg-primary-base h-full w-[10px]"></div>
                    </div>
                    <p>{product.threeStars}</p>
                  </div>
                
                </div>

                <div className="twoStars flex gap-xxs">
                  <StarRating rating={2} size={"text-lg"} length={2} />
                  <div className="count flex gap-xs items-center">
                    <div className="bar w-[100px] h-[10px] bg-border-secondary relative ">
                      <div className="range absolute left-0 top-0 bg-primary-base h-full w-[10px]"></div>
                    </div>
                    <p>{product.twoStars}</p>
                  </div>
                </div>

                <div className="oneStar flex gap-xxs">
                  <StarRating rating={1} size={"text-lg"} length={1} />
                  <div className="count flex gap-xs items-center">
                    <div className="bar w-[100px] h-[10px] bg-border-secondary relative ">
                      <div className="range absolute left-0 top-0 bg-primary-base h-full w-[10px]"></div>
                    </div>
                    <p>{product.oneStars}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reviewfilter flex justify-between">
              <h5>Product Reviews</h5>
              <div className="filter flex gap-sm">
                <div className="sortby flex gap-xxs">
                  <p>Sort by</p>
                  <p>Relevance</p>
                </div>

                <div className="byStars">
                  <div className="filter flex gap-xxs">
                    <FilterOutlined />
                    <p>Filter by</p>
                    <p>All stars</p>
                  </div>
                  <div className="stars hidden list-none flex-col gap-xxs">
                    <li>All stars</li>
                    <li>5 stars</li>
                    <li>4 stars</li>
                    <li>3 stars</li>
                    <li>2 stars</li>
                    <li>1 stars</li>
                  </div>
                </div>
              </div>
            </div>

            <div className="comments border-border-secondary grid gap-xl">
              {productReviews.length > 0 ? productReviews[0]?.reviews?.map((review,i) => (
                <div key={i} className="reviews grid gap-xs p-md shadow-secondary">
                  <div className="rating_date flex justify-between">
                    <div className="userRating">
                      <StarRating rating={review.rating} size={"text-md"} />
                    </div>

                    <div className="date">
                      <p>10 march 2024</p>
                    </div>
                  </div>

                  <div className="clientName">
                    <p className="font-regular">{review.user}</p>
                  </div>

                  <div className="reviewText">
                    <p>{review.comment}</p>
                  </div>
                  {/* <div className="reviewImg flex flex-wrap gap-md">
                    <div className="img">
                      <img src="https://via.placeholder.com/80x90" alt="" />
                    </div>
                   
                  </div> */}
                </div>
              )): (
                <div>
                  <p>No reviews yet</p>
                </div>
              )}
            </div>

            <div className="pagination flex gap-md justify-end">
              <div className="page">1</div>
              <div className="page">1</div>
              <div className="page">1</div>
              <div className="page">1</div>
            </div>
          </div>

          <div className="productQuestions border grid gap-xl p-md">
            <div className="title">
              <h5>Questions about this product</h5>
            </div>
              {isAuthenticated ? (
                <div className="form flex w-full  gap-md">
                  <Input
                    type="text"
                    placeholder="Ask a question"
                    className="w-full outline-none"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                  />
                  <Button children="Submit" className="bg-primary-base px-sm py-xxs	rounded-md text-white" onClick={handleQuestion}/>
                </div>
              ): (
                <div>
                  <p>Log in to ask a question</p>
                </div>
              )}
            <div className="contentContainer grid gap-md">
              {productQuestions?.length > 0 ? productQuestions?.map((question,i) => (
              <div key={i}   className="content flex gap-sm flex-col shadow-secondary p-md">
                <div className="question flex gap-md">
                  <div className="icon">Q</div>
                  <div className="quest">
                    <div className="title">
                      <p>{question?.question}</p>
                    </div>
                    <div className="user">
                      <div className="name flex gap-xs ">
                        <p className="text-text-default text-sm">{question.userId.fullName}</p>
                        <p className="text-text-default text-sm">
              {question.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Answer flex gap-md">
                  <div className="icon">A</div>
                  <div className="ans">
                    <div className="title">
                      <p>{question?.answer}</p>
                    </div>
                    {question?.sellerId && (
                      
                    <div className="seller">
                      <div className="name flex gap-xs ">
                        <p className="text-text-default text-sm">{product?.seller?.storeDetails?.storeName}</p>
                        <p className="text-text-default text-sm">
                          10 march 2024
                        </p>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
              )): (
                <div>
                  <p>Be the first to ask a question</p>
                </div>
              )}
            </div>

            <div className="pagination flex gap-md justify-end">
              <div className="page">1</div>
              <div className="page">1</div>
              <div className="page">1</div>
              <div className="page">1</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
