import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Success from './pages/success/Success';
import BookRoom from './pages/bookRoom/BookRoom';
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-room" element={<BookRoom />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
