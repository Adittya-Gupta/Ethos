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
            value: "#171522",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance:  120,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#6f425d",
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
            value: 0.5,
            random: true,
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#6f425d",
            },
          },
          size: {
            value: 14,
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default AnimatedLight;
