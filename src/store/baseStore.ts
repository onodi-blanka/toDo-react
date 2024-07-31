import { create } from 'zustand';

export type Category = {
  id: string;
  name: string;
  colour?: string;
};

export type Task = {
  id: string;
  name: string;
  checked: boolean;
};

// export type CategoryModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

type Store = {
  categories: Category[];
  tasks: Task[];
  categoryColour: string;
  // categoryModal: CategoryModalProps;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  checkTask: (id: string) => void;
  updateCategoryColour: (color: string) => void;
  // openCategoryModal: () => void;
  // closeCategoryModal: () => void;
};

export const useBaseStore = create<Store>((set) => ({
  categories: [],
  tasks: [],
  categoryColour: '',
  // categoryModal: { isOpen: false, onClose: () => {} },

  addCategory: (category: Category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  deleteCategory: (id: string) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  checkTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task,
      ),
    })),
  updateCategoryColour: (color: string) =>
    set((state) => ({ ...state, categoryColour: color })),
  // openCategoryModal: () =>
  //   set((state) => ({
  //     categoryModal: {
  //       isOpen: !state.categoryModal.isOpen,
  //       onClose: state.categoryModal.onClose,
  //     },
  //   })),
  // closeCategoryModal: () =>
  //   set((state) => ({
  //     categoryModal: {
  //       isOpen: false,
  //       onClose: state.categoryModal.onClose,
  //     },
  //   })),
}));
