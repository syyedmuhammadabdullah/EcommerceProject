import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        unitPrice: '',
        discount: '',
        brand: '',
        description: '',
        image: '',
        category: '',
        subCategory: '',
        quantity: '',
        tags: '',
        // Add other fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/products/createProduct', product); // Adjust the endpoint as needed
            console.log('Product created:', response.data);
            // Optionally reset the form or provide feedback
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Unit Price:
                    <input
                        type="number"
                        name="unitPrice"
                        value={product.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Discount:
                    <input
                        type="number"
                        name="discount"
                        value={product.discount}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Sub-category:
                    <input
                        type="text"
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tags (comma-separated):
                    <input
                        type="text"
                        name="tags"
                        value={product.tags}
                        onChange={handleChange}
                    />
                </label>
            </div>
            {/* Add more fields as necessary for your schema */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
