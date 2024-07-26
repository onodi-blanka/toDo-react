import { useState } from 'react';
import ListElement from './components/ListElement';
import { v4 as uuidv4 } from 'uuid';
import SideBox from './components/SideBox';
import CreateCategory from './components/CreateCategory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

type Task = {
  id: string;
  isChecked: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask() {
    setTasks([...tasks, { id: uuidv4(), isChecked: false }]);
  }

  function handleDelete(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleCheckBox(id: string) {
    const foundTask = tasks.find((task) => task.id === id);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    if (!foundTask) {
      return;
    }

    console.log(filteredTasks);
    setTasks([
      ...filteredTasks,
      { ...foundTask, isChecked: !foundTask?.isChecked },
    ]);
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-beige items-center">
        <h1 className="text-3xl text-darkBeige font-bold text-center pt-4">
          PERSONAL
          <div>TASK MANAGER</div>
        </h1>
        <div className="h-screen flex items-center">
          <SideBox />
        </div>
        <Routes>
          <Route path="/" />
          <Route path="/createCategory" element={<CreateCategory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
