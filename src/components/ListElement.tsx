interface ListElementProps {
  handleDeleteTask: () => void;
  handleCheckTask: () => void;
  isChecked?: boolean;
}

const ListElement: React.FC<ListElementProps> = (props) => {
  return (
    <div className="flex items-center justify-between ml-10 mt-12">
      <button
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded order-3"
        onClick={props.handleDeleteTask}>
        Delete
      </button>
      <input
        type="text"
        className="text-center border rounded-lg mx-6 order-2 w-1/2"
      />
      <input
        type="checkbox"
        checked={props.isChecked}
        className="order-1"
        onChange={props.handleCheckTask}
      />
    </div>
  );
};
export default ListElement;
