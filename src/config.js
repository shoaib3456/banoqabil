module.exports = {
    // apiBaseUrl: 'http://192.168.0.102:5134/api'
    apiBaseUrl: process.env.REACT_APP_API_URL,
    apiHeader: {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    }
}