(function (three, ecsy, OrbitControls) {
    'use strict';

    const blockMaterial = new three.MeshPhongMaterial({
        color: 0xdddddd,
        specular: 0x050505,
        shininess: 30,
        flatShading: true,
    });

    const def = (...values) => values.find((value) => typeof value !== 'undefined');

    const scene = new three.Scene();
    const renderer = new three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    class Object3DComponent extends ecsy.Component {
        constructor() {
            super(...arguments);
            this.isObject3D = true;
            this.isNew = true;
        }
        dispose() {
            const { object3D } = this;
            object3D.parent ? object3D.parent.remove(object3D) : scene.remove(object3D);
            super.dispose();
        }
    }

    class Block extends Object3DComponent {
        constructor(props) {
            super(false);
            this.width = def(props === null || props === void 0 ? void 0 : props.width, 20);
            this.height = def(props === null || props === void 0 ? void 0 : props.height, 20);
            this.depth = def(props === null || props === void 0 ? void 0 : props.depth, 20);
        }
        copy(src) {
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
            this.geometry = new three.BoxGeometry(this.width, this.height, this.depth);
            this.object3D = new three.Mesh(this.geometry, blockMaterial);
        }
        updateObject3D() {
            this.geometry.parameters.depth = this.depth;
            this.geometry.parameters.height = this.height;
            this.geometry.parameters.width = this.width;
        }
    }

    const allComponents = [Block];

    const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const FRONT_LIGHT_COLOR = 0xffffff;
    const pointLight = new three.PointLight(FRONT_LIGHT_COLOR, 1);
    pointLight.position.x = -50;
    pointLight.position.y = 50;
    pointLight.position.z = 100;
    pointLight.add(new three.Mesh(new three.SphereBufferGeometry(4, 8, 8), new three.MeshBasicMaterial({ color: FRONT_LIGHT_COLOR })));
    const BACK_LIGHT_COLOR = 0xefd6ff;
    const backPointLight = new three.PointLight(BACK_LIGHT_COLOR, 1);
    backPointLight.position.x = 150;
    backPointLight.position.y = -250;
    backPointLight.position.z = -400;
    backPointLight.add(new three.Mesh(new three.SphereBufferGeometry(4, 8, 8), new three.MeshBasicMaterial({ color: BACK_LIGHT_COLOR })));
    camera.add(pointLight);
    camera.add(backPointLight);
    scene.add(camera);

    const controls = new OrbitControls.OrbitControls(camera, renderer.domElement);

    const filterRenderableComponents = (comps) => {
        const filteredComps = {};
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

    class RenderingSystem extends ecsy.System {
        constructor(world, attributes) {
            super(world, attributes);
            camera.position.z = 100;
            controls.update();
        }
        execute(delta, time) {
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
        addObject3D(comp) {
            comp.createObject3D();
            scene.add(comp.object3D);
            comp.isNew = false;
        }
    }
    RenderingSystem.queries = {
        renderables: { components: [Block] },
    };

    const allSystems = [RenderingSystem];

    const world = new ecsy.World();
    window['world'] = world;
    allComponents.forEach((comp) => world.registerComponent(comp));
    allSystems.forEach((system) => world.registerSystem(system));
    let paused = true;
    let fpsInterval, startTime, now, then, elapsed, timer;
    function startLoop(fps) {
        paused = false;
        fpsInterval = 1000 / fps;
        then = performance.now();
        startTime = then;
        timer = setInterval(() => loop(), fpsInterval);
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

    world
        .createEntity('Block1')
        .addComponent(Block, { depth: 10, height: 70, width: 30 });

    // Loop logic
    startLoop(60);
    // ---

}(THREE, ECSY, THREE_EXAMPLES));
//# sourceMappingURL=index.js.map
