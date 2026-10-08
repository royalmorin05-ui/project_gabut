import { Logger } from '../utils/Logger.js';

export class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.activeScene = null;
    }

    register(scene) {
        this.scenes.set(scene.name, scene);
        return this;
    }

    has(name) {
        return this.scenes.has(name);
    }

    get(name) {
        return this.scenes.get(name) ?? null;
    }

    switchTo(name) {
        const next = this.scenes.get(name);
        if (!next) {
            Logger.error(`Scene "${name}" not found`);
            return false;
        }

        if (this.activeScene) {
            this.activeScene.onExit();
        }

        if (!next.initialized) {
            next.initialize();
        }

        this.activeScene = next;
        this.activeScene.onEnter();
        Logger.info(`Active scene switched to "${name}"`);
        return true;
    }

    update(deltaTime) {
        if (this.activeScene) {
            this.activeScene.update(deltaTime);
        }
    }

    destroyAll() {
        for (const scene of this.scenes.values()) {
            scene.destroy();
        }
        this.scenes.clear();
        this.activeScene = null;
    }
}