import NotFound from './404/NotFound';
import { Routes, Route } from "react-router-dom";
import Home from './Home/home';
import Layout from './Layout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
