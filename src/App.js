import './assets/style.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import List from './components/pages/List';
import View from './components/pages/View';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/userDetails/:id" element={<View />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
