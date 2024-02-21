import './assets/style.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import List from './components/pages/List';
import View from './components/pages/View';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className='d-flex justify-content-center w-100 flex-column'>
    <div className='d-flex justify-content-center w-100 py-5'>
    <Typography variant='h3' className='Heading'>Admin Panel</Typography>
    </div>
      <Router>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/userDetails/:id" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
