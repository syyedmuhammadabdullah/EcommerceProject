import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import {useParams} from "react-router-dom";
import getSeller from "../store/Slices/SellerSlice/getSeller";
import Button from "../components/Button";
import updateSellerStatus from "../store/Slices/SellerSlice/updateSellerStatus";

const SellerDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id&&!seller?._id) {
      dispatch(getSeller(id));
    }
  }, [id, dispatch]);

const DetailField = ({ label, value, className = "" }) => (
  <div className={className}>
    <label>{label}</label>

    <div className="mt-xs border border-border-primary rounded-md p-p-xs bg-[#fafafa] min-h-[42px] flex items-center">
      {value || "N/A"}
    </div>
  </div>
);
  const [sellerForm, setSellerForm] = useState({
    businessName: "",
    registrationNumber: "",
    taxId: "",
    businessEmail: "",
    cnic: "",
    street1: "",
    street2: "",
    town: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    iban: "",
    storeName: "",
    storeDescription: "",
    sellerId: "",
    storeLogo: "",
    storeBanner: "",
    isVerified: false,
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  const { seller, loading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller) {
      setSellerForm({
        businessName: seller?.businessName,
        registrationNumber: seller?.registrationNumber,
        taxId: seller?.taxId,
        businessEmail: seller?.businessEmail,
        sellerId: seller?._id,
        cnic: seller?.cnic,

        street1: seller?.businessAddress?.addressLine1,
        street2: seller?.businessAddress?.addressLine2,
        city: seller?.businessAddress?.city,
        state: seller?.businessAddress?.state,
        postalCode: seller?.businessAddress?.postalCode,
        country: seller?.businessAddress?.country,
        phone: seller?.businessAddress?.phone,
        town: seller?.businessAddress?.town,

        bankName: seller?.bankDetails?.bankName,
        accountHolderName: seller?.bankDetails?.accountHolderName,
        accountNumber: seller?.bankDetails?.accountNumber,
        iban: seller?.bankDetails?.iban,

        storeName: seller?.storeDetails?.storeName,
        storeDescription: seller?.storeDetails?.storeDescription,
        storeLogo: seller?.storeDetails?.storeLogo,
        storeBanner: seller?.storeDetails?.storeBanner,
        verificationStatus: seller?.verification?.status,
        accountStatus: seller?.accountStatus?.status,
        verificationDate: seller?.verification?.verificationDate ? new Date(seller?.verification?.verificationDate).toLocaleDateString() : "N/A",
        createdAt: seller?.accountStatus?.createdAt,
        updatedAt: seller?.accountStatus?.updatedAt,
        submissionDate: seller?.verification?.submissionDate ? new Date(seller?.verification?.submissionDate).toLocaleDateString() : "N/A",
        rejectionReason: seller?.verification?.rejectionReason,
      });
    }
    console.log(sellerForm);
    
  }, [seller]);

  const handleAccountApprove=(sellerId)=>{
    dispatch(updateSellerStatus({sellerId,accountStatus:"active"}))
  }
  const handleAccountSuspend=(sellerId)=>{
    dispatch(updateSellerStatus({sellerId,accountStatus:"suspended"}))
  }
  const handleVerificationApprove=(sellerId)=>{
    // dispatch update verification status action
    dispatch(updateSellerStatus({sellerId,verificationStatus:"verified"}))
  }
  const handleVerificationReject=(sellerId)=>{
    // dispatch update verification status action
    dispatch(updateSellerStatus({sellerId,verificationStatus:"rejected"}))
  }

  return (
    <section className="flex justify-center">
      <div className="container max-w-screen-xl relative lg:gap-xxl grid gap-xl px-p-md lg:p-p-xxl">
        <div
          className={`disabled bg-black/5 w-full h-full absolute top-0 left-0 ${
            loading ? "flex justify-center items-center" : "hidden"
          }`}
        >
          <TailSpin color="black" height={50} />
        </div>

        <div className="top-menu">
          <div className="title">
            <h4>Store Details</h4>
          </div>
        </div>

        <div className="content w-full overflow-scroll no-scrollbar">
          {sellerForm.storeBanner && (
            <div className="bannerImg relative h-[150px]">
              <h5>Store Banner</h5>

              <img
                className="w-full h-full object-cover rounded-md"
                src={sellerForm.storeBanner}
                alt="Store Banner"
              />
            </div>
          )}

          <div className="info grid grid-cols-1 lg:grid-cols-2 gap-xxl py-p-xl">
            {/* Store Details */}
            <div className="storeDetails bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="name col-span-full">
                <h5>Store Details</h5>
              </div>

              {sellerForm.storeLogo && (
                <div className="col-span-full">
                  <h5>Store Logo</h5>

                  <img
                    className="h-[100px] w-[100px] rounded-full object-cover"
                    src={sellerForm.storeLogo}
                    alt="Store Logo"
                  />
                </div>
              )}

              <DetailField
                label="Store Name"
                value={sellerForm.storeName}
              />

              <DetailField
                label="Store Description"
                value={sellerForm.storeDescription}
              />
            </div>

            {/* Address */}
            <div className="address bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="name col-span-full">
                <h5>Address</h5>
              </div>

              <DetailField label="Street 1" value={sellerForm.street1} />
              <DetailField label="Street 2" value={sellerForm.street2} />
              <DetailField label="Town" value={sellerForm.town} />
              <DetailField label="City" value={sellerForm.city} />
              <DetailField label="State" value={sellerForm.state} />
              <DetailField label="Country" value={sellerForm.country} />
              <DetailField
                label="Postal Code"
                value={sellerForm.postalCode}
              />
              <DetailField label="Phone" value={sellerForm.phone} />
            </div>

            {/* Bank Details */}
            <div className="bankDetails bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="name col-span-full">
                <h5>Bank Details</h5>
              </div>

              <DetailField
                label="Bank Name"
                value={sellerForm.bankName}
              />

              <DetailField
                label="Account Holder Name"
                value={sellerForm.accountHolderName}
              />

              <DetailField
                label="Account Number"
                value={sellerForm.accountNumber}
              />

              <DetailField
                label="IBAN"
                value={sellerForm.iban}
              />
            </div>

            {/* Personal Information */}
            <div className="personalInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="name col-span-full">
                <h5>Personal Information</h5>
              </div>

              <DetailField
                label="Business Name"
                value={sellerForm.businessName}
              />

              <DetailField
                label="Business Email"
                value={sellerForm.businessEmail}
              />

              <DetailField
                className="col-span-full"
                label="CNIC"
                value={sellerForm.cnic}
              />
            </div>
            {/* Account Status */}
            <div className="accountStatus bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="name col-span-full">
                <h5>Account Status</h5>
              </div>

              <DetailField
                label="Account Status"
                value={sellerForm.accountStatus}
              />

              <DetailField
                label="Verification Status"
                value={sellerForm.verificationStatus}
              />

              {sellerForm.verificationStatus==="underReview"?<DetailField className="col-span-full" label="Submission Date" value={sellerForm.submissionDate} /> : <DetailField
                className="col-span-full"
                label="Verification Date"
                value={sellerForm.verificationDate}
              />}
            </div>
          </div>
         < div className="actions flex items-center gap-lg">
         {sellerForm.accountStatus==="suspended"&&
          <Button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={()=>handleAccountApprove(sellerForm.sellerId)}>Approve Seller</Button>
         }
          {sellerForm.accountStatus!=="suspended" && sellerForm.verificationStatus!=="underReview"&&
          <Button onClick={()=>handleAccountSuspend(sellerForm.sellerId)} className="bg-red-500 text-white px-4 py-2 rounded-md">Suspend Seller</Button>
          }
         {sellerForm.verificationStatus!=="verified"&&
          <Button onClick={()=>handleVerificationApprove(sellerForm.sellerId)} className="bg-green-500 text-white px-4 py-2 rounded-md">Approve Verification</Button>
}         {sellerForm.verificationStatus!=="rejected"&&
          <Button onClick={()=>handleVerificationReject(sellerForm.sellerId)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Cancel Verification</Button>
}
</div>
          </div>
      </div>
    </section>
  )
}

export default SellerDetailPage;