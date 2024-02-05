import "./App.css";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Success from "./pages/success/Success";
import {ReactElement} from "react";
import BookRoom from "./pages/bookRoom/BookRoom";

interface ProtectedRouteProps {
  element: ReactElement;
}

const App = () => {
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element}) => {
    // TODO: get boolean from cookies or some where else to enable this route.
    // in place of true put some dynamic value.
    return true ? element : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-room" element={<BookRoom />} />
        <Route path="/success" element={<ProtectedRoute element={<Success />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
