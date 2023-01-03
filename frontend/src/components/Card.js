import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
function Card(props){
    const backcolor = props.theme==="light" ? "#8BB3DD" : "#2C1E38"
    const tcolor = props.theme==="light" ? "#13458C" : "#AC6086"
    const t2color = props.theme==="light" ? "#D9D9D9" : "#F2D1DB"
    const linecolor = props.theme==="light" ? "#BCD5EB" : "#AC6086"
    const deleteColor = props.theme==="light" ? "#3B84CB" : "#F2D1DB"
    return(
        <div style={{backgroundColor:backcolor, marginTop:"1rem", width:"100%", height:"12rem",borderRadius:"24px",display:"flex",flexDirection:"row",position:"relative"}}>
            <div style={{width:"40%",display:"flex",alignItems:"flex-end",margin:"1rem",fontSize:"32px",color:tcolor}}>
                {props.title}
            </div>
        <div style={{width:"1.5px",height:"100%",backgroundColor:linecolor}}></div>
        <div style={{display:"flex",flexDirection:"column",height:"100%",justifyContent:"flex-end",gap:"0.2rem",padding:"0.5rem"}}>
                 <div style={{color:t2color,fontWeight:500}}> <span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Created on :</span> {props.createdOn}</div>
                 <div style={{color:t2color,fontWeight:500}}><span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Last Modified :</span> {props.lastModified}</div>
                 <div style={{color:t2color,fontWeight:500}}><span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Duration :</span> {props.duration}</div>
                 <div style={{color:t2color,fontWeight:500}}><span style={{color:tcolor,fontSize:"20px",fontWeight:500,fontFamily:"'Playfair Display'"}}>Comments :</span> {props.comments}</div>
        </div>
        <div style={{position:"absolute",right:"10px",bottom:"10px",cursor:"pointer"}} onClick={()=>console.log("hello")}>
            <DeleteOutlinedIcon sx={{color : deleteColor}}></DeleteOutlinedIcon>
        </div>
        </div>
    )
}

export default Card