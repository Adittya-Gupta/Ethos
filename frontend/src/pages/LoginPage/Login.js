import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import {
  signInWithGoogle,
  signIn,
  resetPassword,
  auth,
} from "../../firebase.js";
import { useState } from "react";
import toast from "react-hot-toast";
function Login(props) {
  const navigate = useNavigate();
  if (auth.currentUser) {
    navigate("/dashboard");
  }
  const theme = props.theme;
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const headingcolor = theme === "dark" ? "#F2D1DB" : "#BCD5EB";

  // Function : sign-in with google OAuth
  const handleGoogleAuth = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // Function : sign-in with email and password
  const handleLogin = async () => {
    let err = await signIn(email, passwd);
    console.log(err);
    if (err) {
      toast.error(err);
      return;
    }
    navigate("/emailverify");
  };

  // Function : for the case when user forgot their password
  const handleForgotPasswd = () => {
    if (email === "") {
      toast("Please enter your email first",{
        icon:"📧",
      });
      return;
    }
    resetPassword(email);
  };
  return (
    <div>
      {theme === "dark" ? (
        <AnimatedDark></AnimatedDark>
      ) : (
        <AnimatedLight></AnimatedLight>
      )}
      <div
        className={theme === "dark" ? "blurred-divdark" : "blurred-divlight"}
      >
        <h1
          style={{
            color: headingcolor,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "44px",
          }}
        >
          Login
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
              className={theme === "dark" ? "dark-input" : "light-input"}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswd(e.target.value)}
              className={theme === "dark" ? "dark-input" : "light-input"}
            />
            <div className=" flex flex-row justify-between p-1">
              <div
                style={{
                  color: headingcolor,
                  fontSize: "14px",
                  marginTop: "2%",
                  cursor: "pointer",
                }}
                onClick={handleForgotPasswd}
              >
                Forgot Password?
              </div>
              <div style={{ fontSize: "14px", marginTop: "1%" }}>
                <Link
                  to="/signup"
                  style={{ color: headingcolor, textDecoration: "none" }}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </Form.Group>

          <Button
            onClick={handleLogin}
            className={theme === "dark" ? "button-dark" : "button-light"}
          >
            Login
          </Button>
        </Form>
        <hr className={theme === "dark" ? "dark-line" : "light-line"} />
        <Button
          style={{ display: "flex", flexDirection: "row" }}
          onClick={handleGoogleAuth}
          className={theme === "dark" ? "button-dark" : "button-light"}
        >
          <FcGoogle size={"20px"} />
          &nbsp; Continue with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
