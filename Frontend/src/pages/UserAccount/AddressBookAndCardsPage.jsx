import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAddress, Button, CheckBox, changeDefaultAddress,getAllAddress } from '../../index';

const AddressBookAndCardsPage = () => {
  const { adressBook } = useSelector((state) => state.addressBook);
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();

  // State to track interaction for shipping and billing changes
  const [isChangeable, setIsChangeable] = useState({ shipping: false, billing: false });
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedBilling, setSelectedBilling] = useState(null);

  const handleDefaultAddress = (type) => {
    // Toggle between shipping and billing change mode
    setIsChangeable((prev) => ({
      ...!prev,
      [type]: !prev[type],
    }));
    // Reset the selected address when toggling modes
    if (type === 'shipping') {
      setSelectedBilling(null); // Clear selected billing when changing shipping mode
    } else {
      setSelectedShipping(null); // Clear selected shipping when changing billing mode
    }
  };

  const handleAddAddress = () => {
    navigate('/user-account/addAddress');
  };

  const handleEditAddress = (address) => {
    dispatchEvent(setAddress(address));
    navigate(`/user-account/editAddress/${address._id}`);
  };

  const handleCreateAddress = () => {
    navigate('/user-account/createAddress');
  };

  const handleSelectionChange = (addressId, type) => {
    // Update selection state based on address type
    if (type === 'shipping') {
      setSelectedShipping(addressId);
    } else {
      setSelectedBilling(addressId);
    }
  };

  const handleSaveChanges = (type) => {
    // Dispatch action to save changes
    const addressId = type === 'shipping' ? selectedShipping : selectedBilling;
    if (addressId) {
      dispatchEvent(changeDefaultAddress({ addressId, type }));
      // Reset interaction state
      setIsChangeable({ shipping: false, billing: false });
      setSelectedShipping(null);
      setSelectedBilling(null);

    }
  };

  const isChecked = (address, type) => {
    // Determine if an address should be checked based on current mode and selections
    if (type === 'shipping') {
      return (
        selectedShipping === address._id || 
        (selectedShipping === null && address.isDefaultShipping)
      );
    }
    if (type === 'billing') {
      return (
        selectedBilling === address._id || 
        (selectedBilling === null && address.isDefaultBilling)
      );
    }
    return false;
  };


  useEffect(() => {
    dispatchEvent(getAllAddress());
  }, []);

  return (
    <section className="flex justify-center min-h-screen bg-background-layout">
      <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="action grid md:grid-cols-2 justify-between items-center">
          <div className="title">
            <h3>Address Book</h3>
            <p>Manage your shipping and billing addresses.</p>
          </div>

          <div className="button flex gap-xs">
            <Button
              onClick={() => handleDefaultAddress('shipping')}
              children="Change Default Shipping Address"
              className="py-p-xxs px-p-xxs border rounded-md w-full text-primary-base"
            />
            <Button
              onClick={() => handleDefaultAddress('billing')}
              children="Change Default Billing Address"
              className="rounded-md w-full text-primary-base border"
            />
          </div>
        </div>
        <div className="content flex flex-col gap-lg">
          <div className="userDetail xl:w-full mr-auto grid md:grid-cols-2 xl:grid-cols-1 gap-md">
            {adressBook?.length !== 0 ? (
              adressBook?.map((address) => (
                <label htmlFor={address._id} name={address._id} key={address._id}>
                  <div
                    key={address._id}
                    className="address p-p-md rounded-lg max-w-[312px] border bg-white aspect-square xl:h-[100px] gap-xxs grid xl:grid-cols-[1fr_2fr_2fr_1fr_2fr] xl:place-items-center xl:max-w-full lg:w-full"
                  >
                    <div className="name items-center w-full flex">
                      <div className="radiobox mr-auto">
                        {(isChangeable.shipping || isChangeable.billing) && (
                          <CheckBox
                            type="radio"
                            id={address._id}
                            isChecked={
                              (isChangeable.shipping && isChecked(address, 'shipping')) ||
                              (isChangeable.billing && isChecked(address, 'billing'))
                            }
                            name={address._id}
                            onChange={() =>
                              handleSelectionChange(
                                address._id,
                                isChangeable.shipping ? 'shipping' : 'billing'
                              )
                            }
                          />
                        )}
                      </div>
                      <h5>{address.fullName}</h5>
                    </div>
                    <div className="address items-center flex">
                      <p>{`${address.addressOne} ${address.addressTwo} ${address.landmark}`}</p>
                    </div>
                    <div className="postcode items-center flex">
                      <p>{`${address.country}-${address.state}-${address.city}-${address.town}`}</p>
                    </div>
                    <div className="phone items-center flex">
                      <p>{address.phone}</p>
                    </div>
                    <div className="action flex w-full flex-col xl:flex-row gap-md xl:gap-xxl xl:items-center">
                      <div className="default">
                        {address?.isDefaultShipping && <p>Default Shipping Address</p>}
                        {address?.isDefaultBilling && <p>Default Billing Address</p>}
                      </div>
                      <div className="btn ml-auto">
                        <Button
                          children="Edit"
                          onClick={() => handleEditAddress(address)}
                          className="text-primary-base px-p-sm py-xxs border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <p>No addresses found</p>
            )}
          </div>
                
 {!isChangeable.shipping && !isChangeable.billing &&
    <Button children='Add Address' onClick={handleCreateAddress} className='p-p-xs bg-primary-base text-white rounded-md'/>
  }
                {isChangeable.shipping || isChangeable.billing ?(
                  <Button children='Cancel' onClick={handleDefaultAddress} className='p-p-xs  text-black border rounded-md'/>
                ):""} 
                
          {/* Save buttons for shipping and billing */}
          {isChangeable.shipping && (
            <Button
              children="Save Shipping Address"
              onClick={() => handleSaveChanges('shipping')}
              className="p-p-xs bg-primary-base text-white rounded-md"
            />
          )}
          {isChangeable.billing && (
            <Button
              children="Save Billing Address"
              onClick={() => handleSaveChanges('billing')}
              className="p-p-xs bg-primary-base text-white rounded-md"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AddressBookAndCardsPage;
