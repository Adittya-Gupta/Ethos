import Anime from "react-anime";
import WelcomeNavbar from "../components/WelcomeNavbar";

import "./Welcome.css";
function Welcome(props) {
  return (
    <>
      <WelcomeNavbar theme={props.theme} onSwitch={props.onSwitch} />
      <div className="h-[75vh] w-full ">
        <img
          src={
            props.theme === "light"
              ? "./welcomelight.jpeg"
              : "./welcomedark.jpeg"
          }
          className="object-cover w-full h-full"
          alt="Welcome screen"
        />
        {/* <div
          style={{
            fontSize: "100px",
          }}
          className={
            "absolute text-sm bottom-56 break-words font-link-" + props.theme
          }
        >
          Audio-X
        </div> */}
      </div>
      <div
        className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  "
        style={{ marginTop: "50px" }}
      >
        <div className="flip-container h-[300px] overflow-hidden ">
          <div className="flipper">
            <div
              className="front  w-full flex items-center justify-center p-4 "
              style={{
                backgroundColor:
                  props.theme === "light" ? "#66A2DA" : "#1E142F",
                height: "20rem",
                important: "false",
              }}
            >
              <h1
                className={`sm:text-5xl text-4xl ${
                  props.theme === "light"
                    ? "subheadings-light"
                    : "subheadings-dark"
                }`}
              >
                Convert!
              </h1>
            </div>
            <div
              className="back w-full flex items-center justify-center p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#66A2DA" : "#1E142F",
                height: "20rem",
                important: "false",
              }}
            >
              <p
                className={
                  props.theme === "light"
                    ? "mycontent-light text-center"
                    : "mycontent-dark text-center"
                }
              >
                Convert your important videos into mp3 audios. Our website
                supports mp4 ....... formats!
              </p>
            </div>
          </div>
        </div>
        <div className="flip-container h-[300px] overflow-hidden  ">
          <div className="flipper ">
            <div
              className="front w-full  flex items-center justify-center col-span-1 p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#3B84CB" : "#181025",
                height: "20rem",
                important: "false",
              }}
            >
              <h1
                className={`sm:text-5xl text-4xl ${
                  props.theme === "light"
                    ? "subheadings-light"
                    : "subheadings-dark"
                }`}
              >
                Store!
              </h1>
            </div>
            <div
              className="back flex w-full items-center justify-center p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#3B84CB" : "#181025",
                height: "20rem",
                important: "false",
              }}
            >
              <p
                className={
                  props.theme === "light" ? "mycontent-light" : "mycontent-dark"
                }
              >
                Store the converted audios in our cloud storage and access them
                anytime and anywhere you want!
              </p>
            </div>
          </div>
        </div>
        <div className="flip-container h-[300px] overflow-hidden ">
          <div className="flipper  ">
            <div
              className="front w-full flex items-center justify-center p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#66A2DA" : "#1E142F",
                height: "20rem",
                important: "false",
              }}
            >
              <h1
                className={`sm:text-5xl text-4xl ${
                  props.theme === "light"
                    ? "subheadings-light"
                    : "subheadings-dark"
                }`}
              >
                Add!
              </h1>
            </div>
            <div
              className="back flex items-center justify-center w-full p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#66A2DA" : "#1E142F",
                height: "20rem",
                important: "false",
              }}
            >
              <p
                className={
                  props.theme === "light" ? "mycontent-light" : "mycontent-dark"
                }
              >
                Add comments at any timestamp you want in your audios so you
                don't miss them in future!
              </p>
            </div>
          </div>
        </div>
        <div className="flip-container  h-[300px] overflow-hidden ">
          <div className="flipper  ">
            <div
              className="front w-full flex items-center justify-center  p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#3B84CB" : "#181025",
                height: "20rem",
                important: "false",
              }}
            >
              <h1
                className={`sm:text-5xl text-4xl ${
                  props.theme === "light"
                    ? "subheadings-light"
                    : "subheadings-dark"
                }`}
              >
                Edit!
              </h1>
            </div>
            <div
              className=" back flex items-center justify-center w-full p-4"
              style={{
                backgroundColor:
                  props.theme === "light" ? "#3B84CB" : "#181025",
                height: "20rem",
                important: "false",
              }}
            >
              <p
                className={
                  props.theme === "light" ? "mycontent-light" : "mycontent-dark"
                }
              >
                Oh!, this comment was unnecessary in the previous audio that I
                made. No problem! Our application allows you to edit your
                previously stored audios too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Welcome;
