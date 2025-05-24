import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosConfig'
import { toast } from 'react-toastify'
import ConfirmationModal from '../../components/ConfirmationModal' // adjust path if needed

const OneContacUs = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [contact, setContact] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`contact-us/${id}`)
                if (response.status === 200) {
                    setContact(response.data.data)
                    toast.success("Data fetched successfully")
                }
            } catch (error) {
                toast.error("Failed to fetch data")
                console.error(error)
            }
        }

        fetchData()
    }, [id])

    const handleDeleteConfirm = async () => {
        try {
            const res = await axiosInstance.delete(`contact-us/${id}`)
            if (res.status === 200) {
                toast.success("Deleted successfully")
                navigate("/admin/contact")
            }
        } catch (error) {
            toast.error("Failed to delete message")
            console.error(error)
        }
    }

    const handleEdit = () => {
        navigate(`/admin/contact-us/edit/${id}`)
    }

    if (!contact) return <div className="text-center py-10 text-gray-500">Loading...</div>

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Contact Us Details</h2>

                <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Name:</span> {contact.name}</p>
                    <p><span className="font-semibold">Email:</span> {contact.email}</p>
                    <p><span className="font-semibold">Message:</span> {contact.message}</p>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                message={<p>Are you sure you want to delete this message?</p>}
            />
        </>
    )
}

export default OneContacUs
