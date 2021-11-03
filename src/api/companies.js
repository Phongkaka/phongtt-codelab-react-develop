import toFormData from 'object-to-formdata'

import { MainApi } from './endpoint'

export function getCompanies(payload) {
  return MainApi.get('/admin/list-company', payload)
}

export function createCompany(payload) {
  return MainApi.post('/admin/add-company', payload)
}

export function updateCompany(payload) {
  return MainApi.post('/admin/edit-company', payload)
}

export function deleteCompany(payload) {
  return MainApi.post('/admin/delete-company', payload)
}

export function getCompanyInfo(payload) {
  return MainApi.post('/admin/company-info', payload)
}

export function createCompaniesFromCsv(payload) {
  const data = toFormData(payload)

  return MainApi.post('/admin/company-create-from-csv', data)
}

export function createCompanyUsersFromCsv(payload) {
  const data = toFormData(payload)

  return MainApi.post('/admin/user-company-create-from-csv', data)
}

export function getSendCoinHistoryCSV(payload) {
  return MainApi.post('/admin/user-history-csv', payload)
}
