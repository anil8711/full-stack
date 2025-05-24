import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'react-toastify';


const Watch = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all products on first mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        const fetched = res.data.data || [];

        // Check if redirected with a new product
        const passedProduct = location.state?.createdProduct;

        if (passedProduct) {
          // Add new product on top, if not already in list
          const exists = fetched.some(p => p._id === passedProduct._id);
          setProducts(exists ? fetched : [passedProduct, ...fetched]);
        } else {
          setProducts(fetched);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
      }
    };

    fetchProducts();
  }, [location.state]);


  return (
    <div className="p-6">
      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Price:</strong> ${product.price}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {product.category}</p>
                <p className="text-sm text-gray-600 mb-3"><strong>Description:</strong> {product.description}</p>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-6">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>

  );
};

export default Watch;
