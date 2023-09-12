import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import ConfirmDeleteModal from './ConfirmDeleteModal'

function Home() {
  const [clients, setClients] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const clientsPerPage = 5
  const [selectedClientId, setSelectedClientId] = useState(null) // Track the selected client for deletion
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/clients')
        setClients(res.data.data)
      } catch (err) {
        // console.log(err)
      }
    }
    fetchAllClients()
  }, [])

  // console.log(clients)

  const handlePageClick = (data) => {
    const selectedPage = data.selected
    setPageNumber(selectedPage)
  }

  const clientsToDisplay = clients.slice(
    pageNumber * clientsPerPage,
    (pageNumber + 1) * clientsPerPage
  )

  function getDate(dateString) {
    const date = new Date(dateString)
    const options = { day: '2-digit', month: 'long', year: 'numeric' }
    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
  }

  function getTime(dateString) {
    const date = new Date(dateString)
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }
    const time = date.toLocaleString('en-US', options)
    return time
  }

  const handleDelete = async (id) => {
    setSelectedClientId(id)
    setIsConfirmationModalOpen(true)
  }

  return (
    <>
      <div className='container p-2'>
        <p className='text-2xl text-center p-1 text-teal-500'>Waiting list</p>
        <p className='text-1xl text-center text-slate-600'>
          CRUD Application React vite, Tailwindcss, Node.js and MySQL
        </p>

        <div className='p-5 mx-auto'>
          <Link
            to='/add-client'
            className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded'
          >
            Add clinet
          </Link>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg '>
          <table className='w-full bg-white border border-gray-300'>
            <thead className='text-left'>
              <tr className='bg-gray-100'>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Clinet ID</th>
                <th className='py-2 px-4 border-b'>Priority</th>
                <th className='py-2 px-4 border-b'>Date</th>
                <th className='py-2 px-4 border-b'>Time</th>
                <th className='py-2 px-4 border-b'>Action</th>
              </tr>
            </thead>
            <tbody>
              {clientsToDisplay.map((client) => (
                <tr key={client._id}>
                  <td className='py-2 px-4 border-b'>{client.clinetname}</td>
                  <td className='py-2 px-4 border-b'>{client.clinetid}</td>
                  <td
                    className={`py-2 px-4 border-b ${
                      client.priority == 'Quick' ? 'text-red-500' : ''
                    }`}
                  >
                    {client.priority}
                  </td>
                  <td className='py-2 px-4 border-b'>
                    {getDate(client.created_at)}
                  </td>
                  <td className='py-2 px-4 border-b'>
                    {getTime(client.created_at)}
                  </td>
                  <td className='py-2 px-4 border-b'>
                    <button
                      className='mr-4'
                      onClick={() => handleDelete(client._id)}
                    >
                      <FaTrash
                        style={{
                          color: '#c43372',
                          display: 'inline-block',
                        }}
                      />
                    </button>

                    <button className='update'>
                      <Link to={`/update/${client._id}`}>
                        <FaEdit
                          style={{ color: '#78b550', display: 'inline-block' }}
                        />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='my-4 flex justify-center'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(clients.length / clientsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={'pagination flex'}
          previousLinkClassName={
            'px-3 p-1 mr-2 rounded bg-teal-500 text-white hover:bg-teal-600'
          }
          nextLinkClassName={
            'px-3 p-1 ml-2 rounded bg-teal-500 text-white hover:bg-teal-600'
          }
          pageClassName={'px-3 rounded'}
          breakClassName={'px-3 rounded'}
          disabledClassName={'text-gray-400 pointer-events-none'}
          activeClassName={'bg-teal-600 text-white'}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={async () => {
          if (selectedClientId) {
            try {
              await axios.delete(
                `http://localhost:5000/clients/${selectedClientId}`
              )
              window.location.reload()
            } catch (err) {
              // Handle error
            }
          }
        }}
      />
    </>
  )
}

export default Home
