import Navbar from "../../components/NavBar";
import AnimatedDark from "../../components/AnimatedDark";
import AnimatedLight from "../../components/AnimatedLight";
import { Button } from "antd";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import "../../components/AudioPlayer/Spectrum.css";
import "../../components/AudioPlayer/Player.css";
import { Spectrum } from "../../components/AudioPlayer/Spectrum";
import { useEffect } from "react";
import { storage, db, auth } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { ref as dbref, query, onValue } from "firebase/database";
import { update } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";

function EditAudio(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const mydbref = dbref(
    db,
    "users/" +
      (auth.currentUser ? auth.currentUser.uid : "user") +
      "/" +
      location.state.id
  );
  const audioRef = useRef();
  const [videoSrc, seVideoSrc] = useState("");
  const titleColor = props.theme === "light" ? "#13458C" : "#AC6086";
  const backColor = props.theme === "light" ? "#8BB3DD" : "#2C1E38";
  const tcolor = props.theme === "light" ? "#000000" : "#F2D1DB";
  const [comment, setComment] = useState("");
  const [isPaussed, setIsPaussed] = useState(true);
  const [namechange, setName] = useState(location.state.name);
  const [data, setData] = useState({});
  const addMarker = () => {
    const audioTag = document.getElementById(videoSrc);
    const currentTime = audioTag.currentTime;
    const totalTime = audioTag.duration;

    let distance = (currentTime / totalTime) * 303;
    const commentsDiv = document.getElementById("commentsDiv");
    const div = document.createElement("div");
    div.id = currentTime;
    div.classList = "h-1 w-1 bg-white";
    div.style = `margin-left: ${distance}%;
    position: absolute;
    `;
    commentsDiv.appendChild(div);
  };

  onValue(query(mydbref), snapshot => {
    getDownloadURL(ref(storage, snapshot.val().dataURL)).then((url) => {
      setData(snapshot.val());
      if(snapshot.val().commentList){
        for (const [key, value] of Object.entries(snapshot.val().commentList)) {
          comments.set(parseInt(key), value);
        }
      }
      seVideoSrc(url);
    });
    // mydbref.on('value', (snapshot) => {
    //   console.log(snapshot.val());
    //
    //   // });
  });
  // const handleChange = ({ file }) => {
  //   console.log(file);
  //   var url = URL.createObjectURL(file.originFileObj);
  //   seVideoSrc(url);
  // };
  const [comments] = useState(new Map());
  const handleOnClick = () => {
    comments.set(Math.floor(audioRef.current.currentTime), comment);
    if(comment===""){
      if(document.getElementById(Math.floor(audioRef.current.currentTime))){
        document.getElementById(Math.floor(audioRef.current.currentTime)).remove();
      }
      comments.delete(Math.floor(audioRef.current.currentTime));
    }
    setComment("");
    addMarker();
  };
  const handleSaving = ()=>{
    let uploadcomm = {};
    comments.forEach((value,key)=>{
      uploadcomm[key] = value;
    })
    const postData = {
      commentsNumber: comments.size,
      createdOn: data.createdOn,
      format: data.format,
      name: namechange,
      dataURL: data.dataURL,
      lastModified: new Date().toISOString(),
      commentList: uploadcomm,
    }
    const updates = {};
    updates['/users/' + (auth.currentUser ? auth.currentUser.uid : "user") + '/' + location.state.id] = postData;
    update(dbref(db), updates).then(()=>{
      navigate("/dashboard");
    })
  }
  let last = useRef(-1);
  // update the comment variable when the time changes
  useEffect(() => {
    const interval = setInterval(() => {
      // check if audio is playing or paused
      if (!audioRef.current.paused) {
        if (comments.get(Math.floor(audioRef.current.currentTime))) {
          setComment(comments.get(Math.floor(audioRef.current.currentTime)));
          console.log("comment changed");
          if (last.current !== Math.floor(audioRef.current.currentTime)) {
            audioRef.current.pause();
            last.current = Math.floor(audioRef.current.currentTime);
          }
        } else {
          setComment("");
          last.current = -1;
        }
      }
      setIsPaussed(audioRef.current.paused);
    }, 200);
    return () => clearInterval(interval);
  });

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
          <hr
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#AC6086",
              height: "10px",
              borderWidth: "5px",
              width: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "60%", margin: "2rem", display:"flex", flexDirection:"column", gap:"3rem" }}>
              <div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea2"
              >
                <Form.Label
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: titleColor,
                  }}
                >
                  Change Title
                </Form.Label>
                <Form.Control
                  as="input"
                  style={{ backgroundColor: backColor, color: tcolor }}
                  value={namechange}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: titleColor,
                  }}
                >
                  Add/Edit Comment
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ backgroundColor: backColor, color: tcolor }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={!isPaussed}
                />
              </Form.Group>
              <Button
                variant={
                  props.theme === "light"
                    ? "outline-primary"
                    : "outline-secondary"
                }
                style={{ color: "whitesmoke" }}
                onClick={handleOnClick}
              >
                Save comment here
              </Button>{" "}
              </div>
            <Button variant={props.theme==="light"? "outline-primary" : "outline-secondary"} style={{color:"whitesmoke"}} onClick={handleSaving}>Save And Exit</Button>{' '}
            <div>
              
            </div>
            </div>
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
              <Spectrum audioUrl={videoSrc} theme={props.theme} />
              <section className="Player">
                <style>
                  {`
                    audio::-webkit-media-controls-play-button {
                      border-radius: 50%;
                    }
                    audio::-webkit-media-controls-play-button:hover {
                      background-color: rgba(0,0,0, .15);
                    }
                    audio::-webkit-media-controls-panel {
                        background-color: ${
                          props.theme === "light" ? "#56AEFF;" : "#AC6086;"
                        }
                      };

                  `}
                </style>
                <audio
                  crossOrigin="anonymous"
                  key={videoSrc}
                  id={videoSrc}
                  ref={audioRef}
                  controls={true}
                  style={{ width: "110%", zIndex: "1" }}
                >
                  <source src={videoSrc} />
                </audio>
                {/* 213, 345px = 480 */}
                <div
                  id="commentsDiv"
                  style={{
                    zIndex: `2`,
                    position: "relative",
                    marginLeft: "213px",
                    marginTop: `-29px`,
                    width: "480px",
                  }}
                ></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAudio;
