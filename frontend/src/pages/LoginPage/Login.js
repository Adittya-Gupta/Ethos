import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import {FcGoogle} from "@react-icons/all-files/fc/FcGoogle";
import {signInWithGoogle, signIn, resetPassword, auth} from "../../firebase.js";
import { useState } from "react";
function Login(props) {
  const navigate = useNavigate();
  if(auth.currentUser){
    navigate('/dashboard');
  }
  const theme = props.theme
  const [email,setEmail]=useState("");
  const [passwd,setPasswd]=useState("");
  const headingcolor=theme==="dark"?"#F2D1DB":"#BCD5EB";
  const handleGoogleAuth = () => {
    signInWithGoogle().then(()=>{
      navigate('/dashboard');
    }).catch((err)=>{
      alert(err);
    });
  };
  const handleLogin = async () => {
    let err = await signIn(email,passwd);
    console.log(err);
    if(err){
      alert(err);
      return;
    }
    navigate('/emailverify');
  };
  const handleForgotPasswd = () => {
    if(email===""){
      alert("Please enter your email first");
      return;
    }
    resetPassword(email);
  }
  return (
    <div>
      {theme === "dark" ? <AnimatedDark></AnimatedDark> : <AnimatedLight></AnimatedLight>}
      <div className={theme==="dark"?"blurred-divdark":"blurred-divlight"}>
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
            <Form.Control type="email" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} className={theme==="dark"?"dark-input":"light-input"} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPasswd(e.target.value)} className={theme==="dark"?"dark-input":"light-input"}/>
            <div style={{color:headingcolor,fontSize:"14px",marginTop:"2%",cursor:"pointer"}} onClick={handleForgotPasswd}>
              Forgot Password?
            </div>
          </Form.Group>
          
          <Button onClick={handleLogin} className={theme==="dark"?"button-dark":"button-light"}>
            Login
          </Button> 
        </Form>
        <hr className={theme==="dark"?"dark-line":"light-line"}/>
        <Button style={{display:"flex",flexDirection:"row"}} onClick={handleGoogleAuth} className={theme==="dark"?"button-dark":"button-light"}>
        <FcGoogle size={"20px"}/>&nbsp;  Continue with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
