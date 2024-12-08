import { IMessages } from '../types/app/Messages'

const MESSAGES: IMessages = {
  create: {
    success: {
      student: 'Estudiante creado exitosamente',
      school: 'Escuela creada exitosamente',
      teacher: 'Profesor creado exitosamente',
      tutor: 'Tutor creado exitosamente',
    },
    error: {
      student:
        'Error al crear el estudiante. Inténtalo de nuevo o contacta soporte.',
      school:
        'Error al crear la escuela. Inténtalo de nuevo o contacta soporte.',
      teacher:
        'Error al crear el profesor. Inténtalo de nuevo o contacta soporte.',
      tutor: 'Error al crear el tutor. Inténtalo de nuevo o contacta soporte.',
    },
  },
  edit: {
    success: {
      student: 'Estudiante editado exitosamente',
      school: 'Escuela editada exitosamente',
      teacher: 'Profesor editado exitosamente',
      tutor: 'Tutor editado exitosamente',
    },
    error: {
      student:
        'Ocurrió un error al editar el estudiante. Por favor, intenta de nuevo o contacta a soporte',
      school:
        'Ocurrió un error al editar la escuela. Por favor, intenta de nuevo o contacta a soporte',
      teacher:
        'Ocurrió un error al editar el profesor. Por favor, intenta de nuevo o contacta a soporte',
      tutor:
        'Ocurrió un error al editar el tutor. Por favor, intenta de nuevo o contacta a soporte',
    },
  },
  delete: {
    success: {
      student: 'Estudiante eliminado exitosamente',
      school: 'Escuela eliminada exitosamente',
      teacher: 'Profesor eliminado exitosamente',
      tutor: 'Tutor eliminado exitosamente',
    },
    error: {
      student:
        'Ocurrió un error al eliminar el estudiante. Por favor, intenta de nuevo o contacta a soporte',
      school:
        'Ocurrió un error al eliminar la escuela. Por favor, intenta de nuevo o contacta a soporte',
      teacher:
        'Ocurrió un error al eliminar el profesor. Por favor, intenta de nuevo o contacta a soporte',
      tutor:
        'Ocurrió un error al eliminar el tutor. Por favor, intenta de nuevo o contacta a soporte',
    },
  },
}

export default MESSAGES
