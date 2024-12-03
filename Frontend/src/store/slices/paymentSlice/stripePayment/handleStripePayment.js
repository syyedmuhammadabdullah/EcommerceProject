import {createStripePayment,confirmStripePayment,createOrder} from "../../../../index"
import { CardElement } from "@stripe/react-stripe-js";

const handleStripePayment=({selectedShippingInfo,selectedBillingInfo,stripe,elements,product})=>async(dispatch,getState)=>{
    const {cart}=getState();
    console.log("Stripe payment runs product is",product,"cart is ",cart);
   const StripePayment= await dispatch(createStripePayment(product? product.discountPrice: cart?.cartItems?.totalPrice)).unwrap()
   console.log("Stripe payment created ",StripePayment);
   
   
   const paymentStatus=await   dispatch(confirmStripePayment({clientSecret:StripePayment?.client_secret,cardElement:elements?.getElement(CardElement),stripe})).unwrap()
   console.log("Stripe payment veridfied ",cart);
        
   
    
      if (paymentStatus==="succeeded") {
     await  dispatch(createOrder({
          shippingAddress:selectedShippingInfo,
          billingAddress:selectedBillingInfo,
          cartProducts:product? [product]:cart?.cartItems?.items,
          paymentMethod:"stripe",
          sellerId:"66b5c7a9480eca331486995d",
          paymentId:StripePayment?.id,
          paymentStatus:"completed",
          
        }))
        
          }

}
export default handleStripePayment