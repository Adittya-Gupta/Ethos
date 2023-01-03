import AnimatedLight from "../../components/AnimatedLight"
import AnimatedDark from "../../components/AnimatedDark"
import Navbar from "../../components/NavBar"
import Card from "../../components/Card"
import "./Dashboard.css"
function Dashboard(props){
    console.log(props.theme)
    return(
        <>
            <div>
                <Navbar name={props.name} theme={props.theme} onSwitch={props.onSwitch}></Navbar>
            </div>
            <div>
                {props.theme==="light" ? <AnimatedLight></AnimatedLight> : <AnimatedDark></AnimatedDark>}
        <div className={props.theme==="light" ? "blurred-div" : "blurred-div-dark"}>
          <div
            style={{
              color: props.theme==="light"? "#BCD5EB" : "#F2D1DB",
              fontWeight: 600,
              fontSize: "44px",
            }}
          >
            Hey {props.name},
          </div>
          <hr style={{color:props.theme==="light" ? "#BCD5EB" : "#AC6086", height:"10px",borderWidth:"5px",width:"100%"}} />
          <div className="subheading" style={{color: props.theme==="light" ? "#BCD5EB":"#F2D1DB"}}>Here are your recent audios :</div>
          <Card theme={props.theme}></Card>
        </div>
            </div>
        </>
    )
}

export default Dashboard