import { useState } from 'react';

export const useTaskCounter = () => {
  const [pendingTasks, setPendingTasks] = useState(0);

  const addTask = () => {
    setPendingTasks(prev => prev + 1);
  };

  const removeTask = () => {
    setPendingTasks(prev => Math.max(prev - 1, 0));
  };

  const resetTasks = () => {
    setPendingTasks(0);
  };

  return {
    pendingTasks,
    addTask,
    removeTask,
    resetTasks,
  };
};