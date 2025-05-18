const responseApi = {
  success: (res, data, responseCode = 200) => {
    return res.status(responseCode).json(data)
  },

  badRequest: (res, message, details) => {
    const response = {
      errors: {
        message
      }
    }
    for(const detail of details) {
      response.errors[detail.context.label] = [detail.message]
    }
    res.status(400)
    res.json(response)
  },

  conflict: (res, message) => {
    res.status(409).json({
      errors: {
        message
      }
    })
  },
  
  notFound: (res, message) => {
    res.status(404).json({
      errors: {
        message
      }
    })
  },
  
  unAutorized: (res, message) => {
    res.status(401).json({
      errors: {
        message
      }
    })
  },

  error: (res, message) => {
    res.status(500).json({
      errors: {
        message
      }
    })
  }
}

export default responseApi