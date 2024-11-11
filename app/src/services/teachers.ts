import api from 'src/services/index'
import { get } from 'lodash'
import { ITeacher } from '@/src/types/Teacher'

export const getTeachers = async () => {
  const response = await api.get('/teachers')

  return get(response, 'data.data.teachers', [])
}

export const getTeacherById = async (id: string) => {
  const response = await api.get(`/teachers/${id}`)

  return get(response, 'data.data.teacher', [])
}

export const createTeacher = async (data: ITeacher) => {
  const response = await api.post('/teachers', data)

  return get(response, 'data.teacher', undefined)
}

export const editTeacher = async (data: ITeacher) => {
  const response = await api.put(`/teachers/${data._id}`, data)

  return get(response, 'data.teacher', undefined)
}

export const deleteTeacher = async (id: string) => {
  const response = await api.delete(`/teachers/${id}`)

  return get(response, 'message', undefined)
}
