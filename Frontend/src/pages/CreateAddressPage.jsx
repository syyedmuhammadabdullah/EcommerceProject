import { AddressForm, createAddress } from '../index'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateAddressPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const handleCreateAddress=(creditionals)=>{
      console.log(creditionals);
      
      dispatch(createAddress({
        ...creditionals,
      country:creditionals.country.country,
      state:creditionals.state.state,
      city:creditionals.city.city,
      town:creditionals.town.town
      }))
      navigate(-1)
    }
  return (
    <AddressForm initialValues={null} onSubmit={handleCreateAddress} />
  )
}

export default CreateAddressPage