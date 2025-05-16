import express from "express"
import fs from 'fs/promises'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'

// express instance
const app = express()

// configuration
app.set("trust proxy", true);
app.use(cors())

// add functionality
app.use(express.json())

// api docs
const apiDocs = JSON.parse(await fs.readFile('./api-docs.json'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs, {
  customCss: '.swagger-ui .topbar { display: none }'
}));


export default app