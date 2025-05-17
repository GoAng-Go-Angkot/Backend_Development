import express from 'express'
import routeController from '../controller/routeController.js'
import cekClient from '../middleware/cekClient.js'

const routeRoute = express.Router()

routeRoute.get('/', cekClient, routeController.getRoute)

export default routeRoute