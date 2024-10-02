import { create } from 'zustand';

export type Category = {
  _id: string;
  name: string;
  colour?: string;
};

export type Task = {
  _id: string;
  name: string;
  checked: boolean;
  category: Category;
  baseCategory: Category;
};

export type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Store = {
  categories: Category[];
  tasks: Task[];
  completedTasks: Task[];
  categoryColour: string;
  tasksNumber: (state: Store) => number;
  categoryModal: CategoryModalProps;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  checkTask: (id: string) => void;
  updateCategoryColour: (color: string) => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  setTaskCompleted: (id: string) => void;
  clearCompletedTasks: () => void;
  fillingCompletedTask: () => void;
  fetchTasks: () => void;
  fetchCategories: () => void;
};

const DEFAULT_CATEGORIES = [
  { _id: '1', name: 'Completed', colour: 'completed' },
  { _id: '2', name: 'Urgent', colour: 'urgent' },
  { _id: '3', name: 'Later', colour: 'later' },
];

export const useBaseStore = create<Store>((set) => ({
  categories: [...DEFAULT_CATEGORIES],
  tasks: [],
  completedTasks: [],
  categoryColour: '',
  categoryModal: {
    isOpen: false,
    onClose: function (): void {
      console.log('No onClose function provided');
    },
  },

  fetchTasks: async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks');
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      const fetchedCategories = await response.json();

      set({ categories: [...DEFAULT_CATEGORIES, ...fetchedCategories] });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  addCategory: async (category: Category) => {
    try {
      const response = await fetch('http://localhost:4000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      const newCategory = await response.json();
      set((state) => ({ categories: [...state.categories, newCategory] }));
    } catch (error) {
      console.error('Error adding category:', error);
    }
  },

  deleteCategory: async (id: string) => {
    try {
      await fetch(`http://localhost:4000/categories/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        categories: state.categories.filter((category) => category._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  },

  addTask: async (task: Task) => {
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
  deleteTask: async (id: string) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },

  checkTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, checked: !task.checked } : task,
      ),
    })),

  updateCategoryColour: (color: string) =>
    set((state) => ({ ...state, categoryColour: color })),

  tasksNumber: (state) => state.tasks.length,

  openCategoryModal: () =>
    set((state) => ({
      categoryModal: {
        isOpen: true,
        onClose: state.categoryModal.onClose,
      },
    })),
  closeCategoryModal: () =>
    set((state) => ({
      categoryModal: {
        isOpen: false,
        onClose: state.categoryModal.onClose,
      },
    })),

  setTaskCompleted: async (id: string) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === id) {
          const checked = !task.checked;
          const newCategory = checked
            ? state.categories.find((category) => category.name === 'Completed')
            : task.baseCategory;

          fetch(`http://localhost:4000/tasks/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              checked,
              category: newCategory || task.category,
              baseCategory: task.baseCategory,
            }),
          }).catch((error) => {
            console.error('Error updating task:', error);
          });

          return {
            ...task,
            checked,
            category: newCategory || task.category,
          };
        }
        return task;
      });

      return { tasks: updatedTasks };
    });
  },

  clearCompletedTasks: async () => {
    set((state) => {
      const completedTaskIds = state.tasks
        .filter((task) => task.checked)
        .map((task) => task._id);

      completedTaskIds.forEach((id) => {
        fetch(`http://localhost:4000/tasks/${id}`, {
          method: 'DELETE',
        }).catch((error) => {
          console.error(`Error deleting task with id ${id}:`, error);
        });
      });

      return { tasks: state.tasks.filter((task) => !task.checked) };
    });
  },

  fillingCompletedTask: () => {
    set((state) => ({
      completedTasks: state.tasks.filter((task) => task.checked),
    }));
  },
}));
