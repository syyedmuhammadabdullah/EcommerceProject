// import React, { useEffect, useState } from 'react'
// import Stepper from './Stepper'
// import {  useProductFormData } from '../index';



//   const Step1 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm(name, value);
//     };
  
//     return (
//       <section className="p-6 shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Basic Product Information</h3>
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Product Name */}
//           <div>
//             <label htmlFor="name" className="block text-gray-600 mb-2">
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter product name"
//               value={productForm?.name || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
//           {/* SKU */}
//           <div>
//             <label htmlFor="sku" className="block text-gray-600 mb-2">
//               SKU
//             </label>
//             <input
//               type="text"
//               id="sku"
//               name="sku"
//               placeholder="Enter SKU"
//               value={productForm?.sku || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
//           {/* Category */}
//           <div>
//             <label htmlFor="category" className="block text-gray-600 mb-2">
//               Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               placeholder="Enter category"
//               value={productForm?.category || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
//           {/* Subcategory */}
//           <div>
//             <label htmlFor="subcategory" className="block text-gray-600 mb-2">
//               Subcategory
//             </label>
//             <input
//               type="text"
//               id="subcategory"
//               name="subcategory"
//               placeholder="Enter subcategory"
//               value={productForm?.subcategory || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Tags */}
//           <div className="md:col-span-2">
//             <label htmlFor="tags" className="block text-gray-600 mb-2">
//               Tags
//             </label>
//             <input
//               type="text"
//               id="tags"
//               name="tags"
//               placeholder="Enter tags (comma-separated)"
//               value={productForm?.tags || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </form>
//       </section>
//     );
//   };
  
//   const Step2 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleAttributeChange = (index, e) => {
//       const { name, value } = e.target;
//       const updatedAttributes = [...productForm.attribute];
//       updatedAttributes[index] = { ...updatedAttributes[index], [name]: value };
//       setProductForm("attribute", updatedAttributes);
//     };
  
//     const addAttribute = () => {
//       setProductForm("attribute", [...productForm.attribute, { name: "", value: "" }]);
//     };
  
//     const removeAttribute = (index) => {
//       const updatedAttributes = productForm.attribute.filter((_, i) => i !== index);
//       setProductForm("attribute", updatedAttributes);
//     };
  
//     return (
//       <section className="p-6 bg-white shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Product Attributes & Variants</h3>
//         <div>
//           <h4 className="text-lg font-medium text-gray-700">Attributes</h4>
//           {productForm.attribute.map((attr, index) => (
//             <div key={index} className="flex gap-4 mb-4">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Attribute Name (e.g., Color)"
//                 value={attr.name}
//                 onChange={(e) => handleAttributeChange(index, e)}
//                 className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <input
//                 type="text"
//                 name="value"
//                 placeholder="Attribute Value (e.g., Red)"
//                 value={attr.value}
//                 onChange={(e) => handleAttributeChange(index, e)}
//                 className="border border-gray-300 rounded-md p-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeAttribute(index)}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addAttribute}
//             className="text-blue-500 hover:underline"
//           >
//             Add Attribute
//           </button>
//         </div>
//       </section>
//     );
//   };
  
//   const Step3 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm(name, value);
//     };
  
//     return (
//       <section className="p-6 bg-white shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Product Description & SEO</h3>
//         <div>
//           <label htmlFor="description" className="block text-gray-600 mb-2">
//             Product Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             rows="6"
//             placeholder="Enter product description"
//             value={productForm.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>
  
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           {/* Meta Title */}
//           <div>
//             <label htmlFor="metaTitle" className="block text-gray-600 mb-2">
//               Meta Title
//             </label>
//             <input
//               type="text"
//               id="metaTitle"
//               name="metaTitle"
//               placeholder="Enter meta title"
//               value={productForm.metaTitle || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Meta Description */}
//           <div>
//             <label htmlFor="metaDescription" className="block text-gray-600 mb-2">
//               Meta Description
//             </label>
//             <input
//               type="text"
//               id="metaDescription"
//               name="metaDescription"
//               placeholder="Enter meta description"
//               value={productForm.metaDescription || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//            {/* Keywords */}
//            <div className="md:col-span-2">
//             <label htmlFor="keywords" className="block text-gray-600 mb-2 ">
//               Keywords
//             </label>
//             <input
//               type="text"
//               id="keywords"
//               name="keywords"
//               placeholder="Enter keywords"
//               value={productForm.keywords || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>
//       </section>
//     );
//   };

