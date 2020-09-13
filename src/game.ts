import { World } from 'ecsy';

import { allComponents } from './component';
import { allSystems } from './system';

export const world = new World();
window['world'] = world;
allComponents.forEach((comp) => world.registerComponent(comp));
allSystems.forEach((system) => world.registerSystem(system));

let paused = true;
let fpsInterval: number,
  startTime: number,
  now: number,
  then: number,
  elapsed: number,
  timer: NodeJS.Timeout;

export function startLoop(fps: number) {
  paused = false;
  fpsInterval = 1000 / fps;
  then = performance.now();
  startTime = then;
  timer = setInterval(() => loop(), fpsInterval);
}

export function stopLoop() {
  paused = true;
  clearInterval(timer);
}

function loop() {
  if (paused) {
    return;
  }

  now = performance.now();
  elapsed = now - then;

  world.execute(elapsed, startTime);

  then = performance.now();
}
