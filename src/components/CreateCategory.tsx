import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCategory: React.FC = () => {
  const [categoryInput, setCategoryInput] = useState<string>('');
  const navigate = useNavigate();

  function sendingCategoryInput() {
    console.log(categoryInput);
    return categoryInput;
  }

  function updateInput(categoryInput: string) {
    console.log(categoryInput);
    setCategoryInput(categoryInput);
  }

  function navigateBackToHomeScreen() {
    return navigate('/');
  }

  return (
    <div>
      <div className="flex flex-col text-center pt-10 gap-20">
        <div className="text-2xl text-center text-darkGreen underline">
          CREATE A CATEGORY
        </div>
        <span className="flex flex-row gap-4 items-center">
          <label className="text-darkGreen text-[20px]">
            New category name:
          </label>
          <input
            type="text"
            className="text-center text-darkGreen border-darkGreen rounded-lg w-[300px] h-[25px]"
            onChange={(event) => updateInput(event.target.value)}></input>
        </span>
        <span>
          <button
            type="submit"
            className="border border-darkGreen bg-addBtnColor text-darkGreen rounded-lg  pl-8 pr-8"
            onClick={sendingCategoryInput}>
            Create Category
          </button>
          <button
            className="border border-black text-black rounded-lg ml-40 pl-8 pr-8 hover:bg-green"
            onClick={navigateBackToHomeScreen}>
            BACK
          </button>
        </span>
      </div>
    </div>
  );
};
export default CreateCategory;
