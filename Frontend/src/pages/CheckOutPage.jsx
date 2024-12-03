import React, { useEffect, useState } from "react";
import {
  CheckBox,
  Button,
  createOrder,
  removeItemFromCart,
  handleStripePayment,
} from "../index";
import { PayCircleFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate,useLocation } from "react-router-dom";
const CheckOutPage = () => {
  const [isBillingSame, setIsBillingSame] = useState(true);
  const { adressBook } = useSelector((state) => state?.addressBook);
  const { cartItems } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state.auth);
  const { latestOrder } = useSelector((state) => state.order);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location=useLocation();
  const paymentMethod = [
    {
      value: "stripe",
    },
    {
      value: "cod",
    },
  ];
  const [selectedBillingInfo, setSelectedBillingInfo] = useState(
    adressBook?.find((address) => address?.isDefaultBilling)?._id
  );
  const [selectedShippingInfo, setSelectedShippingInfo] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const product=location.state?.product
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart({ userId: user?._id, productId: id }));
  };

  const handlePlaceOrder = () => {
    console.log("place order called ");

    if (selectedPaymentMethod === "stripe") {
   dispatch(
        handleStripePayment({
          CardElement,
          stripe,
          totalPrice:product? product?.discountPrice: cartItems?.totalPrice,
          selectedShippingInfo,
          selectedBillingInfo,
          product:product? product: null,
          elements,
        })
      );
  
    }
    if (selectedPaymentMethod === "cod") {
      dispatch(
        createOrder({
          shippingAddress: selectedShippingInfo,
          billingAddress: selectedBillingInfo,
          cartProducts:product? [product]: cartItems?.items,
          paymentMethod: "cod",
          sellerId: "66b5c7a9480eca331486995d",
          paymentStatus: "pending",
        })
      );
    
     
    }
  };
  useEffect(() => {
    console.log(latestOrder);
    
    if (latestOrder) {
      navigate("/user-account/order-history");
    }
  }, [latestOrder]);

  const handlePaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <section className="bg-background-layout flex justify-center">
      <div className="container  lg:p-xxl gap-base lg:gap-xxl grid lg:grid-cols-2">
        <div className="ContentDetails  grid gap-lg">
          <div className="shippingInfo">
            <div className="title mb-m-lg">
              <h4>Shipping Information</h4>
            </div>
            <div className="ShippingInfoContainer max-h-[500px] w-fit border-2 p-sm overflow-auto no-scrollbar flex-col flex gap-md">
              {adressBook?.length > 0 &&
                adressBook?.map((address) => (
                  <label key={address._id}>
                    <div className="ShippingAddress bg-white cursor-pointer inline-flex gap-md p-p-sm items-center w-[456px] rounded-md   border-2">
                      <div className="selechbox">
                        <CheckBox
                          type="radio"
                          isChecked={selectedShippingInfo === address._id}
                          onChange={() => setSelectedShippingInfo(address._id)}
                          id={address._id}
                        />
                      </div>
                      <div className="info flex flex-col gap-xs">
                        <div className="name">
                          <p>Username</p>
                        </div>

                        <div className="address flex gap-xxs">
                          <p>{address.street}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                          <p>{address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>

                        <div className="phoneNo flex gap-xxs">
                          <div className="title">
                            <p>Phone Number:</p>
                          </div>
                          <div className="countryCode">+1</div>
                          <div className="number">2455757575755</div>
                        </div>

                        <div className="email flex gap-xxs">
                          <div className="title">
                            <p>Email:</p>
                          </div>
                          <div className="content">
                            {" "}
                            <p>User@mail.com</p>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
            </div>
          </div>
        </div>
        <div className="summary w-full p-sm sm:p-xxl flex flex-col  h-fit rounded-md gap-xl bg-white">
          <div className="heading">
            <h3 className="text-lg">Order Summary</h3>
          </div>
          <div className="productContainer">
            {
              product?product &&
                <div className="product flex gap-base" key={product?._id}>
                  <div className="img">
                    <img src="" alt="" className="w-[104px] h-[130px]" />{" "}
                  </div>
                  <div className="info w-full flex flex-col justify-between">
                    <div className="content flex justify-between">
                      <div className="nameAndType">
                        <div className="name">{product?.name}</div>
                        <div className="type">
                          Color: <span>White</span>
                        </div>
                        <div className="type">
                          Size: <span>Xl</span>
                        </div>
                      </div>
                      <div className="price">Rs.{product?.price}</div>
                    </div>
                    <div className="quantity flex justify-between">
                      <div className="quantity">{product?.quantity}</div>
                      <div
                        className="remove"
                        onClick={() => handleRemoveproduct(product?.productId)}
                      >
                        <Button children="Remove" />
                      </div>
                    </div>
                  </div>
                </div>:cartItems &&
                cartItems?.items?.map((item) => (
                  <div className="product flex gap-base" key={item.productId}>
                    <div className="img">
                      <img src="" alt="" className="w-[104px] h-[130px]" />{" "}
                    </div>
                    <div className="info w-full flex flex-col justify-between">
                      <div className="content flex justify-between">
                        <div className="nameAndType">
                          <div className="name">{item.name}</div>
                          <div className="type">
                            Color: <span>White</span>
                          </div>
                          <div className="type">
                            Size: <span>Xl</span>
                          </div>
                        </div>
                        <div className="price">Rs.{item.price}</div>
                      </div>
                      <div className="quantity flex justify-between">
                        <div className="quantity">{item.quantity}</div>
                        <div
                          className="remove"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Button children="Remove" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>

          <div className="price flex flex-col gap-sm">
            <div className="subtotal flex justify-between">
              <span>Subtotal</span>
              <span>Rs. 1000</span>
            </div>

            <div className="subtotal flex justify-between">
              <span>Subtotal</span>
              <span>Rs. 1000</span>
            </div>
            <div className="subtotal flex justify-between">
              <span>Subtotal</span>
              <span>Rs. 1000</span>
            </div>
            <div className="subtotal flex justify-between">
              <span>Subtotal</span>
              <span>Rs. 1000</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-primary-base rounded-md py-xxs text-white"
              children="Place Order"
            />
          </div>
        </div>
        {/* payment section */}
        {selectedPaymentMethod === "stripe" && <CardElement />}

        <div className="paymentInfo col-span-2 w-full border-2 p-md">
          <div className="title mb-m-lg">
            <h5>Payment options</h5>
          </div>

          <div className="paymentMethods w-full overflow-scroll no-scrollbar flex gap-md ">
            {paymentMethod?.map((method, i) => (
              <div
                key={i}
                className="paymentoption border-2 cursor-pointer rounded-md flex flex-col items-center py-p-sm min-w-[160px]"
                onClick={() => handlePaymentMethod(method.value)}
              >
                <div className="icon flex flex-col items-center">
                  <PayCircleFilled className="text-xxl" />
                  <p>{method.value}</p>
                </div>
                <div className="selectbox">
                  <CheckBox
                    type="radio"
                    isChecked={selectedPaymentMethod === method.value}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="billingAddress ">
          <div className="title mb-m-lg">
            <h4>Billing Information</h4>
          </div>
          <div className="ShippingInfoContainer  max-h-[500px] w-fit border-2 p-sm overflow-auto no-scrollbar flex-col flex gap-md">
            <CheckBox
              children="Same as shipping Address"
              isChecked={isBillingSame}
              onChange={() => {
                setIsBillingSame(!isBillingSame);
              }}
              id="billingAdress"
            />

            {isBillingSame
              ? null
              : adressBook?.map((address) => (
                  <label key={address._id}>
                    <div className="billingAddress bg-white cursor-pointer inline-flex gap-md p-p-sm items-center w-[456px] rounded-md   border-2">
                      <div className="selechbox">
                        <CheckBox
                          type="radio"
                          isChecked={selectedBillingInfo === address?._id}
                          onChange={() => setSelectedBillingInfo(address._id)}
                          id={address._id}
                        />
                      </div>
                      <div className="info flex flex-col gap-xs">
                        <div className="name">
                          <p>Username</p>
                        </div>

                        <div className="address flex gap-xxs">
                          <p>{address.street}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                          <p>{address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>

                        <div className="phoneNo flex gap-xxs">
                          <div className="title">
                            <p>Phone Number:</p>
                          </div>
                          <div className="countryCode">+1</div>
                          <div className="number">2455757575755</div>
                        </div>

                        <div className="email flex gap-xxs">
                          <div className="title">
                            <p>Email:</p>
                          </div>
                          <div className="content">
                            {" "}
                            <p>User@mail.com</p>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