//   const Step4 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm(name, value);
//     };
  
//     return (
//       <section className="p-6 bg-white shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Pricing and Inventory</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Unit Price */}
//           <div>
//             <label htmlFor="regularPrice" className="block text-gray-600 mb-2">
//               Unit Price
//             </label>
//             <input
//               type="number"
//               id="regularPrice"
//               name="regularPrice"
//               placeholder="Enter regular price"
//               value={productForm.regularPrice || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
//           {/* Sale Price */}
//           <div>
//             <label htmlFor="salePrice" className="block text-gray-600 mb-2">
//               Sale Price
//             </label>
//             <input
//               type="number"
//               id="salePrice"
//               name="salePrice"
//               placeholder="Enter sale price"
//               value={productForm.salePrice || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//           {/* Discount Price */}
//           <div>
//             <label htmlFor="salePrice" className="block text-gray-600 mb-2">
//               Discount Price
//             </label>
//             <input
//               type="number"
//               id="discountPrice"
//               name="discountPrice"
//               placeholder="Enter discount price"
//               value={productForm.discountPrice || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Stock Quantity */}
//           <div>
//             <label htmlFor="stockQuantity" className="block text-gray-600 mb-2">
//               Stock Quantity
//             </label>
//             <input
//               type="number"
//               id="stockQuantity"
//               name="stockQuantity"
//               placeholder="Enter stock quantity"
//               value={productForm.stockQuantity || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
         
//           {/* Low Stock Threshold */}
//           <div>
//             <label htmlFor="lowStockThreshold" className="block text-gray-600 mb-2">
//               Low Stock Threshold
//             </label>
//             <input
//               type="number"
//               id="lowStockThreshold"
//               name="lowStockThreshold"
//               placeholder="Enter low stock threshold"
//               value={productForm.lowStockThreshold || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>
//       </section>
//     );
//   };
  
// /*************  ✨ Codeium Command ⭐  *************/
// /**
//  * Step 5 of the product form. This component renders a form
//  * section for shipping details, including weight, dimensions, and
//  * shipping class.
//  *
//  * @return {JSX.Element} The rendered form section.
//  */
// /******  65c61a07-80a8-4e97-bcf2-864bd890de1a  *******/
//   const Step5 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setProductForm(name, value);
//     };
  
//     return (
//       <section className="p-6 bg-white shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 5: Shipping Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Weight */}
//           <div>
//             <label htmlFor="weight" className="block text-gray-600 mb-2">
//               Weight (kg)
//             </label>
//             <input
//               type="number"
//               id="weight"
//               name="weight"
//               placeholder="Enter product weight"
//               value={productForm.weight || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//           </div>
  
//           {/* Dimensions - Length */}
//           <div>
//             <label htmlFor="length" className="block text-gray-600 mb-2">
//               Length (cm)
//             </label>
//             <input
//               type="number"
//               id="length"
//               name="length"
//               placeholder="Enter length"
//               value={productForm.length || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Dimensions - Width */}
//           <div>
//             <label htmlFor="width" className="block text-gray-600 mb-2">
//               Width (cm)
//             </label>
//             <input
//               type="number"
//               id="width"
//               name="width"
//               placeholder="Enter width"
//               value={productForm.width || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Dimensions - Height */}
//           <div>
//             <label htmlFor="height" className="block text-gray-600 mb-2">
//               Height (cm)
//             </label>
//             <input
//               type="number"
//               id="height"
//               name="height"
//               placeholder="Enter height"
//               value={productForm.height || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
  
//           {/* Shipping Class */}
//           <div>
//             <label htmlFor="shippingClass" className="block text-gray-600 mb-2">
//               Shipping Class
//             </label>
//             <select
//               id="shippingClass"
//               name="shippingClass"
//               value={productForm.shippingClass || ""}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="">Select Shipping Class</option>
//               <option value="standard">Standard</option>
//               <option value="express">Express</option>
//               <option value="overnight">Overnight</option>
//             </select>
//           </div>
//         </div>
//       </section>
//     );
//   };
  
  
//   const Step6 = () => {
//     const { productForm, setProductForm } = useProductFormData();
  
//     const handleMainImageUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const newImageUrl = URL.createObjectURL(file);
//         setProductForm("mainImage", newImageUrl);
//       }
//     };
  
