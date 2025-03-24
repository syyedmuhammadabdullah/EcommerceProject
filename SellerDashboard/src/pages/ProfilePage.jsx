import React,{useEffect, useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Input,updateSeller,getSeller } from '../index'
import { CloudUploadOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';

const ProfilePage = () => {
    const inputRef=useRef(null);
    const [bannerImage,setBannerImage]=useState()
    const [hoverBanner,setHoverBanner]=useState(false)
    const [profileImage,setProfileImage]=useState()
    const [sellerForm, setSellerForm] = useState({
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
    const {seller}=useSelector((state)=>state.seller)
    useEffect(()=>{
        dispatch(getSeller())
      
           
        
    },[])
    useEffect(()=>{
        console.log(seller);
        if (seller) {
            const form={
                businessName:seller?.businessName,
                registrationNumber:seller?.registrationNumber,
                taxId:seller?.taxId,
                businessEmail:seller?.businessEmail,
                sellerId:seller?._id,
                cnic:seller?.cnic,
           
                street1:seller?.businessAddress?.addressLine1,
                street2:seller?.businessAddress?.addressLine2,
                city:seller?.businessAddress?.city,
                state:seller.businessAddress?.state,
                postalCode:seller.businessAddress?.postalCode,
                country:seller.businessAddress?.country,
                phone:seller.businessAddress?.phone,
                phone:seller.businessAddress?.town,
                bankName:seller.bankDetails?.bankName,
                accountHolderName:seller.bankDetails?.accountHolderName,
                accountNumber:seller.bankDetails?.accountNumber,
                iban:seller.bankDetails?.iban,
                storeName:seller.storeDetails?.storeName,
                storeDescription:seller.storeDetails?.storeDescription
            }
            setSellerForm(form)
            
        }
   
    },[seller])

    const handleClick=()=>{
        console.log(inputRef.current);
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    const handleBannerUpload=(e)=>{
        const file=e.target.files[0] || e.dataTransfer.files[0];
        setBannerImage(file)
    }

    const handleDrag=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    const handleDrop=(e)=>{
        e.preventDefault();
        handleBannerUpload(e);
    }

    const handleImageChange=()=>{
        handleClick();
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setSellerForm({...sellerForm,[name]:value})
    }
    const handleSubmit=()=>{
        const form={
            businessName:sellerForm.businessName,
            registrationNumber:sellerForm.registrationNumber,
            taxId:sellerForm.taxId,
            businessEmail:sellerForm.businessEmail,
            sellerId:seller._id,
            cnic:sellerForm.cnic,
            businessAddress: {
                addressLine1:sellerForm.street1,
                addressLine2:sellerForm.street2,
                city:sellerForm.city,
                state:sellerForm.state,
                postalCode:sellerForm.postalCode,
                country:sellerForm.country,
                phone:sellerForm.phone
            },
            bankDetails: {
                bankName:sellerForm.bankName,
                accountHolderName:sellerForm.accountHolderName,
                accountNumber:sellerForm.accountNumber,
                iban:sellerForm.iban
            },
            storeDetails: {
                storeName:sellerForm.storeName,
                storeDescription:sellerForm.storeDescription
            }
        }
        dispatch(updateSeller(form))
    }


    return (
        <section className="flex justify-center">
          <div className="container max-w-screen-xl lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
            <div className="top-menu ">
            <div className="title ">
              <h4>Store Details</h4>
            </div>
           
    
            </div>
    
          
            <div className="content w-full overflow-scroll no-scrollbar">
            {/* Banner */}
            {bannerImage? 
            <div className="bannerImg relative h-[146px] bg-red-200" >
                <img  className="w-full h-full object-cover" src={bannerImage ? URL.createObjectURL(bannerImage) : ""} alt="" />
                <div onClick={handleImageChange} onMouseEnter={()=>{setHoverBanner(true)}} onMouseLeave={()=>{setHoverBanner(false)}} className="change cursor-pointer absolute h-full w-full top-0 p-sm flex justify-center items-center ">
                 
                    <UploadOutlined className={`text-primary-base text-xxl ${hoverBanner ?"block" :"hidden"}`}/>
                </div>
                <Input type="file" className="hidden" divClassName="hidden" onChange={handleBannerUpload} ref={inputRef}/>
                
                </div>:
                <div className="banner flex flex-col gap-xs" >

<div className="name">
    <h5>Background Image</h5>
</div>
<div  onClick={handleClick} onDragOver={handleDrag} onDrop={handleDrop} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[146px] border-dashed border border-border-primary rounded-md ">
<div className="icon">
    <UploadOutlined className='text-xxl text-primary-base'/>
</div>
<Input type="file" className="hidden" divClassName="hidden" onChange={handleBannerUpload} ref={inputRef}/>
<div className="text text-center">
    <p className='text-md'>Click or drag file to this area to upload</p>
    <p className='text-text-secondary'>Support for a single upload only.</p>
</div>
</div>

</div>}
<div className="info grid grid-cols-1 lg:grid-cols-2 gap-xxl py-p-xl">

<div className="personalInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <div className="name col-span-full">
        <h5>Personal Information</h5>
    </div>
    <div className="businessName">
        <label htmlFor="businessName">Business Name</label>
        <Input value={sellerForm.businessName} onChange={(e)=>handleInputChange(e)} label="businessName" divClassName='mt-xs' placeholder="Business Name if any" name="businessName" id="businessName"/>
    </div>
    <div className="registrationNumber">
        <label htmlFor="registrationNumber">Registration Number</label>
        <Input value={sellerForm.registrationNumber} onChange={(e)=>handleInputChange(e)} label="Registration Number" divClassName='mt-xs' placeholder="Registration Number" name="registrationNumber" id="registrationNumber"/>
    </div>
    <div className="taxId">
        <label htmlFor="taxId">Tax ID</label>
        <Input value={sellerForm.taxId} onChange={(e)=>handleInputChange(e)} label="Tax ID" divClassName='mt-xs' placeholder="Tax ID" name="taxId" id="taxId"/>
    </div>
    <div className="businessEmail">
        <label htmlFor="businessEmail">Business Email</label>
        <Input value={sellerForm.businessEmail} onChange={(e)=>handleInputChange(e)} label="Business Email" divClassName='mt-xs' placeholder="Business Email" name="businessEmail" id="businessEmail"/>
    </div>
    <div className="cnic">
        <label htmlFor="cnic">CNIC</label>
        <Input value={sellerForm.cnic} onChange={(e)=>handleInputChange(e)} label="CNIC" divClassName='mt-xs' placeholder="CNIC" name="cnic" id="cnic"/>
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


<div className="storeDetails bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <div className="name col-span-full">
        <h5>Store Details</h5>
    </div>
    <div className="storeName">
        <label htmlFor="storeName">Store Name</label>
        <Input value={sellerForm.storeName} onChange={(e)=>handleInputChange(e)} label="Store Name" divClassName='mt-xs' placeholder="Store Name" name="storeName" id="storeName"/>
    </div>
    <div className="storeLogo">
        <label htmlFor="storeLogo">Store Logo</label>
        <Input value={sellerForm.storeLogo} onChange={(e)=>handleInputChange(e)} label="Store Logo" divClassName='mt-xs' placeholder="Store Logo" name="storeLogo" id="storeLogo"/>
    </div>
    <div className="storeDescription col-span-full">
        <label htmlFor="storeDescription">Store Description</label>
        <Input value={sellerForm.storeDescription} onChange={(e)=>handleInputChange(e)} type="textarea" label="Store Description" divClassName='mt-xs' placeholder="Store Description" name="storeDescription" id="storeDescription"/>
    </div>
   
</div>

<div className="update col-span-full ml-auto">
    <Button onClick={handleSubmit} children="Update" className='w-full bg-primary-base text-white py-p-xs rounded-md px-p-md' />
</div>

</div>     
           
            </div>
          </div>
        </section>
      );
}

export default ProfilePage