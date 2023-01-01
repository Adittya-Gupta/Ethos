import "./App.css";
import Welcome from "./pages/Welcome";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              theme={theme}
              onSwitch={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
