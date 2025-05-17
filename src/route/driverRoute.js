import express from 'express'
import driverController from '../controller/driverController.js'
import cekDriver from '../middleware/cekDriver.js'

const driverRoute = express.Router()

driverRoute.post('/register', driverController.register)
driverRoute.post('/login', driverController.login)
driverRoute.get('/', cekDriver, driverController.getProfile)

export default driverRoute