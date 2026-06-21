export const validateTask = (
  title: string,
  date: Date | null
): string | null => {
  if (title.trim() === '') {
    return 'Escribir una tarea';
  }

  if (!date) {
    return 'Seleccionar fecha y hora para el recordatorio';
  }

  if (date.getTime() <= new Date().getTime()) {
    return 'La fecha y hora del recordatorio deben ser posteriores a la actual';
  }

  return null;
};