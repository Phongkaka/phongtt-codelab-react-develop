import { MainApi } from './endpoint'

export function getTopics(payload) {
  return MainApi.get('/topics', payload)
}

export function getAllTopics(payload) {
  return MainApi.get('/topics/all', payload)
}

export function createTopic(payload) {
  return MainApi.post('/topics', payload)
}

export function updateTopic({ id, ...payload }) {
  return MainApi.put(`/topics/${id}`, payload)
}

export function deleteTopic({ id }) {
  return MainApi.delete(`/topics/${id}`)
}

export function approveTopic({ id }) {
  return MainApi.put(`/topics/approve/${id}`)
}
