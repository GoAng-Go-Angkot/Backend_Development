const responseApi = {
  success: (res, data, responseCode = 200) => {
    return res.status(responseCode).json(data)
  },

  badRequest: (res, message, details) => {
    const response = {
      message
    }
    for(const detail of details) {
      response[detail.context.label] = [detail.message]
    }
    res.status(400)
    res.json(response)
  },

  conflict: (res, message) => {
    res.status(409).json({
      error: {
        message
      }
    })
  },
  
  notFound: (res, message) => {
    res.status(404).json({
      error: {
        message
      }
    })
  },

  error: (res, message) => {
    res.status(500).json({
      error: {
        message
      }
    })
  }
}

export default responseApi