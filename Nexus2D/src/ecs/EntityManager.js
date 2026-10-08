import { Entity } from './Entity.js';
import { Logger } from '../utils/Logger.js';

export class EntityManager {
    constructor() {
        this.entities = new Map();
        this.pendingRemoval = new Set();
    }

    createEntity(name = 'Entity') {
        const entity = new Entity(name);
        this.entities.set(entity.id, entity);
        return entity;
    }

    destroyEntity(entityOrId) {
        const id = typeof entityOrId === 'string' ? entityOrId : entityOrId.id;
        if (!this.entities.has(id)) return false;
        this.pendingRemoval.add(id);
        return true;
    }

    flushRemovals() {
        for (const id of this.pendingRemoval) {
            const entity = this.entities.get(id);
            if (!entity) continue;
            for (const component of entity.components.values()) {
                component.onDetach();
            }
            this.entities.delete(id);
        }
        this.pendingRemoval.clear();
    }

    getEntity(id) {
        return this.entities.get(id) ?? null;
    }

    query(...ComponentClasses) {
        const result = [];
        for (const entity of this.entities.values()) {
            if (!entity.active) continue;
            let matches = true;
            for (const C of ComponentClasses) {
                if (!entity.hasComponent(C)) {
                    matches = false;
                    break;
                }
            }
            if (matches) result.push(entity);
        }
        return result;
    }

    getAll() {
        return Array.from(this.entities.values());
    }

    clear() {
        this.entities.clear();
        this.pendingRemoval.clear();
        Logger.debug('EntityManager cleared');
    }
}