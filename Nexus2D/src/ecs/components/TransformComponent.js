import { Component } from '../Component.js';
import { Vector2 } from '../../math/Vector2.js';

export class TransformComponent extends Component {
    constructor(x = 0, y = 0) {
        super();
        this.position = new Vector2(x, y);
        this.scale = new Vector2(1, 1);
        this.rotation = 0;
    }
}