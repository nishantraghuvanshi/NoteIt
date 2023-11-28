import LandingPage from "./Components/landingPage.js";

import { Routes, Route} from "react-router-dom";
import Login from "./Components/login.js";
import Resgister from "./Components/register.js";
import Layout from "./layout.js";
import MainApp from "./Components/MainApp.js";
import { UserContextProvider } from "./userContext.js";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
          <Route path="/MainApp" element={<MainApp />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
