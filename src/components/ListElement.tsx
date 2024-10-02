import { Task, useBaseStore } from '@/store/baseStore';
import { useEffect, useState } from 'react';

interface ListElementProps {
  handleDeleteTask: () => void;
  handleCheckTask: () => void;
  isChecked?: boolean;
  task: Task;
}

const ListElement: React.FC<ListElementProps> = () => {
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

  const fetchTasks = useBaseStore((state) => state.fetchTasks);
  const completedTask = useBaseStore((state) => state.setTaskCompleted);
  const completedTasks = useBaseStore((state) => state.completedTasks);
  const tasks = useBaseStore((state) => state.tasks);
  const [filter, setFilter] = useState<'active' | 'all' | 'completed'>('all');

  const refreshCompletedTask = useBaseStore(
    (state) => state.fillingCompletedTask,
  );

  function showCompletedTasks() {
    setFilter('completed');
  }

  function showActiveTasks() {
    setFilter('active');
  }

  function showAllTasks() {
    setFilter('all');
  }

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasksToDisplay =
    filter === 'completed'
      ? completedTasks
      : filter === 'all'
        ? tasks
        : tasks.filter((task) => !task.checked);

  return (
    <div className="relative h-full flex flex-col bg-custom-lightGreen rounded-lg text-custom-ListElementColour">
      <div className="flex flex-col justify-between">
        {tasksToDisplay.map((task) => (
          <div
            key={task._id}
            className="flex flex-row items-center justify-between text-white mt-4 border-b-2 border-white border-opacity-20 pb-4 px-2">
            <input
              type="checkbox"
              checked={task.checked}
              onClick={() => {
                completedTask(task._id);
                refreshCompletedTask();
              }}
            />
            <span>{task.name || 'Unnamed Task'}</span>
            <button
              className={`text-white ${colorClassMapping[task.category?.colour || 'darkGreen']} h-[31px] w-[180px] rounded-lg text-center`}>
              {task.category?.name || 'No Category'}
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 justify-center font-bold rounded-lg mt-auto py-4">
        <button
          onClick={showActiveTasks}
          className={`${
            filter === 'active' ? 'text-white' : 'text-custom-ListElementColour'
          }`}>
          Active
        </button>
        <button
          onClick={showAllTasks}
          className={`${
            filter === 'all' ? 'text-white' : 'text-custom-ListElementColour'
          }`}>
          All
        </button>
        <button
          onClick={showCompletedTasks}
          className={`${
            filter === 'completed'
              ? 'text-white'
              : 'text-custom-ListElementColour'
          }`}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default ListElement;
