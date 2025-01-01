import React, { useEffect } from "react";
import { Button } from "../../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const navigate=useNavigate()
  const {user,loading}=useSelector(state=>state.auth)
  const {adressBook}=useSelector(state=>state.addressBook)
  const {orders,}=useSelector(state=>state.order)
const address= adressBook?.find((address)=>address?.isDefaultShipping)
const billingAddress= adressBook?.find((address)=>address?.isDefaultBilling)
useEffect(()=>{

  console.log(user);
},[user])
  return (
    <section className="flex justify-center">
      <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="title">
          <h2>Dashboard</h2>
        </div>

        <div className="content  flex flex-col gap-lg">
          <div className="title">
            <h4>
              Hello{" "}
              {loading ? (
                <TailSpin color="white" height={20} width={20} />
              ): (
                user?.fullName
              ) }
            </h4>
            <p className="max-w-[423px] mr-auto">
              From your account dashboard. you can easily check & view your
              Recent Orders, manage your Shipping and Billing Addresses and edit
              your Password and Account Details.
            </p>
          </div>
          <div className="userDetail mr-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Account Info</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                <div className="img w-[48px] aspect-square rounded-full">
                  <img
                    src={user?.avatar? user?.avatar:`https://via.placeholder.com/48`}
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>

                <div className="name_address">
                  <div className="name">{user?.fullName}</div>
                  {/* <div className="address">{}</div> */}
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="email flex flex-wrap gap-xxs">
                  <p>Email:</p>
                  <p>{user?.email}</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Rec Email:</p>
                  <p>{user?.recoverEmail? user?.recoverEmail:"n/a"}</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>{user?.phone? user.phone:"n/a"}</p>
                </div>
                <Link to={"/user-account/basic-settings"} className="btn mt-m-xs">
                  <Button
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </Link>
              </div>
            </div>

              {adressBook?.length>0 && (
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Default Shipping Address</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                

                <div className="name_address">
                  <div className="name">{address?.fullName}</div>
                  <div className="address text-sm">{address?.city} {address?.state}, {address?.country}</div>
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="address flex flex-wrap gap-xxs">
                 
                  <p>{address?.addressOne}</p>
                  <p>{address?.addressTwo}</p>
                  <p>{address?.landMark}</p>
                  <p>{address?.postalCode}</p>
                </div>

                <div className="phone flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>{address?.phone}</p>
                </div>
                <div className="btn mt-m-xs">
                  <Button
                  onClick={()=>{navigate(`/user-account/editAddress/${address?._id}`)}}
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </div>
              </div>
            </div>    
              )}
              {adressBook?.length>0 && (
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Default Billing Address</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                

                <div className="name_address">
                  <div className="name">{billingAddress?.fullName}</div>
                  <div className="address text-sm">{billingAddress?.city} {billingAddress?.state}, {billingAddress?.country}</div>
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="billingAddress flex flex-wrap gap-xxs">
                 
                  <p>{billingAddress?.addressOne}</p>
                  <p>{billingAddress?.addressTwo}</p>
                  <p>{billingAddress?.landMark}</p>
                  <p>{billingAddress?.postalCode}</p>
                </div>

                <div className="phone flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>{billingAddress?.phone}</p>
                </div>
                <div className="btn mt-m-xs">
                  <Button
                  onClick={()=>{navigate(`/user-account/editAddress/${billingAddress?._id}`)}}
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </div>
              </div>
            </div>      
              )}


            
          
          </div>
          <div className="title">
            <h4>Payment Cards</h4>
          </div>
          <div className="userDetail mr-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Account Info</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                <div className="img w-[48px] aspect-square rounded-full">
                  <img
                    src="https://via.placeholder.com/48"
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>

                <div className="name_address">
                  <div className="name">Full Name</div>
                  <div className="address">city state country</div>
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="email flex flex-wrap gap-xxs">
                  <p>Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Sec Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>01234567899</p>
                </div>
                <div className="btn mt-m-xs">
                  <Button
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Account Info</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                <div className="img w-[48px] aspect-square rounded-full">
                  <img
                    src="https://via.placeholder.com/48"
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>

                <div className="name_address">
                  <div className="name">Full Name</div>
                  <div className="address">city state country</div>
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="email flex flex-wrap gap-xxs">
                  <p>Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Sec Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>01234567899</p>
                </div>
                <div className="btn mt-m-xs">
                  <Button
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="detailbox border rounded-lg accountInfo flex sm:w-[312px] aspect-square flex-col gap-lg p-p-md">
              <div className="title p-p-xxs">
                <h5>Account Info</h5>
              </div>
              <div className="profile flex flex-wrap gap-xs">
                <div className="img w-[48px] aspect-square rounded-full">
                  <img
                    src="https://via.placeholder.com/48"
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>

                <div className="name_address">
                  <div className="name">Full Name</div>
                  <div className="address">city state country</div>
                </div>
              </div>

              <div className="otherDetails flex flex-col gap-xs">
                <div className="email flex flex-wrap gap-xxs">
                  <p>Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Sec Email:</p>
                  <p>Example@gmail.com</p>
                </div>

                <div className="email flex flex-wrap gap-xxs">
                  <p>Phone:</p>
                  <p>01234567899</p>
                </div>
                <div className="btn mt-m-xs">
                  <Button
                    children="Edit"
                    className="text-white w-full bg-primary-base  py-p-xxs rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="title">
            <h4>Recent Orders</h4>
          </div>
              {orders?.length > 0 ? (
          <div className="content">
            <div className="title grid grid-cols-4 lg:grid-cols-5 bg-[#00000005] py-p-sm">
              <div className="name py-sm px-xs">Product</div>
              <div className="name py-sm px-xs">Price</div>
              <div className="name py-sm px-xs">Amount</div>
              <div className="name py-sm px-xs">Status</div>
              <div className="name py-sm px-xs">Detail</div>
            </div>
            {/* <div className="productContainer ">
            {orders && [...(orders[0]?.orders || [])]
  ?.sort((b, a) => new Date(a?.createdAt) - new Date(b?.createdAt))
?.flatMap((item) => item?.products || [])
?.slice(0, 5)?.map((product) => (
                                <div className="product border-b-2 grid gap-xs grid-cols-4 lg:grid-cols-5 py-p-xs"key={product._id} >
                <div className="name py-sm px-xs">{product.name.length > 37 ? product.name.slice(0, 37) + "..." : product.name}</div>
                <div className="price py-sm px-xs">
                  $ <span>{product.price}</span>
                </div>
                <div className="amount py-sm px-xs">{product.quantity}</div>
                <div className="status py-sm px-xs">{product.tracking.status}</div>
                <div className="details py-sm px-xs text-primary-base">
                  <Link to={`/user-account/order-detail/${product.tracking.trackingNumber}`}>View product</Link>
                </div>
              </div>
                 
               ))}
            

                </div> */}
          </div>)
          : (<div>Currently you have No Orders</div>)
          }


        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
