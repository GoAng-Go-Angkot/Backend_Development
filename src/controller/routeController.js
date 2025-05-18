import routeModel from "../model/routeModel.js"
import responseApi from "../utils/responseApi.js"

const routeController = {
  getRoute: async (req, res, next) => {
    try {
      // get route data
      let routes = await routeModel.getRoutes()

      routes = routes.map(e => {
        return ({
          number: e.route_num,
          start_base: {
            long: e.start_base_long,
            lat: e.start_base_lat
          },
          end_base: {
            long: e.end_base_long,
            lat: e.end_base_lat
          },
          description: e.description
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