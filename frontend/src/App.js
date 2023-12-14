import "./App.css";
import EmailVerify from "./pages/EmailVerify/emailverify"
import Welcome from "./pages/Welcome";
import LoginIn from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/SignupPage/Signup";
import {useState} from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./pages/AddVideo/Add";
import EditAudio from "./pages/EditAudio/EditAudio";
function App() {
  const [theme, setTheme] = useState("dark");
  const toast_text = theme==="light" ? "#13458C" : "#F2D1DB"
  const toast_background = theme==="light" ? "#8BB3DD" : "#2C1E38"
  return (
    <>
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
      <Toaster 
  toastOptions={{
    style: {
      border: '1px solid #713200',
      padding: '16px',
      background: toast_background,
      color:toast_text,
    },
  }}
    />
    </>
  );
}

export default App;
