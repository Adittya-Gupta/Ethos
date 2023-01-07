import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Navbar from "../../components/NavBar";
import ReactPlayer from "react-player";
import { Upload, Button } from "antd";
import { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
function Add(props) {
  const videoBackground = props.theme === "light" ? "#8BB3DD" : "#2C1E38";
  const headingColor = props.theme === "light" ? "#13458C" : "#AC6086";
  const uploadButtonColor = props.theme === "light" ? "#3B76CB" : "#2C1E38";
  const iconColor = props.theme === "light" ? "#FFFFFF" : "#F2D1DB";
  const [videoSrc, seVideoSrc] = useState("");
  const [link, setLink] = useState("");
  const handleChange = ({ file }) => {
    console.log(file);
    var url = URL.createObjectURL(file.originFileObj);
    seVideoSrc(url);
  };
  const Convert=async () =>{
    
  }
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
            Let's see the video first,
          </div>
          <hr
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#AC6086",
              height: "10px",
              borderWidth: "5px",
              width: "100%",
            }}
          />
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div style={{ width: "40%", margin: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "3rem",
                }}
              >
                <Upload
                  disabled={videoSrc !== ""}
                  className="mt-3 mb-3"
                  accept=".mp4"
                  showUploadList={false}
                  onChange={handleChange}
                >
                  <Button
                    disabled={videoSrc !== ""}
                    style={{
                      borderRadius: "100%",
                      width: "4rem",
                      height: "4rem",
                      backgroundColor: uploadButtonColor,
                    }}
                  >
                    <FileUploadIcon sx={{ color: iconColor }}></FileUploadIcon>
                  </Button>
                </Upload>

                <InputGroup className="mb-3">
                  <InputGroup.Text 
                  id="basic-addon3"
                  style={{
                    backgroundColor: "transparent",
                    color: props.theme === "light" ? "#FFFFFF" : "#F2D1DB",
                    borderColor: props.theme === "light" ? "#13458C" : "#F2D1DB",
                  }}
                  >https://</InputGroup.Text>
                  <Form.Control
                    disabled={videoSrc !== ""}
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                        setLink(e.target.value);
                    }}
                    style={{
                        backgroundColor: props.theme === "light" ? "#8BB3DD" : "#F2D1DB",
                        borderColor: props.theme === "light" ? "#13458C" : "#F2D1DB",
                    }}
                  />
                  <BootstrapButton
                    disabled={videoSrc !== ""}
                    variant={props.theme === "light" ? "primary" : "dark"}
                    style={{
                        borderColor: props.theme === "light" ? "#13458C" : "#F2D1DB",
                    }}
                    id="button-addon2"
                    onClick={()=>{
                        seVideoSrc(link);
                    }}
                  >
                    Ok
                  </BootstrapButton>
                </InputGroup>
              </div>
              <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
                <Button disabled={videoSrc===""} onClick={Convert} style={{color:props.theme==="light" ? "#FFFFFF" : "#F2D1DB"}}>
                    Convert
                </Button>
              </div>
            </div>

            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 500,
                  fontSize: "32px",
                  color: headingColor,
                }}
              >
                You Can See the uploded video here...
              </h1>
              <ReactPlayer
                style={{
                  marginTop: "1rem",
                  padding: "2rem",
                  backgroundColor: videoBackground,
                  borderRadius: "16px",
                }}
                controls
                url={videoSrc}
              ></ReactPlayer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
