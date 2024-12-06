import api from 'src/services/index'
import { get } from 'lodash'
import { IStudent } from 'src/types/Student'

export const getStudents = async () => {
  const response = await api.get('/students')

  return get(response, 'data.data.students', [])
}

export const getStudentsByTutorId = async (tutorId: string) => {
  const response = await api.get(`/students/tutor/${tutorId}`)

  return get(response, 'data.data.students', [])
}

export const getStudentsByTeacherId = async (teacherId: string) => {
  const response = await api.get(`/students/teacher/${teacherId}`)

  return get(response, 'data.data.students', [])
}

export const getStudentsBySchoolId = async (schoolId: string) => {
  const response = await api.get(`/students/school/${schoolId}`)

  return get(response, 'data.data.students', [])
}

export const createStudents = async (data: IStudent) => {
  const response = await api.post('/students', data)

  return get(response, 'data.student', undefined)
}

export const editStudent = async (data: IStudent) => {
  const response = await api.put(`/students/${data._id}`, data)

  return get(response, 'data.student', undefined)
}

export const deleteStudent = async (id: string) => {
  const response = await api.delete(`/students/${id}`)

  return get(response, 'message', undefined)
}
