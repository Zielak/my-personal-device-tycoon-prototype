import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  SphereBufferGeometry,
} from 'three';

import { scene } from './rendering';

export const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const FRONT_LIGHT_COLOR = 0xffffff;
const pointLight = new PointLight(FRONT_LIGHT_COLOR, 1);
pointLight.position.x = -50;
pointLight.position.y = 50;
pointLight.position.z = 100;
pointLight.add(
  new Mesh(
    new SphereBufferGeometry(4, 8, 8),
    new MeshBasicMaterial({ color: FRONT_LIGHT_COLOR })
  )
);

const BACK_LIGHT_COLOR = 0xefd6ff;
const backPointLight = new PointLight(BACK_LIGHT_COLOR, 1);
backPointLight.position.x = 150;
backPointLight.position.y = -250;
backPointLight.position.z = -400;
backPointLight.add(
  new Mesh(
    new SphereBufferGeometry(4, 8, 8),
    new MeshBasicMaterial({ color: BACK_LIGHT_COLOR })
  )
);

camera.add(pointLight);
camera.add(backPointLight);

scene.add(camera);
