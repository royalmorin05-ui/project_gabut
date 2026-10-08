import { System } from './System.js';
import { PlayerControlComponent } from '../ecs/components/PlayerControlComponent.js';
import { VelocityComponent } from '../ecs/components/VelocityComponent.js';
import { KeyBindings } from '../input/KeyBindings.js';

export class PlayerControlSystem extends System {
    constructor(inputManager) {
        super();
        this.input = inputManager;
        this.priority = 5;  // sebelum MovementSystem (10)
    }

    update(_deltaTime, scene) {
        const entities = scene.entityManager.query(PlayerControlComponent, VelocityComponent);
        for (const entity of entities) {
            const control = entity.getComponent(PlayerControlComponent);
            const velocity = entity.getComponent(VelocityComponent);
            if (!control.enabled) continue;

            let dx = 0;
            let dy = 0;
            if (this.input.isActionDown(KeyBindings.MOVE_LEFT))  dx -= 1;
            if (this.input.isActionDown(KeyBindings.MOVE_RIGHT)) dx += 1;
            if (this.input.isActionDown(KeyBindings.MOVE_UP))    dy -= 1;
            if (this.input.isActionDown(KeyBindings.MOVE_DOWN))  dy += 1;

            const len = Math.hypot(dx, dy);
            if (len > 0) {
                velocity.linear.x = (dx / len) * control.speed;
                velocity.linear.y = (dy / len) * control.speed;
            } else {
                velocity.linear.x = 0;
                velocity.linear.y = 0;
            }
        }
    }
}