import { useBaseStore } from '../store/baseStore';
import React, { useState } from 'react';
import CreateTask from './CreateTask';

const TopBar: React.FC = () => {
  const [isModalOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const tasksNumber = useBaseStore((state) => state.tasksNumber(state));
  const deleteCompletedTasks = useBaseStore(
    (state) => state.clearCompletedTasks,
  );

  return (
    <div className="flex justify-between items-center h-10 bg-custom-lightGreen gap-32 text-custom-topBarWhite font-bold rounded-lg">
      <button className="h-[31px] w-[166px] text-center text-custom-topBarGreen">
        {tasksNumber + ' tasks'}
      </button>
      <button
        className="bg-custom-darkGreen h-[31px] w-[166px] text-center font-bold rounded-lg"
        onClick={openModal}>
        Add new task
      </button>
      <CreateTask isOpen={isModalOpen} onClose={closeModal} />
      <button
        className="h-[31px] w-[166px] text-center text-custom-topBarGreen"
        onClick={deleteCompletedTasks}>
        Clear completed
      </button>
    </div>
  );
};

export default TopBar;
