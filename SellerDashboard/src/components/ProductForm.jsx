import React, { useEffect, useState } from 'react'
import Stepper from './Stepper'
import {  useProductFormData } from '../index';

const Step1 = () => {
  const { productForm, setProductForm } = useProductFormData(); // Assuming this hook provides productForm state and its setter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm(name, value); // Dynamically update productForm using name as key
  };

  return (
    <section className="p-6 shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Step 1: Basic Product Information
      </h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-gray-600 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={productForm?.name || ""} // Use optional chaining and fallback for undefined values
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-600 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={productForm?.price || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Unit Price */}
        <div>
          <label htmlFor="unitPrice" className="block text-gray-600 mb-2">
            Unit Price
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            placeholder="Enter unit price"
            value={productForm?.unitPrice || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Discount */}
        <div>
          <label htmlFor="discount" className="block text-gray-600 mb-2">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            placeholder="Enter discount percentage"
            value={productForm?.discount || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </form>
    </section>
  );
};



// const Step2 = () => {
//   const { productForm, setProductForm } = useProductFormData();

//   const handleAttributeChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAttributes = [...productForm.attribute];
//     updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
//     setProductForm((prevForm) => ({
//       ...prevForm,
//       attribute: updatedAttributes,
//     }));
//   };

//   const addAttribute = () => {
//     setProductForm((prevForm) => ({
//       ...prevForm,
//       attribute: [...prevForm.attribute, { name: "", value: "" }],
//     }));
//   };

//   const removeAttribute = (index) => {
//     const updatedAttributes = productForm.attribute.filter((_, i) => i !== index);
//     setProductForm((prevForm) => ({
//       ...prevForm,
//       attribute: updatedAttributes,
//     }));
//   };

