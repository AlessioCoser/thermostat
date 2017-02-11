import axios from 'axios'

module.exports = {
  _hasNoErrors: function (response) {
    if ((response.statusText === 'OK') && (!response.data.err)) {
      return true
    }
    return false
  },
  _handleResponse: function (response) {
    if (this._hasNoErrors(response)) {
      return response.data.value
    }
  },
  get: function (url) {
    return axios.get(url)
    .then((response) => this._handleResponse(response))
  }
}
