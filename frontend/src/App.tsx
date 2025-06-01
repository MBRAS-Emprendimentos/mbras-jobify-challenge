import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
    </Router>
  );
};

export default App;
