import { MainApi } from './endpoint'

export function getCategories(payload) {
  return MainApi.get('/categories', payload)
}
export function getAllCategories() {
  return MainApi.get('/categories/all')
}

export function createCategory(payload) {
  return MainApi.post('/categories', payload)
}

export function updateCategory({ id, ...payload }) {
  return MainApi.put(`/categories/${id}`, payload)
}

export function deleteCategory({ id }) {
  return MainApi.delete(`/categories/${id}`)
}
