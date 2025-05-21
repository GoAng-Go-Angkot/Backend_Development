import pgClient from "../config/pgClient.js"
import DatabaseError from "../exception/DatabaseError.js"
import bcrypt from 'bcrypt'

const clientModel = {
  checkEmail: async email => {
    const result = await pgClient.query(`SELECT * FROM client WHERE email = '${email}'`)
    if(result.rowCount > 0) {
      throw new DatabaseError('Email already exist', 'conflict')
    }
  },

  insert: async data => {
    const hashPassword = await bcrypt.hash(data.password, 12)
    await pgClient.query(`INSERT INTO client (username, email, password) VALUES ('${data.username}', '${data.email}', '${hashPassword}')`)
  },

  getClient: async email => {
    const result = await pgClient.query(`SELECT * FROM client WHERE email = '${email}'`)
    if(result.rowCount === 0) {
      throw new DatabaseError('Email not found', 'not_found')
    }
    return result.rows[0]
  },

  insertToken: async (data) => {
    await pgClient.query(`INSERT INTO client_session (email, token) VALUES ('${data.email}', '${data.token}')`)
  },

  checkToken: async (token) => {
    const result = await pgClient.query(`SELECT * FROM client_session WHERE token = '${token}'`)
    if(result.rowCount === 0) {
      throw new DatabaseError('Token not found', 'not_found')
    }
    return result.rows[0]
  },

  deleteToken: async (token) => {
    await pgClient.query(`DELETE FROM client_session WHERE token = '${token}'`)
  }

}

export default clientModel