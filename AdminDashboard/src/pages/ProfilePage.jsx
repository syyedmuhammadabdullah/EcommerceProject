import React,{useEffect, useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Input,updateAdmin,getAdmin
 } from '../index'
import { CloudUploadOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';

const ProfilePage = () => {
    
    const [bannerImage,setBannerImage]=useState("")
    const [hoverBanner,setHoverBanner]=useState(false)
    const [profileImage,setProfileImage]=useState("")
    const [hoverProfile,setHoverProfile]=useState(false)
    const [adminForm, setAdminForm] = useState({
        businessName: '',
        registrationNumber: '',
        taxId: '',
        businessEmail: '',
        cnic: '',
        street1: '',
        street2: '',
        town: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        phone: '',
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        iban: '',
        storeName: '',
        storeDescription: '',
        sellerId: ''
        });

    const dispatch=useDispatch()
    const bannerInputRef = useRef(null);
    const profileInputRef = useRef(null);

 
 
    const {admin,loading}=useSelector((state)=>state.admin)
   
  

    const handleBannerClick=()=>{
        if (bannerInputRef.current) {
            bannerInputRef.current.click()
        }
    }
const handleBannerUpload = (e) => {
  const files = e?.target?.files || e?.dataTransfer?.files;
  if (!files || files.length === 0) return; // agar file hi nahi select hui
  const file = files[0];
  
  setBannerImage(file);
};


    const handleBannerDrag=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    const handleBannerDrop=(e)=>{
        e.preventDefault();
        handleBannerUpload(e);

    }

    const handleBannerImageChange=()=>{
        handleBannerClick();
    }


    const handleProfileClick=()=>{
        if (profileInputRef.current) {
            profileInputRef.current.click()
        }
    }
    const handleProfileUpload=(e)=>{
         const files = e?.target?.files || e?.dataTransfer?.files;
  if (!files || files.length === 0) return; // agar file hi nahi select hui
  const file = files[0];  
        setProfileImage(file)
    }

    const handleProfileDrag=(e)=>{
        
        e.preventDefault();
        e.stopPropagation();
    }
    const handleProfileDrop=(e)=>{
        e.preventDefault();
        handleProfileUpload(e);
    }

    const handleProfileImageChange=()=>{
        handleProfileClick();
    }
    // const handleInputChange=(e)=>{
    //     const {name,value}=e.target;
    //     setSellerForm({...sellerForm,[name]:value})
    // }
    

    // const handleSubmit = () => {
    //     const formData = new FormData();
      
    //     // Append files
    //     if (profileImage instanceof File) {
    //       formData.append("storeLogo", profileImage);
    //       formData.append("storeLogoPublicId", seller.storeDetails?.storeLogoPublicId);
    //     }
      
    //     if (bannerImage instanceof File) {
    //       formData.append("storeBanner", bannerImage);
    //       formData.append("storeBannerPublicId", seller.storeDetails?.storeBannerPublicId);
    //     }
      
    //     // Append text fields individually
    //     formData.append("businessName", sellerForm.businessName);
    //     formData.append("registrationNumber", sellerForm.registrationNumber);
    //     formData.append("taxId", sellerForm.taxId);
    //     formData.append("businessEmail", sellerForm.businessEmail);
    //     formData.append("sellerId", seller._id);
    //     formData.append("cnic", sellerForm.cnic);
      
    //     // Business address
    //     formData.append("street1", sellerForm.street1);
    //     formData.append("street2", sellerForm.street2);
    //     formData.append("city", sellerForm.city);
    //     formData.append("state", sellerForm.state);
    //     formData.append("postalCode", sellerForm.postalCode);
    //     formData.append("country", sellerForm.country);
    //     formData.append("phone", sellerForm.phone);
    //     formData.append("town", sellerForm.town);
      
    //     // Bank details
    //     formData.append("bankName", sellerForm.bankName);
    //     formData.append("accountHolderName", sellerForm.accountHolderName);
    //     formData.append("accountNumber", sellerForm.accountNumber);
    //     formData.append("iban", sellerForm.iban);
      
    //     // Store details
    //     formData.append("storeName", sellerForm.storeName);
    //     formData.append("storeDescription", sellerForm.storeDescription);
    //     if (!bannerImage) {
    //         formData.append("storeBanner", sellerForm.storeBanner);
    //     }
    //     if (!profileImage) {
    //         formData.append("storeLogo", sellerForm.storeLogo);
    //     }
    //     dispatch(updateSeller({ formData, sellerId: seller._id }));
    //   };
      

    return (
        <section className="flex justify-center ">
          <div className="container max-w-screen-xl relative lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
            <div className={`disabled bg-black/5 w-full h-full absolute top-0 left-0 ${loading ? "flex justify-center items-center" : "hidden"}`} > <TailSpin color="black" height={50} /> </div>
            <div className="top-menu ">
            <div className="title ">
              <h4>Store Details</h4>
            </div>
           
    
            </div>
    
          
            <div className="content w-full overflow-scroll no-scrollbar">
            {/* Banner */}
            {seller?.storeDetails?.storeBanner || bannerImage? 
            <div className="bannerImg relative h-[150px]" >
                <h5>Store Banner</h5>
                <img  className="w-full h-full object-cover" src={bannerImage ? URL.createObjectURL(bannerImage) : seller?.storeDetails?.storeBanner} alt="" />
                <div onClick={handleBannerImageChange} onMouseEnter={()=>{setHoverBanner(true)}} onMouseLeave={()=>{setHoverBanner(false)}} className="change cursor-pointer absolute h-full w-full top-0 p-sm flex justify-center items-center ">
                 
                    <UploadOutlined className={`text-primary-base text-xxl ${hoverBanner ?"block" :"hidden"}`}/>
                </div>
                <Input type="file" className="hidden" divClassName="hidden" onChange={handleBannerUpload} ref={bannerInputRef}/>
                
                </div>:
                <div className="banner flex flex-col gap-xs" >

<div className="name">
    <h5>Store Banner</h5>
</div>
<div  onClick={handleBannerClick} onDragOver={handleBannerDrag} onDrop={handleBannerDrop} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[146px] border-dashed border border-border-primary rounded-md ">
<div className="icon">
    <UploadOutlined className='text-xxl text-primary-base'/>
</div>
<Input type="file" className="hidden" divClassName="hidden" onChange={handleBannerUpload} ref={bannerInputRef}/>
<div className="text text-center">
    <p className='text-md'>Click or drag file to this area to upload</p>
    <p className='text-text-secondary'>Support for a single upload only.</p>
</div>
</div>

</div>}
<div className="info grid grid-cols-1 lg:grid-cols-2 gap-xxl py-p-xl">


<div className="storeDetails bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <div className="name col-span-full">
        <h5>Store Details</h5>
    </div>

    {seller?.storeDetails?.storeLogo || profileImage? 
            <div className="bannerImg relative h-[100px] w-[100px] rounded-full col-span-full" >
                <h5>Store Logo</h5>
                <img  className="w-full h-full object-cover" src={profileImage ?URL.createObjectURL(profileImage) : seller?.storeDetails?.storeLogo} alt="" />
                <div onClick={handleProfileImageChange} onMouseEnter={()=>{setHoverProfile(true)}} onMouseLeave={()=>{setHoverProfile(false)}} className="change cursor-pointer absolute h-full w-full top-0 p-sm flex justify-center items-center ">
                 
                    <UploadOutlined className={`text-primary-base text-xxl ${hoverProfile ?"block" :"hidden"}`}/>
                </div>
                <Input type="file" className="hidden" divClassName="hidden" onChange={handleProfileUpload} ref={profileInputRef}/>
                
                </div>:
                <div className="banner flex flex-col gap-xs col-span-full" >

<div className="name">
    <h5>Store Logo</h5>
</div>
<div  onClick={handleProfileClick} onDragOver={handleProfileDrag} onDrop={handleProfileDrop} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[146px] border-dashed border border-border-primary rounded-md ">
<div className="icon">
    <UploadOutlined className='text-xxl text-primary-base'/>
</div>
<Input type="file" className="hidden" divClassName="hidden" onChange={handleProfileUpload} ref={profileInputRef}/>
<div className="text text-center">
    <p className='text-md'>Click or drag file to this area to upload</p>
    <p className='text-text-secondary'>Support for a single upload only.</p>
</div>
</div>

</div>}


    <div className="storeName">
        <label htmlFor="storeName">Store Name</label>
        <Input value={sellerForm.storeName} onChange={(e)=>handleInputChange(e)} label="Store Name" divClassName='mt-xs' placeholder="Store Name" name="storeName" id="storeName"/>
    </div>
    <div className="storeDescription ">
        <label htmlFor="storeDescription">Store Description</label>
        <Input value={sellerForm.storeDescription} onChange={(e)=>handleInputChange(e)} type="textarea" label="Store Description" divClassName='mt-xs' placeholder="Store Description" name="storeDescription" id="storeDescription"/>
    </div>
   
</div>

<div className="address bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">

    <div className="name col-span-full">
        <h5>Address</h5>
    </div>
    <div className="street1">
        <label htmlFor="street1">Street 1</label>
        <Input value={sellerForm.street1} onChange={(e)=>handleInputChange(e)} label="Street1" divClassName='mt-xs' placeholder="Street 1" name="street1" id="street1"/>
    </div>
    <div className="street2">
        <label htmlFor="street2">Street 2</label>
        <Input value={sellerForm.street2} onChange={(e)=>handleInputChange(e)} label="Street2" divClassName='mt-xs' placeholder="Street 2" name="street2" id="street2"/>
    </div>
    <div className="town">
        <label htmlFor="town">Town</label>
        <Input value={sellerForm.town} onChange={(e)=>handleInputChange(e)} label="Town" divClassName='mt-xs' placeholder="Town" name="town" id="town"/>
    </div>
    <div className="city">
        <label htmlFor="city">City</label>
        <Input value={sellerForm.city} onChange={(e)=>handleInputChange(e)} label="City" divClassName='mt-xs' placeholder="City" name="city" id="city"/>
    </div>
    <div className="state">
        <label htmlFor="state">State</label>
        <Input value={sellerForm.state} onChange={(e)=>handleInputChange(e)} label="State" divClassName='mt-xs' placeholder="State" name="state" id="state"/>
    </div>
    <div className="country">
        <label htmlFor="country">Country</label>
        <Input value={sellerForm.country} onChange={(e)=>handleInputChange(e)} label="Country" divClassName='mt-xs' placeholder="Country" name="country" id="country"/>
    </div>
    <div className="postalCode">
        <label htmlFor="postalCode">Postal Code</label>
        <Input value={sellerForm.postalCode} onChange={(e)=>handleInputChange(e)} label="Postal Code" divClassName='mt-xs' placeholder="Postal Code" name="postalCode" id="postalCode"/>
    </div>
    <div className="phone">
        <label htmlFor="phone">Phone</label>
        <Input value={sellerForm.phone} onChange={(e)=>handleInputChange(e)} label="Phone" divClassName='mt-xs' placeholder="Phone" name="phone" id="phone"/>
    </div>

</div>

<div className="bankDetails bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <div className="name col-span-full">
        <h5>Bank Details</h5>
    </div>
    <div className="bankName">
        <label htmlFor="bankName">Bank Name</label>
        <Input value={sellerForm.bankName} onChange={(e)=>handleInputChange(e)} label="Bank Name" divClassName='mt-xs' placeholder="Bank Name" name="bankName" id="bankName"/>
    </div>
    <div className="accountHolderName">
        <label htmlFor="accountHolderName">Account Holder Name</label>
        <Input value={sellerForm.accountHolderName} onChange={(e)=>handleInputChange(e)} label="Account Holder Name" divClassName='mt-xs' placeholder="Account Holder Name" name="accountHolderName" id="accountHolderName"/>
    </div>
    <div className="accountNumber">
        <label htmlFor="accountNumber">Account Number</label>
        <Input value={sellerForm.accountNumber} onChange={(e)=>handleInputChange(e)} label="Account Number" divClassName='mt-xs' placeholder="Account Number" name="accountNumber" id="accountNumber"/>
    </div>
    <div className="iban">
        <label htmlFor="iban">IBAN</label>
        <Input value={sellerForm.iban} onChange={(e)=>handleInputChange(e)} label="IBAN" divClassName='mt-xs' placeholder="IBAN" name="iban" id="iban"/>
    </div>
</div>

<div className="personalInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <div className="name col-span-full">
        <h5>Personal Information</h5>
    </div>
    <div className="businessName">
        <label htmlFor="businessName">Business Name</label>
        <Input value={sellerForm.businessName} onChange={(e)=>handleInputChange(e)} label="businessName" divClassName='mt-xs' placeholder="Business Name if any" name="businessName" id="businessName"/>
    </div>
    
   
    <div className="businessEmail">
        <label htmlFor="businessEmail">Business Email</label>
        <Input value={sellerForm.businessEmail} onChange={(e)=>handleInputChange(e)} label="Business Email" divClassName='mt-xs' placeholder="Business Email" name="businessEmail" id="businessEmail"/>
    </div>
    <div className="cnic col-span-full">
        <label htmlFor="CNIC">CNIC</label>
        <Input value={sellerForm.cnic} onChange={(e)=>handleInputChange(e)} label="CNIC" divClassName='mt-xs' placeholder="CNIC" name="cnic" id="CNIC"/>
    </div>
</div>


<div className="update col-span-full ml-auto">
    {loading? <TailSpin color="black" height={20} /> :<Button onClick={handleSubmit} disabled={loading} children="Update" className='w-full bg-primary-base text-white py-p-xs rounded-md px-p-md' />}
    
</div>

</div>     
           
            </div>
          </div>
        </section>
      );
}

export default ProfilePage