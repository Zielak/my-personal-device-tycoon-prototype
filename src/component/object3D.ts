import { Component } from 'ecsy';
import { Geometry, Object3D } from 'three';

import { scene } from '../rendering';

export type Object3DComponentProps<C> = Partial<Omit<C, keyof Component<any>>>;

export abstract class Object3DComponent<
  C,
  G extends Geometry = Geometry
> extends Component<C> {
  readonly isObject3D = true;

  object3D: Object3D;
  geometry: G;
  isNew = true;

  abstract createObject3D(): void;

  dispose() {
    const { object3D } = this;

    object3D.parent ? object3D.parent.remove(object3D) : scene.remove(object3D);

    super.dispose();
  }
}
