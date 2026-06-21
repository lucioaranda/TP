import { validateTask } from '../utils/taskValidations';

describe('validateTask', () => {
  test('devuelve error si la tarea está vacía', () => {
    const result = validateTask('', new Date(Date.now() + 60000));

    expect(result).toBe('Escribir una tarea');
  });

  test('devuelve error si no hay fecha', () => {
    const result = validateTask('Estudiar', null);

    expect(result).toBe('Seleccionar fecha y hora para el recordatorio');
  });

  test('devuelve null si la tarea es válida', () => {
    const result = validateTask(
      'Estudiar',
      new Date(Date.now() + 60000)
    );

    expect(result).toBeNull();
  });
});