import { System } from './System.js';
import { TransformComponent } from '../ecs/components/TransformComponent.js';
import { ColliderComponent } from '../ecs/components/ColliderComponent.js';
import { AABB } from '../math/AABB.js';

export class CollisionSystem extends System {
    constructor() {
        super();
        this.priority = 50;  // setelah Movement (10), sebelum Render (100)
        this.onCollision = null;  // callback opsional: (entityA, entityB) => void
    }

    update(_deltaTime, scene) {
        const entities = scene.entityManager.query(TransformComponent, ColliderComponent);

        // Reset collision flags
        for (const entity of entities) {
            entity.getComponent(ColliderComponent).colliding = false;
        }

        // O(n²) broadphase — acceptable untuk Stage 2, akan dioptimasi di stage lanjutan
        for (let i = 0; i < entities.length; i++) {
            const a = entities[i];
            const colA = a.getComponent(ColliderComponent);
            const boundsA = colA.getBounds(a.getComponent(TransformComponent));

            for (let j = i + 1; j < entities.length; j++) {
                const b = entities[j];
                const colB = b.getComponent(ColliderComponent);
                if (colA.layer === colB.layer && colA.isTrigger && colB.isTrigger) continue;

                const boundsB = colB.getBounds(b.getComponent(TransformComponent));
                if (AABB.intersects(boundsA, boundsB)) {
                    colA.colliding = true;
                    colB.colliding = true;
                    if (this.onCollision) this.onCollision(a, b);
                }
            }
        }
    }
}