const ResponseHandler = ( res, status_code, data, success, message = "" ) => {
    const response = { data, success, message }
    return res.status(status_code).json(response);
}

module.exports = ResponseHandler