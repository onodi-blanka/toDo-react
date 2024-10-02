import React, { useState } from 'react';
import Modal from './Modal';
import { Category, useBaseStore } from '@/store/baseStore';
import { v4 as uuidv4 } from 'uuid';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTask: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  const [taskInput, setTaskInput] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const categories = useBaseStore((state) => state.categories);
  const addNewTask = useBaseStore((state) => state.addTask);

  const sendTask = async () => {
    if (!taskInput || !selectedCategoryId) {
      alert('Task name and category are required!');
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId,
    );

    if (selectedCategory) {
      const newTask = {
        _id: uuidv4(),
        name: taskInput,
        checked: false,
        category: selectedCategory,
        baseCategory: selectedCategory,
      };

      console.log('Task being sent to backend:', newTask); // Debugging

      try {
        await addNewTask(newTask);
        onClose();
      } catch (error) {
        console.error('Error creating task:', error);
        alert('There was an error creating the task. Please try again.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-center pt-10 gap-20">
        <div className="text-2xl text-center text-custom-darkGreen underline">
          CREATE A TASK
        </div>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId}>
          <option value="">-- Select a category --</option>
          {categories
            .filter((category: Category) => category.name !== 'Completed')
            .map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button onClick={sendTask}>Create Task</button>
      </div>
    </Modal>
  );
};

export default CreateTask;
