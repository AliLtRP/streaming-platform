import { Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Routes,
  // Route,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
const PagesRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default PagesRouter;
