import { IdGenerator } from '../utils/IdGenerator.js';
import { Logger } from '../utils/Logger.js';

export class Entity {
    constructor(name = 'Entity') {
        this.id = IdGenerator.next('entity');
        this.name = name;
        this.active = true;
        this.components = new Map();
        this.tags = new Set();
    }

    addComponent(component) {
        const type = component.type;
        if (this.components.has(type)) {
            Logger.warn(`Entity ${this.id} already has component ${type}`);
            return this;
        }
        component.entityId = this.id;
        this.components.set(type, component);
        component.onAttach(this);
        return this;
    }

    removeComponent(ComponentClass) {
        const type = ComponentClass.name;
        const component = this.components.get(type);
        if (!component) return this;
        component.onDetach();
        this.components.delete(type);
        return this;
    }

    getComponent(ComponentClass) {
        return this.components.get(ComponentClass.name) ?? null;
    }

    hasComponent(ComponentClass) {
        return this.components.has(ComponentClass.name);
    }

    addTag(tag) {
        this.tags.add(tag);
        return this;
    }

    hasTag(tag) {
        return this.tags.has(tag);
    }
}