//   return (
//     <section className="p-6 bg-white shadow-md rounded-md">
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">
//         Step 2: Product Attributes & Variants
//       </h3>
//       <div>
//         <h4 className="text-lg font-medium text-gray-700">Attributes</h4>
//         {productForm?.attribute?.map((attr, index) => (
//           <div key={index} className="flex gap-4 mb-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Attribute Name (e.g., Color)"
//               value={attr.name}
//               onChange={(e) => handleAttributeChange(index, e)}
//               className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <input
//               type="text"
//               name="value"
//               placeholder="Attribute Value (e.g., Red)"
//               value={attr.value}
//               onChange={(e) => handleAttributeChange(index, e)}
//               className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <button
//               type="button"
//               onClick={() => removeAttribute(index)}
//               className="text-red-500 hover:underline"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addAttribute}
//           className="text-blue-500 hover:underline"
//         >
//           Add Attribute
//         </button>
//       </div>
//     </section>
//   );
// };
const Step2 = () => {
  const { productForm, setProductForm } = useProductFormData();

  const handleAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...productForm.attribute];
    updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
    setProductForm("attribute", updatedAttributes);
  };

  const addAttribute = () => {
    setProductForm("attribute", [...productForm.attribute, { name: "", value: "" }]);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = productForm.attribute.filter((_, i) => i !== index);
    setProductForm("attribute", updatedAttributes);
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Product Attributes & Variants</h3>
      <div>
        <h4 className="text-lg font-medium text-gray-700">Attributes</h4>
        {productForm.attribute.map((attr, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Attribute Name (e.g., Color)"
              value={attr.name}
              onChange={(e) => handleAttributeChange(index, e)}
              className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="value"
              placeholder="Attribute Value (e.g., Red)"
              value={attr.value}
              onChange={(e) => handleAttributeChange(index, e)}
              className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeAttribute(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAttribute}
          className="text-blue-500 hover:underline"
        >
          Add Attribute
        </button>
      </div>
    </section>
  );
};

  
const Step3 = () => {
  const { productForm, setProductForm } = useProductFormData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm(name, value);
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Product Description</h3>
      <div>
        <label htmlFor="description" className="block text-gray-600 mb-2">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="6"
          placeholder="Enter product description"
          value={productForm.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
    </section>
  );
};


const Step4 = () => {
  const { productForm, setProductForm } = useProductFormData();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setProductForm("additionalImages", [...productForm.additionalImages, ...newImageUrls]);
    }
  };

  const removeImage = (index) => {
    const updatedImages = productForm.additionalImages.filter((_, i) => i !== index);
    setProductForm("additionalImages", updatedImages);
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Product Images & Variants</h3>
      <div>
        <label htmlFor="additionalImages" className="block text-gray-600 mb-2">
          Upload Additional Images
        </label>
        <input
          type="file"
          id="additionalImages"
          name="additionalImages"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
          {productForm.additionalImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Product ${index}`}
                className="h-[200px] w-[200px] object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



  // const Step4 = ({ formValues, updateFormData }) => {
  //   // const handleImageUpload = (e) => {
  //   //   const file = e.target.files[0];
  //   //   if (file) {
  //   //     const imageUrls = [...formValues.additionalImages, URL.createObjectURL(file)];
  //   //     updateFormData({ additionalImages: imageUrls });
  //   //   }
  //   // };
  //   const handleImageUpload = (e) => {
  //       const files = Array.from(e.target.files); // Convert the FileList to an array
  //       if (files.length) {
  //         const newImageUrls = files.map((file) => URL.createObjectURL(file)); // Generate URLs for all selected files
  //         updateFormData({
  //           additionalImages: [...formValues.additionalImages, ...newImageUrls], // Append new files to the existing array
  //         });
  //       }
  //     };
      
  
  //   const removeImage = (index) => {
  //     const updatedImages = formValues.additionalImages.filter((_, i) => i !== index);
  //     updateFormData({ additionalImages: updatedImages });
  //   };
  
  //   return (
  //     <section className="p-6 bg-white shadow-md rounded-md">
  //       <h3 className="text-xl font-semibold text-gray-800 mb-4">
  //         Step 4: Product Images & Variants
  //       </h3>
  //       <div>
  //         <label htmlFor="additionalImages" className="block text-gray-600 mb-2">
  //           Upload Additional Images
  //         </label>
  //         <input
  //           type="file"
  //           id="additionalImages"
  //           name="additionalImages"
  //           accept="image/*"
  //           multiple
  //           onChange={handleImageUpload}
  //           className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  //         />
  //         <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
  //           {formValues.additionalImages.map((image, index) => (
  //             <div key={index} className="relative">
  //               <img
  //                 src={image}
  //                 alt={`Product ${index}`}
  //                 className="h-[200px] w-[200px] object-cover rounded-md"
  //               />
  //               <button
  //                 type="button"
  //                 onClick={() => removeImage(index)}
  //                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
  //               >
  //                 X
  //               </button>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };
  

  

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        unitPrice: 0,
        discount: 0,
        discountPrice: 0,
        deliveryCharges: 150,
        deliveryTime: "5-7 business days",
        currentStock: 0,
        brand: "",
        description: "",
        warrenty: "Warrenty not available",
        image: "",
        imagePublic_id: "",
        additionalImages: [],
        tags: [],
        category: "",
        subCategory: "",
        quantity: 0,
        maxQuantity: 0,
        totalRating: 0,
        averageRating: 0,
        ratingCount: 0,
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStars: 0,
        stockStatus: "in stock",
        attribute: [],
        sku: "",
        dimensions: { length: 0, width: 0, height: 0 },
        weight: 0,
        variants: [],
        seller: ""
    });

    const updateFormData = (newData) => {
      setFormData({ ...formData, ...newData });
  };
    const steps=[
        {
            id:1,
            title:"Basic Product Information",
            content:"content1",
            component:()=><Step1 formValues={formData} updateFormData={updateFormData}/>
        },
        {
            id:2,
            title:"Product Attributes & Variants",
            content:"content2",
            component:()=><Step2 formValues={formData} updateFormData={updateFormData}/>
        },
        {
            id:3,
            title:"Product Description",
            content:"content3",
            component:()=><Step3 formValues={formData} updateFormData={updateFormData}/>
        },
        {
            id:4,
            title:"Product Images",
            content:"content4",
            component:()=><Step4 formValues={formData} updateFormData={updateFormData}/>
        },
        {
            id:5,
            title:"Product Images",
            content:"content4",
            component:()=><Step4 formValues={formData} updateFormData={updateFormData}/>
        },
       
    ];
   

  return (
   
      <div className=" px-3  flex flex-col gap-xxl">
        <Stepper steps={steps}/>
      </div>
  
  )
}

export default ProductForm