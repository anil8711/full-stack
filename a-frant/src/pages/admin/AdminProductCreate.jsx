import React, { useRef, useState } from 'react';
import axiosInstance from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AdminProductCreate = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const isFeaturedRef = useRef();
  const hasDiscountRef = useRef();
  const discountTypeRef = useRef();
  const discountValueRef = useRef();
  const imageRef = useRef();

  const navigate = useNavigate();

  const categories = ['electronics', 'clothing', 'books', 'furniture', 'other', 'watch'];

  const [errors, setErrors] = useState({});

  const validate = () => {
    const name = nameRef.current.value.trim();
    const price = priceRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const category = categoryRef.current.value.trim();
    const hasDiscount = hasDiscountRef.current.checked;
    const discountValue = discountValueRef.current.value.trim();

    const newErrors = {};

    if (!name) newErrors.name = 'Product name is required';
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = 'Valid price is required';
    if (!description) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';

    if (hasDiscount) {
      if (!discountValue || isNaN(discountValue) || Number(discountValue) <= 0) {
        newErrors.discountValue = 'Valid discount value is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const originalPrice = parseFloat(priceRef.current.value.trim());
    const hasDiscount = hasDiscountRef.current.checked;
    const discountType = discountTypeRef.current.value;
    const discountValue = parseFloat(discountValueRef.current.value.trim()) || 0;

    // Calculate discounted price if discount applies
    let discountedPrice = originalPrice;
    if (hasDiscount) {
      if (discountType === 'percentage') {
        discountedPrice = originalPrice - (originalPrice * discountValue) / 100;
      } else if (discountType === 'rupees') {
        discountedPrice = originalPrice - discountValue;
      }
      if (discountedPrice < 0) discountedPrice = 0;
    }

    // Prepare form data for multipart/form-data (for file upload)
    const formData = new FormData();
    formData.append('name', nameRef.current.value.trim());
    formData.append('price', originalPrice);
    formData.append('description', descriptionRef.current.value.trim());
    formData.append('category', categoryRef.current.value.trim());
    formData.append('isFeatured', isFeaturedRef.current.checked ? 'true' : 'false');
    formData.append('hasDiscount', hasDiscount ? 'true' : 'false');
    formData.append('discountType', hasDiscount ? discountType : '');
    formData.append('discountValue', hasDiscount ? discountValue : 0);
    formData.append('discountedPrice', hasDiscount ? discountedPrice : originalPrice);

    if (imageRef.current.files.length > 0) {
      formData.append('image', imageRef.current.files[0]);
    } else {
      // If image is required, you may want to add validation for this as well
      formData.append('image', ''); // Send empty if no image
    }

    try {
      const response = await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Product created successfully');
        e.target.reset(); // clear form
        setErrors({});
        navigate('/admin/products');
      } else {
        toast.error('Error submitting product');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong while submitting.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">
            Product Name
            {errors.name && <span className="text-red-500 text-sm ml-2">({errors.name})</span>}
          </label>
          <input
            type="text"
            ref={nameRef}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">
            Price
            {errors.price && <span className="text-red-500 text-sm ml-2">({errors.price})</span>}
          </label>
          <input
            type="text"
            ref={priceRef}
            className={`w-full border p-2 rounded ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Description
            {errors.description && <span className="text-red-500 text-sm ml-2">({errors.description})</span>}
          </label>
          <textarea
            ref={descriptionRef}
            className={`w-full border p-2 rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block mb-1 font-medium">
            Category
            {errors.category && <span className="text-red-500 text-sm ml-2">({errors.category})</span>}
          </label>
          <select
            ref={categoryRef}
            defaultValue=""
            className={`w-full border p-2 rounded ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Is Featured */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" ref={isFeaturedRef} id="isFeatured" />
          <label htmlFor="isFeatured" className="font-medium">
            Featured Product
          </label>
        </div>

        {/* Has Discount */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" ref={hasDiscountRef} id="hasDiscount" />
          <label htmlFor="hasDiscount" className="font-medium">
            Give Discount
          </label>
        </div>

        {/* Discount Type */}
        <div>
          <label className="block mb-1 font-medium">Discount Type</label>
          <select ref={discountTypeRef} defaultValue="percentage" className="w-full border p-2 rounded">
            <option value="percentage">Percentage</option>
            <option value="rupees">Rupees</option>
          </select>
        </div>

        {/* Discount Value */}
        <div>
          <label className="block mb-1 font-medium">
            Discount Value
            {errors.discountValue && <span className="text-red-500 text-sm ml-2">({errors.discountValue})</span>}
          </label>
          <input type="text" ref={discountValueRef} className={`w-full border p-2 rounded ${errors.discountValue ? 'border-red-500' : 'border-gray-300'}`} />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input type="file" ref={imageRef} accept="image/*" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductCreate;
