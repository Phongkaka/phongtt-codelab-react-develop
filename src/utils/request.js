import lodash from 'lodash'
import Storage from 'app/utils/storage'

// eslint-disable-next-line no-underscore-dangle
let _requests = 0
// eslint-disable-next-line no-underscore-dangle
let _interceptors = {}

function triggerInterceptors(event, data = {}) {
  lodash.forEach(_interceptors, (interceptor) => {
    interceptor(event, data)
  })
}

class Request {
  static create(options) {
    return new Request(options)
  }

  static registerInterceptor(name, interceptor) {
    _interceptors[name] = interceptor
  }

  static unregisterInterceptor(name) {
    _interceptors = lodash.omit(_interceptors, name)
  }

  constructor(options) {
    this._options = options
  }

  get(url, params) {
    return this.request({ method: 'GET', url, params })
  }

  post(url, data, params) {
    return this.request({ method: 'POST', url, params, data })
  }

  put(url, data, params) {
    return this.request({ method: 'PUT', url, params, data })
  }

  delete(url, data, params) {
    return this.request({ method: 'DELETE', url, params: { ...data, ...params } })
  }

  async request(...args) {
    _requests += 1

    triggerInterceptors('request:start', { requests: _requests })

    try {
      return await this._request(...args)
    } finally {
      triggerInterceptors('request:done', { requests: _requests })

      _requests -= 1
    }
  }

  async _request(requestOptions) {
    const { method = 'GET', data = null } = requestOptions
    let { url, params = null } = requestOptions

    url = this._options.endpoint + url

    if (this._options.handleToken) {
      const token = Storage.get('ACCESS_TOKEN')

      if (token) {
        this._authorization = token
        // if (!params) params = {}
        // params.access_token = token
      }
    }

    if (params) {
      url += this._getQueryString(params)
    }

    const options = {
      method,
      headers: {}
    }

    if (this._authorization) {
      options.headers.Authorization = this._authorization
    }

    if (method === 'POST' || method === 'PUT') {
      if (data) {
        const serializable = lodash.isPlainObject(data) || lodash.isArray(data)

        options.body = serializable ? JSON.stringify(data) : data

        let contentType = null

        if (serializable) {
          contentType = 'application/json'
        }

        if (contentType) {
          options.headers['Content-Type'] = contentType
        }
      }
    }

    // console.log(method, url, data, params)

    const res = await fetch(url, options)

    if (!res.ok) {
      triggerInterceptors('response:error', { response: res })
      throw res
    }

    const text = await res.text()

    try {
      const responseData = JSON.parse(text)

      return responseData
    } catch (error) {
      triggerInterceptors('response:error.json', { error, response: res })
      /* eslint-disable no-console */
      console.error('[request] parse JSON response error:', method, url, data, params, text, error)
      throw error
    }
  }

  _getQueryString(params) {
    const parts = []

    lodash.forEach(params, (value, key) => {
      const values = lodash.isArray(value) ? value : [value]
      const operator = lodash.isArray(value) ? '[]=' : '='

      lodash.forEach(values, (v) => {
        parts.push(key + operator + encodeURIComponent(v))
      })
    })

    const queryString = parts.join('&')

    return queryString ? `?${queryString}` : ''
  }
}

export default Request
