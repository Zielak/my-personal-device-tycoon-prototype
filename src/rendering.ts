import { Scene, WebGLRenderer } from 'three';

export const scene = new Scene();

export const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
