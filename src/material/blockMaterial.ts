import { MeshPhongMaterial } from 'three';

export const blockMaterial = new MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x050505,
  shininess: 30,
  flatShading: true,
});
