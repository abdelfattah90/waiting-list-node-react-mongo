import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Add() {
  function generateRandomId() {
    const char = String.fromCharCode(65 + Math.floor(Math.random() * 26))
    const numbers = Math.floor(1000 + Math.random() * 9000)
    return char + numbers
  }

  const randomId = generateRandomId()

  const [client, setClient] = useState({
    clinetname: '',
    clinetid: randomId.toString(),
    priority: 'Normal',
  })

  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setClient((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/clients', client)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <>
      <div className='container p-5 mx-auto'>
        <Link
          to='/'
          className='my-5 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
        >
          Back
        </Link>
      </div>

      <div className='container mx-auto p-5'>
        <div className='max-w-sm mx-auto'>
          <h1 className='pb-3'>Add a new client</h1>
          <form onSubmit={handleSubmit} className=''>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Clinet name'
                name='clinetname'
                onChange={handleChange}
                className='appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500'
              />
            </div>

            <div className='mb-4'>
              <select
                className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500'
                name='priority'
                onChange={handleChange}
              >
                <option value='Normal'>Normal</option>
                <option value='Quick'>Quick</option>
              </select>
            </div>

            <button
              type='submit'
              className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded'
            >
              Add
            </button>
          </form>

          {error && 'Something went wrong!'}
        </div>
      </div>
    </>
  )
}

export default Add
