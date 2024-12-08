export interface MessageCategory {
  success: {
    student: string
    school: string
    teacher: string
    tutor: string
  }
  error: {
    student: string
    school: string
    teacher: string
    tutor: string
  }
}

export interface IMessages {
  create: MessageCategory
  edit: MessageCategory
  delete: MessageCategory
}
