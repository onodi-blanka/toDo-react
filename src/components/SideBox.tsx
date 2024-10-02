import { useBaseStore } from '../store/baseStore';
import { useState, useEffect } from 'react';
import CreateCategory from './CreateCategory';

const SideBox: React.FC = () => {
  const categories = useBaseStore((state) => state.categories);
  const fetchCategories = useBaseStore((state) => state.fetchCategories);
  const [isModalOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const colorClassMapping: { [key: string]: string } = {
    later: 'bg-custom-later',
    urgent: 'bg-custom-urgent',
    completed: 'bg-custom-completed',
    pink: 'bg-custom-pink',
    blue: 'bg-custom-blue',
    yellow: 'bg-custom-yellow',
    orange: 'bg-custom-orange',
    green: 'bg-custom-green',
    purple: 'bg-custom-purple',
    red: 'bg-custom-red',
    darkGreen: 'bg-custom-darkGreen',
  };

  return (
    <div className="relative flex flex-col gap-8 w-60 h-[425px] bg-custom-lightGreen items-center rounded-lg overflow-auto">
      <div className="text-white text-[20px] text-center">Categories</div>
      <div className="flex mb-auto flex-col gap-2 items-center overflow-y-auto">
        {categories.map((category) => (
          <button
            key={category._id}
            className={`text-white ${colorClassMapping[category.colour || 'darkGreen']} h-[31px] w-[180px] rounded-lg text-center`}>
            {category.name}
          </button>
        ))}
      </div>
      <button
        className="bg-custom-darkGreen mb-4 text-custom-addBtnColor h-[31px] justify-self-end w-[166px] text-center font-bold rounded-lg"
        onClick={openModal}>
        Add category
      </button>
      <CreateCategory isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SideBox;
