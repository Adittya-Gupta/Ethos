import Navbar from "../../components/NavBar";
import AnimatedDark from "../../components/AnimatedDark";
import AnimatedLight from "../../components/AnimatedLight";
import { Button } from "antd";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import "../../components/AudioPlayer/Spectrum.css";
import "../../components/AudioPlayer/Player.css";
import { Spectrum } from "../../components/AudioPlayer/Spectrum";
import { useEffect} from "react";
import { storage } from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
function EditAudio(props) {
  const audioRef = useRef();  
  const [videoSrc, seVideoSrc] = useState("");
  const titleColor = props.theme === "light" ? "#13458C" : "#AC6086";
  const backColor = props.theme === "light" ? "#8BB3DD" : "#2C1E38"; 
  const tcolor = props.theme === "light" ? "#000000" : "#F2D1DB";
  const [comment,setComment] = useState("");
  const [isPaussed, setIsPaussed] = useState(true);
  getDownloadURL(ref(storage, "file_example_MP4_480_1_5MG.mp3")).then((url) => {
    seVideoSrc(url);
  });
  // const handleChange = ({ file }) => {
  //   console.log(file);
  //   var url = URL.createObjectURL(file.originFileObj);
  //   seVideoSrc(url);
  // };
  const [comments, ] = useState(new Map());
  const handleOnClick = () => {
    comments.set(Math.floor(audioRef.current.currentTime),comment);
    console.log(comments);
    setComment("");
  };
  let last = useRef(-1);
  // update the comment variable when the time changes
    useEffect(() => {
        const interval = setInterval(() => {
            // check if audio is playing or paused
            if(!audioRef.current.paused){
            if(comments.get(Math.floor(audioRef.current.currentTime))){
                setComment(comments.get(Math.floor(audioRef.current.currentTime)));
                console.log("comment changed")
                if(last.current!==Math.floor(audioRef.current.currentTime)){
                    audioRef.current.pause();
                    last.current = Math.floor(audioRef.current.currentTime);
                }
            }
            else{
                setComment("");
                last.current = -1;
            }
          }
          setIsPaussed(audioRef.current.paused);
        }, 200);
        return () => clearInterval(interval);
    },);
  return (
    <div style={{ position: "relative" }}>
      <div>
        <Navbar
          name={props.name}
          theme={props.theme}
          onSwitch={props.onSwitch}
        ></Navbar>
      </div>
      <div>
        {props.theme === "light" ? (
          <AnimatedLight></AnimatedLight>
        ) : (
          <AnimatedDark></AnimatedDark>
        )}
        <div
          className={
            props.theme === "light" ? "blurred-div" : "blurred-div-dark"
          }
        >
          <div
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#F2D1DB",
              fontWeight: 600,
              fontSize: "44px",
            }}
          >
            Here's your audio,
          </div>
          <div></div>
          <hr
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#AC6086",
              height: "10px",
              borderWidth: "5px",
              width: "100%",
            }}
          />
          <div style={{ display: "flex", flexDirection: "row", width: "100%",justifyContent:"space-between" }}>
            <div style={{ width: "60%", margin:"2rem" }}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label style={{fontSize:"24px",fontWeight:"600",color:titleColor}}>Add/Edit Comment</Form.Label>
                <Form.Control as="textarea" rows={5} style={{backgroundColor:backColor, color:tcolor}} value={comment} onChange={(e)=>setComment(e.target.value)} disabled={!isPaussed}/>
              </Form.Group>
              <Button variant={props.theme==="light"? "outline-primary" : "outline-secondary"} style={{color:"whitesmoke"}} onClick={handleOnClick}>Save</Button>{' '}
            </div>
            <Button variant={props.theme==="light"? "outline-primary" : "outline-secondary"} style={{color:"whitesmoke"}} onClick={handleOnClick}>Save</Button>{' '}
            <div>
              {/* <Upload
                disabled={videoSrc !== ""}
                className="mt-3 mb-3"
                accept=".mp3"
                showUploadList={false}
                onChange={handleChange}
              >
                <Button
                  disabled={videoSrc !== ""}
                  style={{
                    borderRadius: "100%",
                    width: "4rem",
                    height: "4rem",
                  }}
                >
                  <FileUploadIcon></FileUploadIcon>
                </Button>
              </Upload> */}
              <Spectrum audioUrl={videoSrc} theme = {props.theme} />
      <section className="Player">
        <style>
            {
                `
                audio::-webkit-media-controls-panel {
                    background-color: ${props.theme==="light"?"#56AEFF;": "#AC6086;"}
                  }
                `
            }
        </style>
        <audio
          crossOrigin="anonymous"
          key={videoSrc}
          id={videoSrc}
          ref={audioRef}
          controls={true}
        >
          <source src={videoSrc} />
        </audio>
      </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAudio;
