import { PointLight } from 'three';

import { camera } from './camera';
import { Block } from './component/block';
import { world } from './game';
import { scene } from './rendering';

world
  .createEntity('Block1')
  .addComponent<Block>(Block, { depth: 10, height: 70, width: 30 });
