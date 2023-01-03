import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
function AnimatedLight() {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
        <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#3b94d2",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: "#f6c86c",
          },
          move: {
            directions: "none",
            enable: true,
            random: true,
            outModes: {
              default: "bounce",
            },
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            random: true,
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          size: {
            value: 6,
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default AnimatedLight;
