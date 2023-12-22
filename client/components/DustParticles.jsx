import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const DustParticles = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <div>
      {init && (
        <Particles
          id='dustParticles'
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: true,
            // background: {
            //   color: {
            //     value: '#0D47A1',
            //   },
            // },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                  mode: 'push',
                },
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 3,
                },
              },
            },
            particles: {
              color: {
                value: 'ffffff',
              },
              links: {
                color: '#0B408F',
                distance: 150,
                enable: false,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: 'top',
                enable: true,
                outModes: {
                  default: 'out',
                },
                random: false,
                speed: 1,
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
              },
              shape: {
                type: 'circle'
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};
export default DustParticles;
