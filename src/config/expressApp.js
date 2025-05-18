import express from "express"
import fs from 'fs/promises'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import errorHandler from "../middleware/error-handler.js";
import driverRoute from "../route/driverRoute.js";
import clientRoute from "../route/clientRoute.js";
import routeRoute from "../route/routeRoute.js";

// express instance
const app = express()

// configuration
app.set("trust proxy", true);
app.use(cors())

// add functionality
app.use(express.json())

// add route
app.use('/api/driver', driverRoute)
app.use('/api/client', clientRoute)
app.use('/api/route', routeRoute)

// error handler
app.use(errorHandler)

// api docs
const apiDocs = JSON.parse(await fs.readFile('./api-docs.json'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs, {
  customCss: '.swagger-ui .topbar { display: none }'
}));


export default app