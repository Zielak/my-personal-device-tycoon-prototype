import { Component } from 'ecsy';

import { Object3DComponent } from '../component/object3D';

type CollectionObject3D = { [compName: string]: Object3DComponent<any> };

export const filterRenderableComponents = (comps: {
  [compName: string]: Component<any>;
}): CollectionObject3D => {
  const filteredComps: CollectionObject3D = {};

  for (const compName in comps) {
    if (Object.prototype.hasOwnProperty.call(comps, compName)) {
      const comp = comps[compName];
      if ('isObject3D' in comp && comp['isObject3D'] === true) {
        filteredComps[compName] = comp;
      }
    }
  }

  return filteredComps;
};
