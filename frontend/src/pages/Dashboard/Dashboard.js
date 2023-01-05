import AnimatedLight from "../../components/AnimatedLight"
import AnimatedDark from "../../components/AnimatedDark"
import Navbar from "../../components/NavBar"
import Card from "../../components/Card"
import AddIcon from '@mui/icons-material/Add';
import "./Dashboard.css"
import {auth} from "../../firebase.js"
function Dashboard(props){
    const plusbackground = props.theme==="light" ? "#3B76CB" : "#2C1E38"
    const pluscolor = props.theme==="light" ? "#BCD5EB" : "#F2D1DB"
    console.log(props.theme)
    const cards = [
        {
            title: "Audio 1",
            createdOn: "Janurary 1, 2021",
            lastModified: "Janurary 1, 2021",
            duration: "1 min 30 sec",
            comments: "0"
        },
        {
            title: "Audio 2",
            createdOn: "Janurary 1, 2022",
            lastModified: "February 1, 2021",
            duration: "1 min 30 sec",
            comments: "3"
        }
    ]
    return(
        <div style={{position:"relative"}}>
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
            Hey {auth.currentUser ? auth.currentUser.displayName : "there"},
          </div>
          <hr style={{color:props.theme==="light" ? "#BCD5EB" : "#AC6086", height:"10px",borderWidth:"5px",width:"100%"}} />
          <div className="subheading" style={{color: props.theme==="light" ? "#BCD5EB":"#F2D1DB"}}>Here are your recent audios :</div>
          {
                cards.map((card)=>{
                    return <Card theme={props.theme} title={card.title} createdOn={card.createdOn} lastModified={card.lastModified} duration={card.duration} comments={card.comments}></Card>
                })
          }
          
        </div>
            </div>
        <div style={{position:"fixed",zIndex:10,right:"10px",bottom:"20px",borderRadius:"100%",backgroundColor:plusbackground,padding:"1rem",cursor:"pointer"}} onClick={()=>console.log("plus button clickeds")}>
            <AddIcon sx={{color:pluscolor}}></AddIcon>
        </div>
    </div>
    )
}

export default Dashboard