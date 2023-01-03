function Card(props){
    const backcolor = props.theme==="light" ? "#8BB3DD" : "#2C1E38"
    const tcolor = props.theme==="light" ? "#13458C" : "#AC6086"
    const linecolor = props.theme==="light" ? "#BCD5EB" : "#AC6086"
    return(
        <div style={{backgroundColor:backcolor, marginTop:"1rem", width:"100%", height:"12rem",borderRadius:"24px",display:"flex",flexDirection:"row"}}>
            <div style={{width:"40%",display:"flex",alignItems:"flex-end",margin:"1rem",fontSize:"32px",color:tcolor}}>
                Secret audio 1
            </div>
        <div style={{width:"1.5px",height:"100%",backgroundColor:linecolor}}></div>
        </div>
    )
}

export default Card