//     const handleAdditionalImageUpload = (e) => {
//       const files = Array.from(e.target.files);
//       if (files.length) {
//         const newImageUrls = files.map((file) => URL.createObjectURL(file));
//         setProductForm("additionalImages", [...productForm.additionalImages, ...newImageUrls]);
//       }
//     };
  
//     const removeImage = (index) => {
//       const updatedImages = productForm.additionalImages.filter((_, i) => i !== index);
//       setProductForm("additionalImages", updatedImages);
//     };
  
//     return (
//       <section className="p-6 bg-white shadow-md rounded-md">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 6: Product Images & Variants</h3>
        
//         {/* Main Product Image */}
//         <div>
//           <label htmlFor="mainImage" className="block text-gray-600 mb-2">
//             Upload Main Product Image
//           </label>
//           <input
//             type="file"
//             id="mainImage"
//             name="mainImage"
//             accept="image/*"
//             onChange={handleMainImageUpload}
//             className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           {productForm.mainImage && (
//             <div className="mt-4">
//               <img
//                 src={productForm.mainImage}
//                 alt="Main Product"
//                 className="h-[200px] w-[200px] object-cover rounded-md"
//               />
//             </div>
//           )}
//         </div>
  
//         {/* Additional Images */}
//         <div className="mt-6">
//           <label htmlFor="additionalImages" className="block text-gray-600 mb-2">
//             Upload Additional Images
//           </label>
//           <input
//             type="file"
//             id="additionalImages"
//             name="additionalImages"
//             accept="image/*"
//             multiple
//             onChange={handleAdditionalImageUpload}
//             className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
//             {productForm.additionalImages.map((image, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={image}
//                   alt={`Product ${index}`}
//                   className="h-[200px] w-[200px] object-cover rounded-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };
  

// const ProductForm = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         price: 0,
//         unitPrice: 0,
//         discount: 0,
//         discountPrice: 0,
//         deliveryCharges: 150,
//         deliveryTime: "5-7 business days",
//         currentStock: 0,
//         brand: "",
//         description: "",
//         warrenty: "Warrenty not available",
//         image: "",
//         imagePublic_id: "",
//         additionalImages: [],
//         tags: [],
//         category: "",
//         subCategory: "",
//         quantity: 0,
//         maxQuantity: 0,
//         totalRating: 0,
//         averageRating: 0,
//         ratingCount: 0,
//         fiveStars: 0,
//         fourStars: 0,
//         threeStars: 0,
//         twoStars: 0,
//         oneStars: 0,
//         stockStatus: "in stock",
//         attribute: [],
//         sku: "",
//         dimensions: { length: 0, width: 0, height: 0 },
//         weight: 0,
//         variants: [],
//         seller: ""
//     });

//     const updateFormData = (newData) => {
//       setFormData({ ...formData, ...newData });
//   };
//     const steps=[
//         {
//             id:1,
//             title:"Basic Product Information",
//             content:"content1",
//             component:()=><Step1/>
//         },
//         {
//             id:2,
//             title:"Product Attributes & Variants",
//             content:"content2",
//             component:()=><Step2 formValues={formData} updateFormData={updateFormData}/>
//         },
//         {
//             id:3,
//             title:"Product Description",
//             content:"content3",
//             component:()=><Step3 formValues={formData} updateFormData={updateFormData}/>
//         },
//         {
//             id:4,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step4 formValues={formData} updateFormData={updateFormData}/>
//         },
//         {
//             id:5,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step5 formValues={formData} updateFormData={updateFormData}/>
//         },
//         {
//             id:6,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step6 formValues={formData} updateFormData={updateFormData}/>
//         },
       
       
//     ];
//    const handleSubmit=(e)=>{
//     console.log(formData);
//    }

//   return (
   
//       <div className=" px-3  flex flex-col gap-xxl">
//         <Stepper steps={steps} handleSubmit={handleSubmit}/>
//       </div>
  
//   )
// }

// export default ProductForm






