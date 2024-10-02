import { useState } from 'react';
import ListElement from './components/ListElement';
import SideBox from './components/SideBox';
import CreateCategory from './components/CreateCategory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-custom-beige items-center">
        <h1 className="text-3xl text-custom-darkBeige font-bold text-center pt-4">
          PERSONAL
          <div>TASK MANAGER</div>
        </h1>

        <div className="flex flex-grow items-center justify-center">
          <div className="flex flex-row h-[425px] w-full max-w-6xl gap-2">
            {/* SideBox */}
            <div className="h-full w-1/4">
              <SideBox categories={categories} />
            </div>

            <div className="flex flex-col w-2/3 h-full gap-2">
              <TopBar />
              <div className="h-full flex-grow">
                <ListElement />
              </div>
            </div>
          </div>
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
