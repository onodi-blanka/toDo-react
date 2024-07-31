import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useBaseStore } from '../store/baseStore';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
// import { CategoryModalProps } from '../store/baseStore';

type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCategory: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryInput, setCategoryInput] = useState<string>('');
  const navigate = useNavigate();
  const addNewCategory = useBaseStore((state) => state.addCategory);
  const updateCategoryColour = useBaseStore(
    (state) => state.updateCategoryColour,
  );
  const categoryColour = useBaseStore((state) => state.categoryColour);

  const colours = [
    { name: 'pink', value: 'pink' },
    { name: 'blue', value: 'blue' },
    { name: 'yellow', value: 'yellow' },
    { name: 'orange', value: 'orange' },
    { name: 'green', value: 'green' },
    { name: 'purple', value: 'purple' },
    { name: 'red', value: 'red' },
  ];

  function sendNewCategoryInput() {
    console.log(categoryInput);

    addNewCategory({
      id: uuidv4(),
      name: categoryInput,
      colour: categoryColour,
    });
    onClose();
  }

  function updateInput(categoryInput: string) {
    console.log(categoryInput);
    setCategoryInput(categoryInput);
  }

  function navigateBackToHomeScreen() {
    return navigate('/');
  }

  function handleCategoryColourChange(e: any) {
    updateCategoryColour(e.target.value);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-center pt-10 gap-20">
        <div className="text-2xl text-center text-custom-darkGreen underline">
          CREATE A CATEGORY
        </div>
        <span className="flex flex-row gap-4 items-center">
          <label className="text-custom-darkGreen text-[20px]">
            New category name:
          </label>
          <input
            type="text"
            className="border border-custom-darkGreen text-center text-custom-darkGreen border-custom-darkGreen rounded-lg w-[300px] h-[25px]"
            onChange={(event) => updateInput(event.target.value)}></input>
        </span>
        <select
          className="text-custom-darkGreen"
          onChange={handleCategoryColourChange}>
          <option value="">-- Select a colour --</option>
          {colours.map((colour: { name: string; value: string }) => (
            <option value={colour.value}>{colour.name}</option>
          ))}
        </select>
        <span>
          <button
            type="submit"
            className="border border-custom-darkGreen bg-custom-addBtnColor text-{selectedColour} rounded-lg  pl-8 pr-8"
            onClick={sendNewCategoryInput}>
            Create Category
          </button>
        </span>
      </div>
    </Modal>
  );
};
export default CreateCategory;
