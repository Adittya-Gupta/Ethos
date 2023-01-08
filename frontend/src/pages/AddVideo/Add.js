import AnimatedLight from "../../components/AnimatedLight";
import AnimatedDark from "../../components/AnimatedDark";
import Navbar from "../../components/NavBar";
import ReactPlayer from "react-player";
import { Button } from "antd";
import React, { useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
import axios from "axios";
import "./module.add.css";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db, auth } from "../../firebase";
import { ref as refdb, set } from "firebase/database";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Add(props) {
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("");
  const navigate = useNavigate();
  if(auth.currentUser===null){
    navigate("/login");
  }
  const videoBackground = props.theme === "light" ? "#8BB3DD" : "#2C1E38";
  const headingColor = props.theme === "light" ? "#13458C" : "#AC6086";
  const uploadButtonColor = props.theme === "light" ? "#3B76CB" : "#2C1E38";
  const iconColor = props.theme === "light" ? "#FFFFFF" : "#F2D1DB";
  const [videoSRC, setVideoSRC] = useState("");
  const [link, setLink] = useState("");
  const [videoSource, setVideoSource] = useState("");
  const convert = (videoFileData, targetAudioFormat) => {
    try {
      targetAudioFormat = targetAudioFormat.toLowerCase();
      let reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = function (event) {
          let contentType = "audio/" + targetAudioFormat;
          let audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          let myBuffer;
          const sampleRate = 16000;
          const numberOfChannels = 1;
          let videoFileAsBuffer = reader.result;
          audioContext
            .decodeAudioData(videoFileAsBuffer)
            .then(function (decodedAudioData) {
              let duration = decodedAudioData.duration;
              let offlineAudioContext = new OfflineAudioContext(
                numberOfChannels,
                sampleRate * duration,
                sampleRate
              );
              let soundSource = offlineAudioContext.createBufferSource();
              myBuffer = decodedAudioData;
              soundSource.buffer = myBuffer;
              soundSource.connect(offlineAudioContext.destination);
              soundSource.start();
              offlineAudioContext
                .startRendering()
                .then(function (renderedBuffer) {
                  let UintWave = createWaveFileData(renderedBuffer);
                  let b64Data = btoa(uint8ToString(UintWave));
                  let blob = getBlobFromBase64Data(b64Data, contentType);
                  let blobUrl = URL.createObjectURL(blob);

                  let convertedAudio = {
                    name: videoFileData.name.substring(
                      0,
                      videoFileData.name.lastIndexOf(".")
                    ),
                    format: targetAudioFormat,
                    data: blobUrl,
                  };
                  resolve(convertedAudio);
                })
                .catch(function (err) {
                  console.log("Rendering failed: " + err);
                });
            });
        };
        reader.readAsArrayBuffer(videoFileData);
      });
    } catch (e) {
      console.log("Error occurred while converting : ", e);
    }
  };

  function getBlobFromBase64Data(b64Data, contentType, sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  function createWaveFileData(audioBuffer) {
    var frameLength = audioBuffer.length;
    var numberOfChannels = audioBuffer.numberOfChannels;
    var sampleRate = audioBuffer.sampleRate;
    var bitsPerSample = 16;
    var byteRate = (sampleRate * numberOfChannels * bitsPerSample) / 8;
    var blockAlign = (numberOfChannels * bitsPerSample) / 8;
    var wavDataByteLength = frameLength * numberOfChannels * 2;
    var headerByteLength = 44;
    var totalLength = headerByteLength + wavDataByteLength;

    var waveFileData = new Uint8Array(totalLength);

    var subChunk1Size = 16;
    var subChunk2Size = wavDataByteLength;
    var chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    writeString("RIFF", waveFileData, 0);
    writeInt32(chunkSize, waveFileData, 4);
    writeString("WAVE", waveFileData, 8);
    writeString("fmt ", waveFileData, 12);

    writeInt32(subChunk1Size, waveFileData, 16);
    writeInt16(1, waveFileData, 20);
    writeInt16(numberOfChannels, waveFileData, 22);
    writeInt32(sampleRate, waveFileData, 24);
    writeInt32(byteRate, waveFileData, 28);
    writeInt16(blockAlign, waveFileData, 32);
    writeInt32(bitsPerSample, waveFileData, 34);

    writeString("data", waveFileData, 36);
    writeInt32(subChunk2Size, waveFileData, 40);

    writeAudioBuffer(audioBuffer, waveFileData, 44);

    return waveFileData;
  }

  function writeString(s, a, offset) {
    for (var i = 0; i < s.length; ++i) {
      a[offset + i] = s.charCodeAt(i);
    }
  }

  function writeInt16(n, a, offset) {
    n = Math.floor(n);

    var b1 = n & 255;
    var b2 = (n >> 8) & 255;

    a[offset + 0] = b1;
    a[offset + 1] = b2;
  }

  function writeInt32(n, a, offset) {
    n = Math.floor(n);
    var b1 = n & 255;
    var b2 = (n >> 8) & 255;
    var b3 = (n >> 16) & 255;
    var b4 = (n >> 24) & 255;

    a[offset + 0] = b1;
    a[offset + 1] = b2;
    a[offset + 2] = b3;
    a[offset + 3] = b4;
  }

  function writeAudioBuffer(audioBuffer, a, offset) {
    var n = audioBuffer.length;
    var channels = audioBuffer.numberOfChannels;

    for (var i = 0; i < n; ++i) {
      for (var k = 0; k < channels; ++k) {
        var buffer = audioBuffer.getChannelData(k);
        var sample = buffer[i] * 32768.0;

        if (sample < -32768) sample = -32768;
        if (sample > 32767) sample = 32767;

        writeInt16(sample, a, offset);
        offset += 2;
      }
    }
  }

  function uint8ToString(buf) {
    var i,
      length,
      out = "";
    for (i = 0, length = buf.length; i < length; i += 1) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }

  // function downloadAudio(convertedAudioDataObj) {
  //   let a = document.createElement("a");
  //   a.href = convertedAudioDataObj.data;
  //   a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
  //   a.click();
  // }

  async function convertToAudio(file) {
    let sourceVideoFile = file;
    let targetAudioFormat = "mp3";
    let convertedAudioDataObj = await convert(
      sourceVideoFile,
      targetAudioFormat
    );
    console.log(convertedAudioDataObj);
    const response = await fetch(convertedAudioDataObj.data);
    const audioBlob = await response.blob();

    // Create a reference to the audio file
    const audioFile = new File([audioBlob], "audio.mp3", { type: "audio/mp3" });
    const storageRef = ref(
      storage,
      `${
        (auth.currentUser ? auth.currentUser.uid : "user") +
        ":" +
        convertedAudioDataObj.name
      }.${convertedAudioDataObj.format}`
    );
    uploadBytes(storageRef, audioFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      console.log(snapshot);
      console.log(snapshot.ref._location.path);
      set(
        refdb(
          db,
          "users/" +
            (auth.currentUser ? auth.currentUser.uid : "user") +
            "/" +
            convertedAudioDataObj.name +
            "/"
        ),
        {
          name: convertedAudioDataObj.name,
          format: convertedAudioDataObj.format,
          dataURL: snapshot.ref._location.path,
          createdOn: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          commentsNumber: 0,
          commentList: [],
        }
      ).then(() => {
        navigate("/editaudio", { state: { name: convertedAudioDataObj.name, id: convertedAudioDataObj.name } });
      });
    });
  }
  const Convertfromlink = async ()=>{
    axios.get('http://127.0.0.1:5000/convert',{
      params:{url:link,userid: auth.currentUser.uid!==null?auth.currentUser.uid:"guest"}
    }).then((res)=>{
      let name= new Date((new Date().toISOString())).toLocaleString()
      name=name.replace("/","-")
      name=name.replace("/","-")
      console.log(name)
      console.log(res.data);
      set(
        refdb(
          db,
          "users/" + 
          (auth.currentUser ? auth.currentUser.uid : "user") +
          "/" +
          "createdOn" + name +
            "/"
        ),
        {
          name: "createdOn" + name,
          format: "mp3",
          dataURL: res.data,
          createdOn: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          commentsNumber: 0,
          commentList: [],
        }
      ).then(() => {
        navigate("/editaudio", { state: { name: "createdOn" + name, id: "createdOn" + name} });
      });
    })
  }
  const handleChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // console.log(url);
    setUploadMethod("file-upload");
    setVideoSRC(url);
    setVideoSource("file-upload");
    console.log(videoSRC);
  };

  const handleClick = (event) => {
    if (videoSource === "file-upload") {
      const file = videoSRC
        ? document.getElementById("file-upload").files[0]
        : null;
      console.log(file);
      convertToAudio(file);
    }
  };
  const ConvertClick = (event) => {
    setLoading(true);
    if(uploadMethod==='file-upload'){
      handleClick(event);
    }else if(uploadMethod==='link'){
      Convertfromlink();
    }
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
          {loading===false &&
          <div
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#F2D1DB",
              fontWeight: 600,
              fontSize: "44px",
            }}
          >
            Let's see the video first,
          </div> }
          {loading===true &&
          <div
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#F2D1DB",
              fontWeight: 600,
              fontSize: "44px",
            }}
          >
            Loading ...
          </div> }
          <hr
            style={{
              color: props.theme === "light" ? "#BCD5EB" : "#AC6086",
              height: "10px",
              borderWidth: "5px",
              width: "100%",
            }}
          />
          {loading===false && <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
                {/* <Upload
                  disabledsr={videoSRC !== null}
                  className="mt-3 mb-3"
                  accept=".mp4"
                  showUploadList={false}
                  onChange={({ file, filelist, event }) => {
                    console.log(event);
                    convertToAudio(file);
                    console.log(file);
                    var url = URL.createObjectURL(file.originFileObj);
                    setVideoSRC(url);
                  }}
                > */}
                <label
                  htmlFor="file-upload"
                  className="custom-file-upload rounded-full h-16 w-20 text-center flex"
                >
                  <FileUploadIcon
                    sx={{ color: iconColor, alignSelf: "center" }}
                  ></FileUploadIcon>
                </label>
                <input
                  type="file"
                  onChange={handleChange}
                  id="file-upload"
                  // disabled={videoSRC !== ""}
                  className="p-4"
                  accept=".mp4"
                  // showUploadList={false}
                  style={{
                    backgroundColor: uploadButtonColor,
                  }}
                />
                {/* </Upload> */}

                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon3"
                    style={{
                      backgroundColor: "transparent",
                      color: props.theme === "light" ? "#FFFFFF" : "#F2D1DB",
                      borderColor:
                        props.theme === "light" ? "#13458C" : "#F2D1DB",
                    }}
                  >
                    https://
                  </InputGroup.Text>
                  <Form.Control
                    // disabled={videoSRC !== ""}
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                      setLink(e.target.value);
                      setVideoSource("link");
                    }}
                    style={{
                      backgroundColor:
                        props.theme === "light" ? "#8BB3DD" : "#F2D1DB",
                      borderColor:
                        props.theme === "light" ? "#13458C" : "#F2D1DB",
                    }}
                  />
                  <BootstrapButton
                    // disabled={videoSRC !== ""}
                    variant={props.theme === "light" ? "primary" : "dark"}
                    style={{
                      borderColor:
                        props.theme === "light" ? "#13458C" : "#F2D1DB",
                    }}
                    id="button-addon2"
                    onClick={() => {
                      setUploadMethod("link");
                      setLink(link);
                      setVideoSRC(link);
                    }}
                  >
                    Ok
                  </BootstrapButton>
                </InputGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Button
                  disabled={videoSRC === null}
                  style={{
                    color: props.theme === "light" ? "#FFFFFF" : "#F2D1DB",
                  }}
                  onClick={ConvertClick}
                >
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
                id="reactplayer"
                style={{
                  marginTop: "1rem",
                  padding: "2rem",
                  backgroundColor: videoBackground,
                  borderRadius: "16px",
                }}
                controls={true}
                url={videoSRC}
              />
            </div>
          </div>}
          {loading===true && <div className="subheading" style={{color: props.theme==="light" ? "#BCD5EB":"#F2D1DB"}}>Extracting audio from your video:</div>}
          {loading===true && <div style={{ display: "flex", flexDirection: "column", width: "100%",alignItems:"center" }}>
                <div> <CircularProgress style={{color:headingColor}} size={100}/> </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Add;
