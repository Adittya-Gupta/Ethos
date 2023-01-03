import AnimatedLight from "../../components/AnimatedLight"
import AnimatedDark from "../../components/AnimatedDark"
import Navbar from "../../components/NavBar"
import Card from "../../components/Card"
import "./Dashboard.css"
function Dashboard(props){
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
          {
                cards.map((card)=>{
                    return <Card theme={props.theme} title={card.title} createdOn={card.createdOn} lastModified={card.lastModified} duration={card.duration} comments={card.comments}></Card>
                })
          }
          
        </div>
            </div>
        </>
    )
}

export default Dashboard