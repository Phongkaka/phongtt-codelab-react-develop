import Request from 'app/utils/request'
// import Storage from 'app/utils/storage'
import Configs from 'app/configs'

const endpoint = `${Configs.API_URL}/api/v1`

function checkEndpointAuth(event, data) {
  // if (event !== 'response:error') return
  //
  // const { response } = data
  //
  // if (response.status === 401 &&
  //   response.url &&
  //   response.url.startsWith(Configs.API_URL)
  // ) {
  //   Storage.remove('ACCESS_TOKEN')
  //   Storage.remove('USER_INFO')
  //
  //   // eslint-disable-next-line
  //   location.href = '/login'
  // }
}

Request.registerInterceptor('endpoint-auth', checkEndpointAuth)

const MainApi = Request.create({
  endpoint,
  handleToken: true
})

const AuthApi = Request.create({
  endpoint
})

export { MainApi, AuthApi }
