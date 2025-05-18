import pgClient from "../config/pgClient.js"

const routeModel = {
  getRoutes: async () => {
    const result = await pgClient.query(`SELECT * FROM route`)
    return result.rows
  }
}

export default routeModel