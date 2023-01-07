import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import {signUp,checkEmail} from "../../firebase.js";
import { useState } from "react"; 
function Signup(props) {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [passwd,setPasswd]=useState("");
  const [username, setUsername] = useState("");
  const theme = props.theme
  console.log(theme);
  const headingcolor=theme==="dark"?"#F2D1DB":"#BCD5EB";
  const handleSignup = async () => {
    console.log(email,passwd,username)
    const emailExists = await checkEmail(email);
    if(emailExists){
      alert("Email already exists");
      return;
    }
    const err = await signUp(email,passwd,username);
    console.log("hello");
    console.log(err);
    if(err){
      alert(err);
      return;
    } 
    navigate('/emailverify');
  };
  return (
    <div>
      {theme === "dark" ? <AnimatedDark></AnimatedDark> : <AnimatedLight></AnimatedLight>}
      <div className={theme==="dark"?"blurred-div-dark-signup":"blurred-div-light-signup"}>
      <h1
          style={{
            color: headingcolor,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "44px",
          }}
        >
          Sign Up
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className={theme==="dark"?"dark-input":"light-input"} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className={theme==="dark"?"dark-input":"light-input"}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" className={theme==="dark"?"dark-input":"light-input"}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>setPasswd(e.target.value)} className={theme==="dark"?"dark-input":"light-input"}/>
          </Form.Group>
          
          <Button onClick={handleSignup} className={theme==="dark"?"button-dark":"button-light"}>
            Sign Up
          </Button> 
        </Form>
      </div>
    </div>
    );
}
export default Signup;