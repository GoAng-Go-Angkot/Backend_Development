import express from 'express'
import clientController from '../controller/clientController.js'
import cekClient from '../middleware/cekClient.js'

const clientRoute = express.Router()

clientRoute.post('/register', clientController.register)
clientRoute.post('/login', clientController.login)
clientRoute.get('/', cekClient, clientController.getProfile)

export default clientRoute