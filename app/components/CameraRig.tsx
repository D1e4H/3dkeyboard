"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const VIEWS = {
  landing: {
    position: new Vector3(0, 7.5, 17),
    target: new Vector3(0, 0.5, 0),
  },
  studio: {
    position: new Vector3(0, 3.4, 8),
    target: new Vector3(0, 0.6, 0),
  },
};

type CameraRigProps = {
  entered: boolean;
};

export default function CameraRig({ entered }: CameraRigProps) {
  const { camera } = useThree();
  const lookTarget = useRef(new Vector3().copy(VIEWS.landing.target));

  useFrame((_, delta) => {
    const view = entered ? VIEWS.studio : VIEWS.landing;
    const smoothing = 1 - Math.pow(0.0015, delta);

    camera.position.lerp(view.position, smoothing);
    lookTarget.current.lerp(view.target, smoothing);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
