import { World } from 'ecsy';

import { allSystems } from './system';

export const world = new World();
allSystems.forEach((system) => world.registerSystem(system));
