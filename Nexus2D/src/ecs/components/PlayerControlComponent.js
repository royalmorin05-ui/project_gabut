import { Component } from '../Component.js';

export class PlayerControlComponent extends Component {
    constructor({ speed = 200 } = {}) {
        super();
        this.speed = speed;
        this.enabled = true;
    }
}