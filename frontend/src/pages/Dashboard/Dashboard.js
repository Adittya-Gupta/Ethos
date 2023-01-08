import AnimatedLight from "../../components/AnimatedLight"
import AnimatedDark from "../../components/AnimatedDark"
import Navbar from "../../components/NavBar"
import Card from "../../components/Card"
import AddIcon from '@mui/icons-material/Add';
import "./Dashboard.css"
import {auth, db} from "../../firebase.js"
import { useState } from "react";
import { ref as dbref,query,onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
function Dashboard(props){
    const navigate = useNavigate();
    if(auth.currentUser===null){
        navigate("/login")
    }
    // const [username, ] = useState(auth.currentUser.displayName)
    const plusbackground = props.theme==="light" ? "#13458C" : "#F2D1DB"
    const pluscolor = props.theme==="light" ? "#8BB3DD" : "#2C1E38"
    console.log(props.theme)
    const mydbref = dbref(db,("users/" + (auth.currentUser ? auth.currentUser.uid : "user")))
    // update cards list when the database changes due to the deletion of a card
    const [cards, setCards] = useState([]);
    onValue(query(mydbref), snapshot => {
        const mycards = []
        console.log(snapshot.val());
        if(snapshot.val()){
            for (const [key, value] of Object.entries(snapshot.val())) {
                console.log(key, value)
                mycards.push({
                    id: key,
                    title: value.name,
                    createdOn: value.createdOn,
                    lastModified: value.lastModified,
                    duration: value.duration,
                    comments: value.commentsNumber
                })
            }}
        console.log(cards)
        console.log(mycards)
        let state=false;
        if(cards.length!==mycards.length){
            state=true;
        }
        else{
        for (let i=0;i<cards.length;i++){
            if(cards[i].title!==mycards[i].title){
                state=true;
            }
        }}
        if(state){
            console.log("setting cards")
            setCards(mycards)
        }
        console.log("hello")
    });
    return(
        <div style={{position:"relative"}}>
            <div>
                <Navbar name={auth.currentUser ? auth.currentUser.displayName : "USer"} theme={props.theme} onSwitch={props.onSwitch}></Navbar>
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
                    return <Card id={card.id} theme={props.theme} title={card.title} createdOn={card.createdOn} lastModified={card.lastModified} duration={card.duration} comments={card.comments}></Card>
                })
          }
          
        </div>
            </div>
        <div style={{position:"fixed",zIndex:10,right:"10px",bottom:"20px",borderRadius:"100%",backgroundColor:plusbackground,padding:"1rem",cursor:"pointer"}} onClick={()=>navigate("/addvideo")}>
            <AddIcon sx={{color:pluscolor}}></AddIcon>
        </div>
    </div>
    )
}

export default Dashboard