import express from "express"
import fs from 'fs/promises'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import errorHandler from "../middleware/error-handler.js";
import driverRoute from "../route/driverRoute.js";
import clientRoute from "../route/clientRoute.js";
import routeRoute from "../route/routeRoute.js";
import http from 'http'
import { attachWebSocket } from "./wsApp.js";
import { LIVE_URL } from "./env.js";
import morgan from 'morgan'

// express instance
const app = express()

// configuration
app.set("trust proxy", true);
app.use(cors())

// add functionality
app.use(express.json())

// add logger
app.use(morgan('tiny', {
  immediate: true
}))

// add route
app.use('/api/driver', driverRoute)
app.use('/api/client', clientRoute)
app.use('/api/route', routeRoute)

// error handler
app.use(errorHandler)

// api docs
const apiDocs = JSON.parse(await fs.readFile('./api-docs.json'))
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  apiDocs.servers = [
    {
      url: LIVE_URL,
      description: "Live server"
    },
    {
      url: 'http://localhost:3000/api',
      description: "Dev server"
    }
  ]
  swaggerUi.setup(apiDocs, {
    customCss: '.swagger-ui .topbar { display: none }'
  })(req, res, next)
});

// define web socket
const expressServer = http.createServer(app);
attachWebSocket(expressServer)

export default expressServer