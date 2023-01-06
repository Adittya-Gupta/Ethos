import Navbar from "../../components/NavBar";
import AnimatedDark from "../../components/AnimatedDark";
import AnimatedLight from "../../components/AnimatedLight";
import { Player } from "../../components/AudioPlayer/Player";
import { Upload, Button } from "antd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
function EditAudio(props) {
    const [videoSrc, seVideoSrc] = useState("");
  const handleChange = ({ file }) => {
    console.log(file);
    var url = URL.createObjectURL(file.originFileObj);
    seVideoSrc(url);
  };
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
          <div>
          </div>
          <hr
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#AC6086",
              height: "10px",
              borderWidth: "5px",
              width: "100%",
            }}
          />
          <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
            <div style={{width:"60%"}}>
                Hello World
            </div>
            <div>
            <Upload
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
                </Upload>
          <Player loop audioUrl={videoSrc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAudio;
