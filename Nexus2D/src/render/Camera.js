import { Vector2 } from '../math/Vector2.js';

export class Camera {
    constructor(width = 800, height = 600) {
        this.position = new Vector2(0, 0);
        this.width = width;
        this.height = height;
        this.zoom = 1;
    }

    worldToScreen(worldX, worldY) {
        const screenX = (worldX - this.position.x) * this.zoom + this.width / 2;
        const screenY = (worldY - this.position.y) * this.zoom + this.height / 2;
        return { x: screenX, y: screenY };
    }
}