import { EntityManager } from '../ecs/EntityManager.js';
import { Logger } from '../utils/Logger.js';

export class Scene {
    constructor(name = 'Scene') {
        this.name = name;
        this.entityManager = new EntityManager();
        this.systems = [];
        this.initialized = false;
    }

    addSystem(system) {
        this.systems.push(system);
        this.systems.sort((a, b) => a.priority - b.priority);
        return this;
    }

    removeSystem(system) {
        const idx = this.systems.indexOf(system);
        if (idx >= 0) this.systems.splice(idx, 1);
        return this;
    }

    initialize() {
        for (const system of this.systems) {
            system.onAttach(this);
        }
        this.initialized = true;
        Logger.info(`Scene "${this.name}" initialized with ${this.systems.length} systems`);
    }

    onEnter() {
        Logger.info(`Scene "${this.name}" entered`);
    }

    onExit() {
        Logger.info(`Scene "${this.name}" exited`);
    }

    update(deltaTime) {
        for (const system of this.systems) {
            if (system.enabled) system.update(deltaTime, this);
        }
        this.entityManager.flushRemovals();
    }

    destroy() {
        for (const system of this.systems) {
            system.onDetach();
        }
        this.entityManager.clear();
        this.systems.length = 0;
        this.initialized = false;
    }
}