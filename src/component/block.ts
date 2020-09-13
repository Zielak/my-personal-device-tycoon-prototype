import { BoxGeometry, Mesh } from 'three';

import { blockMaterial } from '../material/blockMaterial';
import { def } from '../utils/values';
import { Object3DComponent, Object3DComponentProps } from './object3D';

export class Block extends Object3DComponent<Block, BoxGeometry> {
  width: number;
  height: number;
  depth: number;

  constructor(props?: Object3DComponentProps<Block>) {
    super(false);

    this.width = def(props?.width, 20);
    this.height = def(props?.height, 20);
    this.depth = def(props?.depth, 20);
  }

  copy(src: this): this {
    this.width = src.width;
    this.height = src.height;
    this.depth = src.depth;
    if (!this.isNew) {
      throw new Error(`I thought this would be NEW!`);
    }

    return this;
  }

  reset() {
    this.width = 20;
    this.height = 20;
    this.depth = 20;
  }

  createObject3D() {
    this.geometry = new BoxGeometry(this.width, this.height, this.depth);

    this.object3D = new Mesh(this.geometry, blockMaterial);
  }

  updateObject3D() {
    this.geometry.parameters.depth = this.depth;
    this.geometry.parameters.height = this.height;
    this.geometry.parameters.width = this.width;
  }
}
