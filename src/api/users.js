import { MainApi } from './endpoint'

export function getUsers(payload) {
  return MainApi.get('/users', payload)
}

export function createUser(payload) {
  return MainApi.post('/users', payload)
}

export function updateUser({ id, ...payload }) {
  return MainApi.put(`/users/${id}`, payload)
}

export function deleteUser({ id }) {
  return MainApi.delete(`/users/${id}`)
}

export function getProfile() {
  return MainApi.get('/profile')
}

export function updateProfile(data) {
  return MainApi.put('/profile', data)
}

export function changePassword(data) {
  return MainApi.put('/profile/password', data)
}
