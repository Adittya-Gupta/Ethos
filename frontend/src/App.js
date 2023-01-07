import "./App.css";
import EmailVerify from "./pages/EmailVerify/emailverify"
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
import Add from "./pages/AddVideo/Add";
import EditAudio from "./pages/EditAudio/EditAudio";
function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Welcome theme={theme} onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}/>}>
          </Route>
          <Route path="/login" element={<LoginIn theme={theme}></LoginIn>}></Route>
          <Route path="/dashboard" element={<Dashboard theme={theme} onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}></Dashboard>}></Route>
          <Route path="/signup" element={<Signup theme={theme}></Signup>}></Route>
          <Route path='/addvideo' element={<Add theme={theme} onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}></Add>}></Route>
          <Route path="/editaudio" element={<EditAudio theme={theme} onSwitch={()=>theme==="light" ? setTheme("dark") : setTheme("light")}></EditAudio>}></Route>
          <Route path="/emailverify" element={<EmailVerify theme={theme}></EmailVerify>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
