import { useLocation } from "react-router-dom";
import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import {FcGoogle} from "@react-icons/all-files/fc/FcGoogle";
function Login() {
  const location = useLocation();
  const { theme } = location.state;
  console.log(theme);
  const headingcolor=theme==="dark"?"#F2D1DB":"#BCD5EB";
  return (
    <div>
      {theme === "dark" ? <AnimatedDark></AnimatedDark> : <AnimatedLight></AnimatedLight>}
      <div className={theme==="dark"?"blurred-div-dark":"blurred-div-light"}>
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
            <Form.Control type="email" placeholder="Username" className={theme==="dark"?"dark-input":"bright-input"} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" className={theme==="dark"?"dark-input":"bright-input"}/>
            <div style={{color:headingcolor,fontSize:"14px",marginTop:"2%"}}>
              Forgot Password?
            </div>
          </Form.Group>
          
          <Button type="submit" className={theme==="dark"?"button-dark":"button-bright"}>
            Login
          </Button> 
        </Form>
        <hr className={theme==="dark"?"dark-line":"bright-line"}/>
        <Button className={theme==="dark"?"button-dark":"button-bright"}>
          Continue with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
