import { Component } from '../Component.js';
import { Vector2 } from '../../math/Vector2.js';

export class VelocityComponent extends Component {
    constructor(x = 0, y = 0) {
        super();
        this.linear = new Vector2(x, y);
    }
}