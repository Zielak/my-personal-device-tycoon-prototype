import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { camera } from './camera';
import { renderer } from './rendering';

export const controls = new OrbitControls(camera, renderer.domElement);
