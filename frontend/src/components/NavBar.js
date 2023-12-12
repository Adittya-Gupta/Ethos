import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/audio-wave.json"
import { useNavigate } from "react-router-dom";
import {signOut, auth} from "../firebase"
function Navbar(props) {
  const [alignment, setAlignment] = React.useState(props.theme==="light"?"left":"right");
  const navigate = useNavigate();
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      props.onSwitch();
    }
  };
  const handleSignOut = () => {
    signOut();
    navigate('/')
  };
  const logo = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div
      style={{
        backgroundColor: props.theme === "light" ? "#96B5D3" : "#16131E",
        zIndex:1
      }}
      className="relative"
    >
      <div style={{ paddingBottom: "0px" }} className="mx-auto px-4 sm:px-6">
        <div
          style={{ margin: "0px" }}
          className="flex items-center justify-between py-2 md:justify-start md:space-x-10"
        >
          <div style={{color : props.theme==="light" ? "#4D79B8" : "#C6778F", fontWeight:800}} className="flex justify-start lg:w-0 lg:flex-1">
            {auth.currentUser ? auth.currentUser.displayName : "User"}
          </div>
          <ToggleButtonGroup
            sx={{
              border:
                "1px solid " +
                (props.theme === "light" ? "#4D79B8" : "#C6778F"),
            }}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="left"
              aria-label="left aligned"
              sx={{ border: "none" }}
            >
              <Lottie 
                  options={logo_sun}
                  height={20}
                  width={20}
                />
            </ToggleButton>
            <ToggleButton
              value="right"
              aria-label="right aligned"
              sx={{ border: "none" }}
            >
              <Lottie 
                  options={logo_moon}
                  height={20}
                  width={20}
                />
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <div
              style={{
                color: props.theme === "light" ? "#4D79B8" : "#C6778F",
                borderColor: props.theme === "light" ? "#4D79B8" : "#C6778F",
                cursor: "pointer",
              }}
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap border rounded-3xl px-4 py-2 text-base font-medium shadow-md hover:bg-zinc-300"
              onClick={handleSignOut}
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
      {/* Mobile design starts from here */}
      <div
        style={{
          backgroundColor: props.theme === "light" ? "#96B5D3" : "#16131E",
        }}
        className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
      >
        <div
          style={{
            backgroundColor: props.theme === "light" ? "#96B5D3" : "#16131E",
          }}
          className="divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <Lottie 
                    options={logo}
                    height={50}
                    width={50}
                  />
              </div>
            </div>
          </div>
          <div className="space-y-6 py-6 px-5">
            <div>
              <a
                href="/"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Sign up
              </a>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                Existing User?&nbsp;
                <a href="/" className="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
