import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosConfig'
import { toast } from 'react-toastify'

const EditContactUs = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axiosInstance.get(`contact-us/${id}`)
                if (res.status === 200) {
                    setFormData(res.data.data)
                    setLoading(false)
                }
            } catch (err) {
                toast.error('Failed to load contact details')
                setLoading(false)
            }
        }

        fetchContact()
    }, [id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axiosInstance.put(`contact-us/${id}`, formData)
            if (res.status === 200) {
                toast.success('Contact updated successfully')
                navigate(`/admin/contact/${id}`)
            }
        } catch (err) {
            toast.error('Failed to update contact')
            console.error(err)
        }
    }

    if (loading) return <div className="text-center py-10 text-gray-500">Loading...</div>

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-blue-600">Edit Contact Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                        required
                    ></textarea>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditContactUs
