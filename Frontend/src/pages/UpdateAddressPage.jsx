import React from 'react'
import { AddressForm } from '../index'
import { useSelector } from 'react-redux'
const UpdateAddressPage = () => {
const {selectedAddress} = useSelector((state) => state.addressBook)
const handleUpdateAddress = (id) => {

}
const initialValues = {

}

  return (
    <AddressForm onSubmit={handleUpdateAddress} initialValues={selectedAddress}/>
  )
}

export default UpdateAddressPage