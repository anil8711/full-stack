import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../../../utils/axiosConfig';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ActionButton = ({ onClick, icon: Icon, color, title }) => (
    <button
        onClick={onClick}
        title={title}
        className={`text-white p-2 rounded hover:opacity-90 transition-colors duration-200 ${color}`}
    >
        <Icon />
    </button>
);

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosInstance.get('/products'); // adjust endpoint if needed
                setProducts(res.data.data || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load products.');
            }
        };

        fetchProducts();
    }, []);

    const handleUpdate = (product) => {
        alert(`Edit logic for ${product.name}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axiosInstance.delete(`/products/${id}`);
                setProducts((prev) => prev.filter((p) => p._id !== id));
                toast.success('Product deleted successfully');
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete product');
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>
                <Link
                    to="create"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                    + Add Product
                </Link>
            </div>

            {error ? (
                <p className="text-red-500 mb-4">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="text-left py-3 px-4 border-b">Name</th>
                                <th className="text-left py-3 px-4 border-b">Price</th>
                                <th className="text-left py-3 px-4 border-b">Category</th>
                                <th className="text-left py-3 px-4 border-b">Description</th>
                                <th className="text-left py-3 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{product.name}</td>
                                        <td className="py-3 px-4 border-b">${product.price}</td>
                                        <td className="py-3 px-4 border-b">{product.category}</td>
                                        <td className="py-3 px-4 border-b">{product.description}</td>
                                        <td className="py-3 px-4 border-b space-x-2 flex">
                                            <Link to={`${product._id}`} title="View">
                                                <ActionButton
                                                    icon={FaEye}
                                                    color="bg-blue-500"
                                                    title="Edit"
                                                />
                                            </Link>
                                            <Link to={`/admin/products/edit/${product._id}`}>
                                                <ActionButton
                                                    icon={FaPen}
                                                    color="bg-yellow-500"
                                                    title="Edit"
                                                />
                                            </Link>
                                            <ActionButton
                                                onClick={() => handleDelete(product._id)}
                                                icon={FaTrash}
                                                color="bg-red-500"
                                                title="Delete"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
