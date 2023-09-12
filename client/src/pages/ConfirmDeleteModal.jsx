const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className='modal-overlay absolute inset-0 bg-gray-900 opacity-50'></div>

      <div className='modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto'>
        <div className='modal-content py-4 text-left px-6'>
          <div className='modal-close cursor-pointer z-50'>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-800 absolute right-0 top-0 m-6'
            >
              <span className='text-2xl'>×</span>
            </button>
          </div>

          <div className='modal-body py-4 text-center'>
            <p className='text-2xl font-bold'>Confirmation</p>
            <p className='text-gray-700 mt-2'>
              Are you sure you want to delete this client?
            </p>
          </div>

          <div className='modal-footer py-4'>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className='px-4 bg-teal-500 p-3 rounded-lg text-white hover:bg-teal-400'
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className='px-4 bg-gray-200 p-3 rounded-lg text-gray-700 hover:bg-gray-300 ml-2'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
