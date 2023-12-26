import LandingPage from "./Components/landingPage.js";
import React,{useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Components/login.js";
import Register from "./Components/register.js";
import Layout from "./layout.js";
import MainApp from "./Components/MainApp.js";
import { UserContextProvider } from "./userContext.js";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  return userId ? element : null;
};

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/MainApp" element={<PrivateRoute element={<MainApp />} />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
