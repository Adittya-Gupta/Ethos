import { useLocation } from "react-router-dom";
import AnimatedLight from "../../components/AnimatedLight";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
function Login() {
  const location = useLocation();
  const { theme } = location.state;
  console.log(theme);
  return (
    <div>
      <AnimatedLight></AnimatedLight>
      <div className="blurred-div">
        <h1
          style={{
            color: "#BCD5EB",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "44px",
          }}
        >
          Login
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
