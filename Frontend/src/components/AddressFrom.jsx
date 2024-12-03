import React, { useEffect, useState } from 'react';
import { Input, Button, fetchCountries, fetchCities, fetchStates, fetchTowns, SelectMenu,deleteAddress } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const AddressForm = ({ initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { countries, states, cities, towns } = useSelector((state) => state.location);

  const [formValues, setFormValues] = useState({
    fullName: initialValues?.fullName || "",
    phone: initialValues?.phone || "",
    postalCode: initialValues?.postalCode || "",
    addressOne: initialValues?.addressOne || "",
    addressTwo: initialValues?.addressTwo || "",
    landmark: initialValues?.landmark || "",
    country: {country:initialValues?.country} || {},
   state: {state:initialValues?.state} || {},
    city: {city:initialValues?.city} || {},
    town:{town:initialValues?.town }|| {},
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountry = ({ country, id }) => {
    setFormValues((prevState) => ({
      ...prevState,
      country: { country, id },
    }));
    dispatch(fetchStates(id));
  };

  const handleState = ({ state, id }) => {
    setFormValues((prevState) => ({
      ...prevState,
      state: { state, id },
    }));
    dispatch(fetchCities(id));
  };

  const handleCity = ({ city, id }) => {
    setFormValues((prevState) => ({
      ...prevState,
      city: { city, id },
    }));
    dispatch(fetchTowns(id));
  };

  const handleTown = ({ town, id }) => {
    setFormValues((prevState) => ({
      ...prevState,
      town: { town, id },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const handleDeleteAddress = () => {
    dispatch(deleteAddress({addressId:initialValues._id}));
   navigate(-1)
  }


  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <section className="flex justify-center">
      <div className="container flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="action  flex justify-between">
          <div className="title">
          <h3>Address Details</h3>
        </div>
        {initialValues && <div className="btn">
          <Button onClick={handleDeleteAddress} children="Delete" className="py-p-xxs px-p-xs border rounded-md w-full bg-red-500 text-white"/>
        </div>}
        
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Input
                value={formValues.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                name="fullName"
                id="fullName"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country">Country</label>
              <SelectMenu
                attributes={countries?.map((country) => (
                  <div
                    key={country.geonameId}
                    className="menuoption flex items-center hover:text-primary-hover hover:bg-primary-bg h-[32px] text-black"
                    onClick={() => handleCountry({ country: country.countryName, id: country.geonameId })}
                  >
                    {country.countryName}
                  </div>
                ))}
                defaultValue={formValues.country?.country || "Choose Country"}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber">Phone</label>
              <Input
                value={formValues.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                name="phone"
                id="phone"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state">State</label>
              <SelectMenu
                attributes={states?.map((state) => (
                  <div
                    key={state.geonameId}
                    className="menuoption flex items-center hover:text-primary-hover hover:bg-primary-bg h-[32px] text-black"
                    onClick={() => handleState({ state: state.name, id: state.geonameId })}
                  >
                    {state.name}
                  </div>
                ))}
                defaultValue={formValues.state?.state || "Choose State"}
              />
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <Input
                value={formValues.postalCode}
                onChange={handleChange}
                type="text"
                placeholder="123"
                name="postalCode"
                id="postalCode"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city">City</label>
              <SelectMenu
                attributes={cities?.map((city) => (
                  <div
                    key={city.geonameId}
                    className="menuoption flex items-center hover:text-primary-hover hover:bg-primary-bg h-[32px] text-black"
                    onClick={() => handleCity({ city: city.name, id: city.geonameId })}
                  >
                    {city.name}
                  </div>
                ))}
                defaultValue={formValues.city?.city || "Choose City"}
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label htmlFor="addressOne">Address Line 1</label>
              <Input
                value={formValues.addressOne}
                onChange={handleChange}
                type="text"
                placeholder="123 Main St"
                name="addressOne"
                id="addressOne"
              />
            </div>

            {/* Town */}
            <div>
              <label htmlFor="town">Town</label>
              <SelectMenu
                attributes={towns?.map((town) => (
                  <div
                    key={town.geonameId}
                    className="menuoption flex items-center hover:text-primary-hover hover:bg-primary-bg h-[32px] text-black"
                    onClick={() => handleTown({ town: town.name, id: town.geonameId })}
                  >
                    {town.name}
                  </div>
                ))}
                defaultValue={formValues.town?.town || "Choose Town"}
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label htmlFor="addressTwo">Address Line 2</label>
              <Input
                value={formValues.addressTwo}
                onChange={handleChange}
                type="text"
                placeholder="Apt, Suite, Bldg (optional)"
                name="addressTwo"
                id="addressTwo"
              />
            </div>

            {/* Landmark */}
            <div>
              <label htmlFor="landMark">Landmark</label>
              <Input
                value={formValues.landmark}
                onChange={handleChange}
                type="text"
                placeholder="Landmark"
                name="landmark"
                id="landMark"
              />
            </div>

            {/* Submit */}
            <div className='lg:col-span-2'>
              <Button
                type="submit"
                children="Save Address"
                className="bg-primary-base py-p-xs rounded-md text-lg w-full text-white"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddressForm;
