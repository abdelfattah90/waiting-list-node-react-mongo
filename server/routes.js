import express from 'express'
import { Client } from './client.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('In the name of Allah the Merciful')
})

router.get('/clients/:id', async (request, response) => {
  try {
    const { id } = request.params

    const client = await Client.findById(id)

    if (!client) {
      return response.status(404).json({ message: 'Client not found' })
    }

    return response.status(200).json(client)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.get('/clients', async (request, response) => {
  try {
    const clients = await Client.find({}).sort({ created_at: -1 })

    return response.status(200).json({
      count: clients.length,
      data: clients,
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.post('/clients', async (request, response) => {
  try {
    if (
      !request.body.clinetname ||
      !request.body.clinetid ||
      !request.body.priority
    ) {
      return response.status(400).send({
        message: 'Send all required fields: clinetname, clinetid, priority',
      })
    }
    const newClient = {
      clinetname: request.body.clinetname,
      clinetid: request.body.clinetid,
      priority: request.body.priority,
    }

    const client = await Client.create(newClient)

    return response.status(201).send(client)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

router.put('/clients/:id', async (request, response) => {
  try {
    if (!request.body.clinetname) {
      return response.status(400).send({
        message: 'Send all required fields: clinetname, clinetid, priority',
      })
    }

    const { id } = request.params

    const result = await Client.findByIdAndUpdate(id, request.body)

    if (!result) {
      return response.status(404).json({ message: 'Client not found' })
    }

    return response.status(200).send({ message: 'Client updated successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

// Route for Delete a book
router.delete('/clients/:id', async (request, response) => {
  try {
    const { id } = request.params

    const result = await Client.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ message: 'Client not found' })
    }

    return response.status(200).send({ message: 'Client deleted successfully' })
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
})

export default router
