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
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-custom-beige items-center">
        <h1 className="text-3xl text-custom-darkBeige font-bold text-center pt-4">
          PERSONAL
          <div>TASK MANAGER</div>
        </h1>
        <div className="h-screen flex items-center">
          <SideBox categories={categories} />
        </div>
        <Routes>
          <Route path="/" />
          <Route
            path="/createCategory"
            element={
              <CreateCategory
                categories={categories}
                handleAddCategory={() => setCategories}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
