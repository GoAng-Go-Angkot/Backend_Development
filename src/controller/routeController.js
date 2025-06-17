import routeModel from "../model/routeModel.js"
import responseApi from "../utils/responseApi.js"

const routeController = {
  getRoute: async (req, res, next) => {
    try {
      // get route data
      let routes = await routeModel.getRoutes()

      // parse
      routes = routes.map(e => {
        return ({
          number: e.route_num,
          description: e.description,
          point: e.route_point
        })
      })

      // response
      return responseApi.success(res, { data: routes }, 200)
    } catch(err) {
      next(err)
    }
  }
}

export default routeController