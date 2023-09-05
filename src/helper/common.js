const response = (res, result, status, message, pagination)=>{
    const resultPrint = {}
    resultPrint.status = 'success'
    if (status >= 400) {
        resultPrint.status = 'error'
    }
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    resultPrint.pagination = pagination || {}
    res.status(status).json(resultPrint)
}

module.exports = {response}