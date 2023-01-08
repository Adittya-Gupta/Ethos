import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {ref as dbref, remove} from 'firebase/database'
import { useNavigate } from 'react-router-dom';
import {auth, db} from '../firebase'
function Card(props){
    const navigate=useNavigate();
    const backcolor = props.theme==="light" ? "#8BB3DD" : "#2C1E38"
    const tcolor = props.theme==="light" ? "#13458C" : "#AC6086"
    const t2color = props.theme==="light" ? "#D9D9D9" : "#F2D1DB"
    const linecolor = props.theme==="light" ? "#BCD5EB" : "#AC6086"
    const deleteColor = props.theme==="light" ? "#3B84CB" : "#F2D1DB"
    const handleEditButton = (e) => {
        if(!e.target.classList.contains("delete-button-dashboard")){
            // This if condition is to prevent the click event from being triggered when the delete button is clicked
            console.log("edit button was clicked")
            navigate("/editaudio", { state: { id: props.id, name:props.title } });
        }
    }
    const handleDelete = () => {
        const mydbref = dbref(db,("users/" + (auth.currentUser ? auth.currentUser.uid : "user") +'/' + props.id))
        remove(mydbref)
    }
    return(
        <div style={{backgroundColor:backcolor, marginTop:"1rem", width:"100%", height:"12rem",borderRadius:"24px",display:"flex",flexDirection:"row",position:"relative",cursor:"pointer"}} onClick={(e)=>{handleEditButton(e)}}>
            <div style={{width:"40%",display:"flex",alignItems:"flex-end",margin:"1rem",fontSize:"32px",color:tcolor}}>
                {props.title}
            </div>
        <div style={{width:"1.5px",height:"100%",backgroundColor:linecolor}}></div>
        <div style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:"flex-end",gap:"0.2rem",padding:"0.5rem"}}>
                 <div style={{color:t2color,fontWeight:500}}> <span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Created on :</span> {(new Date((props.createdOn)).toLocaleString())}</div>
                 <div style={{color:t2color,fontWeight:500}}><span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Last Modified :</span> {(new Date((props.lastModified)).toLocaleString())}</div>
                 <div style={{color:t2color,fontWeight:500}}><span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Comments :</span> {props.comments}</div>
        </div>
        <div style={{position:"absolute",right:"10px",bottom:"10px",cursor:"pointer",border:"2px solid",borderRadius:"100%",padding:"0.5rem",borderColor:linecolor}} onClick={handleDelete} className="delete-button-dashboard">
            <DeleteOutlinedIcon sx={{color : deleteColor}}></DeleteOutlinedIcon>
        </div>
        </div>
    )
}

export default Card
