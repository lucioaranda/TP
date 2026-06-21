import {
  renderHook,
  act,
} from '@testing-library/react-native';

import { useTaskCounter } from '../hooks/useTaskCounter';

describe('useTaskCounter', () => {
  test('agrega una tarea pendiente', async () => {
    const { result } = await renderHook(() =>
      useTaskCounter()
    );

    await act(async () => {
      result.current.addTask();
    });

    expect(result.current.pendingTasks).toBe(1);
  });

  test('elimina una tarea pendiente', async () => {
    const { result } = await renderHook(() =>
      useTaskCounter()
    );

    await act(async () => {
      result.current.addTask();
      result.current.removeTask();
    });

    expect(result.current.pendingTasks).toBe(0);
  });

  test('resetea las tareas pendientes', async () => {
    const { result } = await renderHook(() =>
      useTaskCounter()
    );

    await act(async () => {
      result.current.addTask();
      result.current.addTask();
      result.current.resetTasks();
    });

    expect(result.current.pendingTasks).toBe(0);
  });
});