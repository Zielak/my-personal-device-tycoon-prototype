import { Attributes, Entity, System, World } from 'ecsy';

import { camera } from '../camera';
import { Block } from '../component/block';
import { Object3DComponent } from '../component/object3D';
import { controls } from '../controls';
import { renderer, scene } from '../rendering';
import { filterRenderableComponents } from '../utils/system';

export class RenderingSystem extends System {
  constructor(world: World<Entity>, attributes?: Attributes) {
    super(world, attributes);

    camera.position.z = 100;
    controls.update();
  }

  execute(delta: number, time: number) {
    this.queries.renderables.results.forEach((entity) => {
      const components3D = filterRenderableComponents(entity.getComponents());

      for (const compName in components3D) {
        if (Object.prototype.hasOwnProperty.call(components3D, compName)) {
          const comp = components3D[compName];
          if (comp.isNew) {
            this.addObject3D(comp);
          }
        }
      }
    });

    controls.update();

    renderer.render(scene, camera);
  }

  private addObject3D(comp: Object3DComponent<any>) {
    const parent = scene;

    comp.createObject3D();

    scene.add(comp.object3D);
    comp.isNew = false;
  }
}

RenderingSystem.queries = {
  renderables: { components: [Block] },
};
