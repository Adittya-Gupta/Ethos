import "./App.css";
import Welcome from "./pages/Welcome";
import LoginIn from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/SignupPage/Signup";
import {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Welcome theme={theme} onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}/>}>
          </Route>
          <Route path="/login" element={<LoginIn theme={theme}></LoginIn>}></Route>
          <Route path="/dashboard" element={<Dashboard theme={theme} name="Adittya" onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}></Dashboard>}></Route>
          <Route path="/signup" element={<Signup theme={theme}></Signup>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