import React, { useEffect, useState } from 'react'
import Stepper from './Stepper'
import {  Button, useProductFormData,createProduct } from '../index';
import { useSelector,useDispatch } from 'react-redux';


  const Step1 = () => {
    const { productForm, setProductForm } = useProductFormData();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductForm(name, value);
    };
  
    return (
      <section className="p-6 shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Basic Product Information</h3>
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
              value={productForm?.name || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* SKU */}
          <div>
            <label htmlFor="sku" className="block text-gray-600 mb-2">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              placeholder="Enter SKU"
              value={productForm?.sku || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-600 mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter category"
              value={productForm?.category || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* Subcategory */}
          <div>
            <label htmlFor="subCategory" className="block text-gray-600 mb-2">
              Subcategory
            </label>
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              placeholder="Enter subcategory"
              value={productForm?.subCategory || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Tags */}
          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-gray-600 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter tags (comma-separated)"
              value={productForm?.tags || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Brands */}
          <div className="md:col-span-2">
            <label htmlFor="brand" className="block text-gray-600 mb-2">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Enter brand"
              value={productForm?.brand || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </form>
      </section>
    );
  };
  
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
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Product Description & SEO</h3>
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
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Meta Title */}
          <div>
            <label htmlFor="metaTitle" className="block text-gray-600 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              placeholder="Enter meta title"
              value={productForm.metaTitle || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Meta Description */}
          <div>
            <label htmlFor="metaDescription" className="block text-gray-600 mb-2">
              Meta Description
            </label>
            <input
              type="text"
              id="metaDescription"
              name="metaDescription"
              placeholder="Enter meta description"
              value={productForm.metaDescription || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
           {/* Keywords */}
           <div className="md:col-span-2">
            <label htmlFor="keywords" className="block text-gray-600 mb-2 ">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              placeholder="Enter keywords"
              value={productForm.keywords || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </section>
    );
  };

  const Step4 = () => {
    const { productForm, setProductForm } = useProductFormData();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductForm(name, value);
    };
  
    return (
      <section className="p-6 bg-white shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Pricing and Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Unit Price */}
          <div>
            <label htmlFor="unitPrice" className="block text-gray-600 mb-2">
              Unit Price
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              placeholder="Enter Unit price"
              value={productForm.unitPrice || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* Sale Price */}
          <div>
            <label htmlFor="price" className="block text-gray-600 mb-2">
              Sale Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter sale price"
              value={productForm.price || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Discount Price */}
          <div>
            <label htmlFor="discountPrice" className="block text-gray-600 mb-2">
              Discount Price
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              placeholder="Enter discount price"
              value={productForm.discountPrice || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* max Quantity */}
          <div>
            <label htmlFor="maxQuantity" className="block text-gray-600 mb-2">
              max Quantity
            </label>
            <input
              type="number"
              id="maxQuantity"
              name="maxQuantity"
              placeholder="Enter max quantity"
              value={productForm.maxQuantity || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Stock Quantity */}
          <div>
            <label htmlFor="currentStock" className="block text-gray-600 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              id="currentStock"
              name="currentStock"
              placeholder="Enter current Stock"
              value={productForm.currentStock || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
         
          {/* Low Stock Threshold */}
          <div>
            <label htmlFor="lowStockThreshold" className="block text-gray-600 mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              id="lowStockThreshold"
              name="lowStockThreshold"
              placeholder="Enter low stock threshold"
              value={productForm.lowStockThreshold || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </section>
    );
  };
  
  const Step5 = () => {
    const { productForm, setProductForm } = useProductFormData();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "weight") {
        setProductForm(name, value);
      }
      let dimensions={}
      switch (name) {
        case "length":
          
          dimensions.length=value
          setProductForm("dimensions", dimensions)
          break;
        case "width":
          dimensions.width=value
          setProductForm("dimensions", dimensions)
          break;
        case "height":
          dimensions.height=value
          setProductForm("dimensions", dimensions)
          break;
      
        default:
          break;
      }
    };
  
    return (
      <section className="p-6 bg-white shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 5: Shipping Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-gray-600 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Enter product weight"
              value={productForm.weight || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
  
          {/* Dimensions - Length */}
          <div>
            <label htmlFor="length" className="block text-gray-600 mb-2">
              Length (cm)
            </label>
            <input
              type="number"
              id="length"
              name="length"
              placeholder="Enter length"
              value={productForm.dimensions.length || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Dimensions - Width */}
          <div>
            <label htmlFor="width" className="block text-gray-600 mb-2">
              Width (cm)
            </label>
            <input
              type="number"
              id="width"
              name="width"
              placeholder="Enter width"
              value={productForm.dimensions.width || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Dimensions - Height */}
          <div>
            <label htmlFor="height" className="block text-gray-600 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Enter height"
              value={productForm.dimensions.height || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          {/* Shipping Class */}
          <div>
            <label htmlFor="shippingClass" className="block text-gray-600 mb-2">
              Shipping Class
            </label>
            <select
              id="shippingClass"
              name="shippingClass"
              value={productForm.shippingClass || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Shipping Class</option>
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>
        </div>
      </section>
    );
  };
  
  
  const Step6 = () => {
    const { productForm, setProductForm } = useProductFormData();
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const handleMainImageUpload = (e) => {
      const file = e.target.files[0]; // Assuming you're handling input files
      if (file) {
        // Create a new File instance with the modified name
        const modifiedFile = new File([file], "mainImage", { type: file.type });
    
        console.log("The modified file is:", modifiedFile);
    
        // Update the images state with the new file
        setImages((prevImages) => [modifiedFile,...prevImages]);
      }
    };
    
  
    const handleAdditionalImageUpload = (e) => {
      const files = Array.from(e.target.files);
      if (files.length) {
       
        setImages([...images, ...files]);
      }
      
    };
  
    const removeImage = (index) => {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    };
    const handleSubmit = () => {
  dispatch(createProduct({productForm,images}));
    
    
    };
  
    return (
      <section className="p-6 bg-white shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 6: Product Images & Variants</h3>
        
        {/* Main Product Image */}
        <div>
          <label htmlFor="mainImage" className="block text-gray-600 mb-2">
            Upload Main Product Image
          </label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleMainImageUpload}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {productForm.mainImage && (
            <div className="mt-4">
              <img
                src={productForm.mainImage}
                alt="Main Product"
                className="h-[200px] w-[200px] object-cover rounded-md"
              />
            </div>
          )}
        </div>
  
        {/* Additional Images */}
        <div className="mt-6">
          <label htmlFor="additionalImages" className="block text-gray-600 mb-2">
            Upload Additional Images
          </label>
          <input
            type="file"
            id="additionalImages"
            name="additionalImages"
            accept="image/*"
            multiple
            onChange={handleAdditionalImageUpload}
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
        <div className="submit mt-xl">
          <Button
            type="submit"
            children="Create Product"
            className="bg-primary-base p-p-xxs rounded-md text-lg  text-white"
            onClick={handleSubmit}
          />
        </div>
      </section>
    );
  };
  

const ProductForm = () => {

    const steps=[
        {
            id:1,
            title:"Basic Product Information",
            content:"content1",
            component:()=><Step1/>
        },
        {
            id:2,
            title:"Product Attributes & Variants",
            content:"content2",
            component:()=><Step2 />
        },
        {
            id:3,
            title:"Product Description",
            content:"content3",
            component:()=><Step3/>
        },
        {
            id:4,
            title:"Product Images",
            content:"content4",
            component:()=><Step4 />
        },
        {
            id:5,
            title:"Product Images",
            content:"content4",
            component:()=><Step5 />
        },
        {
            id:6,
            title:"Product Images",
            content:"content4",
            component:()=><Step6/>
        },
       
       
    ];
  return (
   
      <div className=" px-3  flex flex-col gap-xxl">
        <Stepper steps={steps}/>
      </div>
  
  )
}

export default ProductForm
// const ProductForm = () => {
//   const { productForm } = useProductFormData();

//     const steps=[
//         {
//             id:1,
//             title:"Basic Product Information",
//             content:"content1",
//             component:()=><Step1 />
//         },
//         {
//             id:2,
//             title:"Product Attributes & Variants",
//             content:"content2",
//             component:()=><Step2/>
//         },
//         {
//             id:3,
//             title:"Product Description",
//             content:"content3",
//             component:()=><Step3 />
//         },
//         {
//             id:4,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step4 />
//         },
//         {
//             id:5,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step5/>
//         },
//         {
//             id:6,
//             title:"Product Images",
//             content:"content4",
//             component:()=><Step6/>
//         },
       
       
//     ];
//    const handleSubmit=(e)=>{
//     console.log(productForm);
//    }

//   return (
   
//       <div className=" px-3  flex flex-col gap-xxl">
//         <Stepper steps={steps} handleSubmit={handleSubmit}/>
//       </div>
  
//   )
// }

// export default ProductForm