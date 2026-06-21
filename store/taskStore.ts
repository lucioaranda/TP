import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type Responsible = {
  name: string;
  phone?: string;
  email?: string;
};

export type Task = {
  id: string;
  title: string;
  date: string;
  notificationId: string;
  imageUri?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  responsible?: Responsible;
};

type TaskStore = {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskImage: (
    taskId: string,
    imageUri: string
  ) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  loadTasks: async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');

    if (savedTasks) {
      set({ tasks: JSON.parse(savedTasks) });
    } else {
      set({ tasks: [] });
    }
  },

  addTask: async (task: Task) => {
    const currentTasks = get().tasks;
    const newTasks = [...currentTasks, task];

    set({ tasks: newTasks });

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    );
  },

  deleteTask: async (taskId: string) => {
    const currentTasks = get().tasks;

    const newTasks = currentTasks.filter(
      task => task.id !== taskId
    );

    set({ tasks: newTasks });

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    );
  },

  updateTaskImage: async (
    taskId: string,
    imageUri: string
  ) => {
    const currentTasks = get().tasks;

    const newTasks = currentTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          imageUri,
        };
      }

      return task;
    });

    set({ tasks: newTasks });

    await AsyncStorage.setItem(
      'tasks',
      JSON.stringify(newTasks)
    );
  },
}));