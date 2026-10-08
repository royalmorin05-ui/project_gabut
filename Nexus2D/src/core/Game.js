import { GameLoop } from './GameLoop.js';
import { Time } from './Time.js';
import { SceneManager } from './SceneManager.js';
import { Logger } from '../utils/Logger.js';

export class Game {
    constructor({ canvas, renderer, input, camera }) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.input = input;
        this.camera = camera;
        this.time = new Time();
        this.sceneManager = new SceneManager();
        this.loop = new GameLoop({
            update: (dt) => this._update(dt),
            render: (dt) => this._render(dt)
        });
    }

    get activeScene() {
        return this.sceneManager.activeScene;
    }

    registerScene(scene) {
        this.sceneManager.register(scene);
        return this;
    }

    setActiveScene(name) {
        return this.sceneManager.switchTo(name);
    }

    start() {
        if (!this.sceneManager.activeScene) {
            Logger.error('No active scene set. Call setActiveScene() first.');
            return;
        }
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    _update(deltaTime) {
        this.time.tick(deltaTime);
        this.sceneManager.update(deltaTime);
        this.input.endFrame();
    }

    _render(_deltaTime) {
        // HUD / overlay hook — reserved untuk stage lanjutan.
        // Scene rendering dilakukan oleh RenderSystem di update pipeline.
    }
}