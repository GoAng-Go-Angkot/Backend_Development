import { Client } from 'pg'
import { POSTGRESQL_DB, POSTGRESQL_HOST, POSTGRESQL_PASSWORD, POSTGRESQL_PORT, POSTGRESQL_USERNAME } from './env.js'
 
const pgClient = new Client({
  user: POSTGRESQL_USERNAME,
  password: POSTGRESQL_PASSWORD,
  host: POSTGRESQL_HOST,
  port: POSTGRESQL_PORT,
  database: POSTGRESQL_DB,
})

export default pgClient