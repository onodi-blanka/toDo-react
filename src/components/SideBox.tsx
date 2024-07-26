import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBox: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  function navigateToCreateCategory() {
    return navigate('/createCategory');
  }

  return (
    <div className="relative flex flex-col gap-8 w-60 h-[425px] bg-green items-center rounded-lg">
      <div className="text-white text-[20px] text-center">Categories</div>
      <div className="flex flex-col gap-2 items-center">
        <button className="text-white bg-completed h-[31px] w-[180px] rounded-lg text-center">
          Completed
        </button>
        <button className="text-white bg-urgent h-[31px] w-[180px] rounded-lg text-center">
          Urgent
        </button>
        <button className="text-white bg-later h-[31px] w-[180px] rounded-lg text-center">
          Later
        </button>
        <button
          className="absolute bottom-0 mb-4 bg-darkGreen text-addBtnColor h-[31px] w-[166px] text-center font-bold rounded-lg"
          onClick={navigateToCreateCategory}>
          Add category
        </button>
      </div>
    </div>
  );
};

export default SideBox;
