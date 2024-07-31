import { useNavigate } from 'react-router-dom';
import { useBaseStore } from '../store/baseStore';

const SideBox: React.FC = () => {
  const categories = useBaseStore((state) => state.categories);

  console.log(categories);
  const navigate = useNavigate();
  function navigateToCreateCategory() {
    return navigate('/createCategory');
  }

  return (
    <div className="relative flex flex-col gap-8 w-60 h-[425px] bg-lightGreen  items-center rounded-lg overflow-auto">
      <div className="text-white text-[20px] text-center">Categories</div>
      <div className="flex mb-auto  flex-col gap-2 items-center overflow-y-auto">
        <button className="text-white bg-completed h-[31px] w-[180px] rounded-lg text-center">
          Completed
        </button>
        <button className="text-white bg-urgent h-[31px] w-[180px] rounded-lg text-center">
          Urgent
        </button>
        <button className="text-white bg-later h-[31px] w-[180px] rounded-lg text-center">
          Later
        </button>
        {categories.map(
          (category) => (
            console.log(category.colour),
            (
              <button
                key={category.id}
                className={`text-white bg-${category.colour || 'darkGreen'} h-[31px] w-[180px] rounded-lg text-center`}>
                {category.name}
              </button>
            )
          ),
        )}
      </div>
      <button
        className="bg-darkGreen mb-4 text-addBtnColor h-[31px] justify-self-end w-[166px] text-center font-bold rounded-lg"
        onClick={navigateToCreateCategory}>
        Add category
      </button>
    </div>
  );
};

export default SideBox;
