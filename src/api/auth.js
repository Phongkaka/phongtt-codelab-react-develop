import { AuthApi } from './endpoint'

export function login(payload) {
  return AuthApi.post('/auth/login', payload)
}
