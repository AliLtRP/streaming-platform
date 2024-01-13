import useAuthStore from "./store/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/login";
import Home from "./pages/home";
import Party from "./pages/party";

const PagesRouter = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/videos" element={<Home />} />

          <Route path="/" element={<Navigate replace to="/videos" />} />
          {/* <Route path="/login" element={<Navigate replace to="/videos" />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/party/:party_id" element={<Party />} />
        </Routes>
      </Router>
    </>
  );
};

export default PagesRouter;

// {!user ? (
//   <>
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/videos" element={<Home />} /> {/* delete this */}
//     <Route path="/*" element={<Navigate replace to="/login" />} />
//   </>
// ) : (
//   <>
//     <Route path="/videos" element={<Home />} />
//     <Route path="/videos/:video_id" element={<Video />} />
//     <Route path="/" element={<Navigate replace to="/videos" />} />
//     <Route
//       path="/login"
//       element={<Navigate replace to="/videos" />}
//     />
//   </>
// )}
