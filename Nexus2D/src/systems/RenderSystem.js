import { System } from './System.js';
import { TransformComponent } from '../ecs/components/TransformComponent.js';
import { SpriteComponent } from '../ecs/components/SpriteComponent.js';

export class RenderSystem extends System {
    constructor(renderer, assetManager = null) {
        super();
        this.renderer = renderer;
        this.assetManager = assetManager;
        this.priority = 100;
    }

    update(_deltaTime, scene) {
        this.renderer.beginFrame();

        const entities = scene.entityManager.query(TransformComponent, SpriteComponent);
        entities.sort((a, b) => {
            const sa = a.getComponent(SpriteComponent);
            const sb = b.getComponent(SpriteComponent);
            return sa.layer - sb.layer;
        });

        for (const entity of entities) {
            const transform = entity.getComponent(TransformComponent);
            const sprite = entity.getComponent(SpriteComponent);
            if (!sprite.visible) continue;

            const texture = sprite.textureKey && this.assetManager
                ? this.assetManager.getImage(sprite.textureKey)
                : null;

            if (texture) {
                this.renderer.drawSprite(
                    transform.position.x,
                    transform.position.y,
                    texture,
                    sprite.width,
                    sprite.height
                );
            } else {
                this.renderer.drawRect(
                    transform.position.x,
                    transform.position.y,
                    sprite.width,
                    sprite.height,
                    sprite.color
                );
            }
        }

        this.renderer.endFrame();
    }
}