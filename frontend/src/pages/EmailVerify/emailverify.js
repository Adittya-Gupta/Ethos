import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Button from "react-bootstrap/Button";
import "./emailverify.css"
import { useNavigate } from 'react-router-dom';
import {SendVerificationEmail,auth} from "../../firebase.js";
import { useEffect } from "react";
function EmailVerify(props){
    const Verification = () => {
        console.log("Verification");
        SendVerificationEmail();
    }
    useEffect(()=>{
        const interval = setInterval(() => {
            if(auth.currentUser.emailVerified){
                console.log("Verified")
                navigate("/dashboard")
            }
            auth.currentUser.reload();
        },1000)
        return () => clearInterval(interval);
    },[])
    const navigate = useNavigate();
    const theme = props.theme
    const headingcolor=theme==="dark"?"#F2D1DB":"#BCD5EB";
    return(
        <div>
            {theme === "dark" ? <AnimatedDark></AnimatedDark> : <AnimatedLight></AnimatedLight>}
            <div className={theme==="dark"?"blurred-divdark":"blurred-divlight"}>
                <div style={{color: headingcolor}}>Please wait while we verify your email address</div>
                <Button onClick={Verification} className={theme==="dark"?"button-dark":"button-light"}>
                    Send Verification Email Again
                </Button> 
            </div>
        </div>
    )
}
export default EmailVerify;