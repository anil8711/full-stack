import React from 'react'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
                {/* Modal Header */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmation</h2>

                {/* Modal Body */}
                <div className="text-gray-700 mb-6">
                    {message}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
