import LandingPage from "./Components/landingPage.js";

import { Routes, Route } from "react-router-dom";
import Login from "./Components/login.js";
import Resgister from "./Components/register.js";
import Layout from "./layout.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
