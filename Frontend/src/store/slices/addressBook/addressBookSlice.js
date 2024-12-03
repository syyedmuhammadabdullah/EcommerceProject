import { createSlice } from "@reduxjs/toolkit";
import {createAddress,updateAddress,deleteAddress,getAllAddress, changeDefaultAddress} from "../../../index";

const initialState = { 
    adressBook:null,
    selectedAddress:null,
    defaultBillingAddress:null,
    defaultShippingAddress:null,
    loading:false,
    error:null
};
export const addressBookSlice = createSlice({
     name: "AddressBook",
     initialState, 
     reducers:{
        setAddress(state,action){
            state.selectedAddress=action.payload
        },
        clearAddress(state){
            state.adressBook=null,
            state.selectedAddress=null
        }
     },
     extraReducers:(builder)=>{
        builder
        .addCase(createAddress.pending,(state)=>{
            state.loading=true
            state.error=null       
        })
        .addCase(createAddress.fulfilled,(state,action)=>{
            state.loading=false,
            state.adressBook=[...state.adressBook, action.payload]
        })
        .addCase(createAddress.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(updateAddress.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateAddress.fulfilled,(state,action)=>{
            state.loading=false,
            state.adressBook=action.payload
            state.defaultBillingAddress=action.payload.filter(address=>address.isDefaultBilling)._id,
            state.defaultShippingAddress=action.payload.filter(address=>address.isDefaultShipping)._id
        })
        .addCase(updateAddress.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(deleteAddress.pending,(state)=>{
            state.loading=true,
            state.error=false
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(deleteAddress.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(getAllAddress.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(getAllAddress.fulfilled,(state,action)=>{
            state.adressBook=action.payload,
            state.loading=false,
            state.defaultBillingAddress=action.payload.filter(address=>address.isDefaultBilling)._id,
            state.defaultShippingAddress=action.payload.filter(address=>address.isDefaultShipping)._id
        })
        .addCase(getAllAddress.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(changeDefaultAddress.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(changeDefaultAddress.fulfilled,(state,action)=>{
            state.loading=false,
            state.adressBook=action.payload,
            state.defaultBillingAddress=action.payload.filter(address=>address.isDefaultBilling)._id,
            state.defaultShippingAddress=action.payload.filter(address=>address.isDefaultShipping)._id
        })
        .addCase(changeDefaultAddress.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
     }
   
     })
     export const {setAddress,clearAddress}=addressBookSlice.actions
     export default addressBookSlice.reducer;
