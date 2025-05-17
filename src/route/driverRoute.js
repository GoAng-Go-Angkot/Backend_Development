import express from 'express'
import driverController from '../controller/driverController.js'

const driverRoute = express.Router()

driverRoute.post('/register', driverController.register)
driverRoute.post('/login', driverController.login)

export default driverRoute