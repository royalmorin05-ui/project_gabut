import { Component } from '../Component.js';
import { AABB } from '../../math/AABB.js';

export class ColliderComponent extends Component {
    constructor({ width = 32, height = 32, offsetX = 0, offsetY = 0, isTrigger = false, layer = 'default' } = {}) {
        super();
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.isTrigger = isTrigger;
        this.layer = layer;
        this.colliding = false;
    }

    getBounds(transform) {
        return new AABB(
            transform.position.x + this.offsetX - this.width / 2,
            transform.position.y + this.offsetY - this.height / 2,
            this.width,
            this.height
        );
    }
}