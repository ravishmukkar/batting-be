class ApiError extends Error {
    constructor ( message, status_code ){
        super(message)
        this.status_code = status_code
        this.message = message
    }
}

module.exports = ApiError