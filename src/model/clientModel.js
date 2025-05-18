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
  }

}

export default clientModel