import axios from 'axios'
import { useState, useEffect } from 'react' // useEffect,
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const clientId = location.pathname.split('/')[2]

  const [clientUpdate, setClientUpdate] = useState({
    clinetname: '',
    priority: 'Normal',
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clients/${clientId}`)
        setClientUpdate({
          clinetname: res.data.clinetname,
          priority: res.data.priority,
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllClients()
  }, [clientId])

  const handleChange = (e) => {
    setClientUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:5000/clients/${clientId}`, clientUpdate)
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
          <h1 className='pb-3'>Update client name</h1>
          <form onSubmit={handleSubmit} className=''>
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Clinet name'
                name='clinetname'
                value={clientUpdate.clinetname}
                onChange={handleChange}
                className='appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500'
              />
            </div>

            <div className='mb-4'>
              <select
                className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500'
                name='priority'
                value={clientUpdate.priority}
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
              Update
            </button>
          </form>

          {error && 'Something went wrong!'}
        </div>
      </div>
    </>
  )
}

export default Update
