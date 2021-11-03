import { MainApi } from './endpoint'

export function getSchedules(payload) {
  return MainApi.get('/schedules', payload)
}

export function rateSchedule({ id, ...payload }) {
  return MainApi.put(`/schedules/rate/${id}`, payload)
}

export function avgRateSchedule(payload) {
  return MainApi.get('/schedules/avg_rates', payload)
}

export function createSchedule(payload) {
  return MainApi.post('/schedules', payload)
}

export function joinSchedule(payload) {
  return MainApi.post('/schedules/join', payload)
}

export function updateSchedule({ id, ...payload }) {
  return MainApi.put(`/schedules/${id}`, payload)
}

export function deleteSchedule({ id }) {
  return MainApi.delete(`/schedules/${id}`)
}

export function getScheduleDetails({ id }) {
  return MainApi.get(`/schedules/${id}`)
}

export function getUsersRate(payload) {
  return MainApi.get('/usersRate', payload)
}
