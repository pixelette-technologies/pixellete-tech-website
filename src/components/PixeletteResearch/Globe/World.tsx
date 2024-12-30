'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const World: React.FC = () => {
  const [rise, setRise] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const globeEl = useRef<ReturnType<typeof Globe> | null>(null);
  const globeEl = useRef<Globe | null>(null);

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.enableZoom = false;
        controls.enablePan = false;
      }
    }
    setLoading(false); // Set loading to false once the component has been set up
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setRise(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const N_PATHS = 10;
  const MAX_POINTS_PER_LINE = 10000;
  const MAX_STEP_DEG = 1;
  const MAX_STEP_ALT = 0.015;

  const gData = useMemo(
    () =>
      [...Array.from({ length: N_PATHS }).keys()].map(() => {
        let lat = (Math.random() - 0.5) * 90;
        let lng = (Math.random() - 0.5) * 360;
        let alt = 0;

        return [
          [lat, lng, alt],
          ...[...Array.from({ length: Math.round(Math.random() * MAX_POINTS_PER_LINE) }).keys()].map(() => {
            lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
            alt = Math.max(0, alt);

            return [lat, lng, alt];
          }),
        ];
      }),
    [],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Globe
      ref={globeEl}
      width={500}
      height={375}
      enablePointerInteraction={false}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="https://unpkg.com/three-globe@2.39.1/example/img/earth-night.jpg"
      bumpImageUrl="https://unpkg.com/three-globe@2.39.1/example/img/night-sky.png"
      pathsData={gData}
      pathColor={() => ['rgba(0,0,255,0.6)', 'rgba(255,0,0,0.6)']}
      pathDashLength={0.01}
      pathDashGap={0.004}
      pathDashAnimateTime={100000}
      pathPointAlt={rise ? (pnt: any) => pnt[2] : undefined}
      pathTransitionDuration={rise ? 4000 : undefined}
      // controls={{
      //   minDistance: 300,
      //   maxDistance: 300,
      // }}
    />
  );
};

export default World;
