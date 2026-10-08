import { System } from './System.js';
import { TransformComponent } from '../ecs/components/TransformComponent.js';
import { VelocityComponent } from '../ecs/components/VelocityComponent.js';

export class MovementSystem extends System {
    constructor() {
        super();
        this.priority = 10;
    }

    update(deltaTime, scene) {
        const entities = scene.entityManager.query(TransformComponent, VelocityComponent);
        for (const entity of entities) {
            const transform = entity.getComponent(TransformComponent);
            const velocity = entity.getComponent(VelocityComponent);
            transform.position.x += velocity.linear.x * deltaTime;
            transform.position.y += velocity.linear.y * deltaTime;
        }
    }
}