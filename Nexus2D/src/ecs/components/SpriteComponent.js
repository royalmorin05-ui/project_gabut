import { Component } from '../Component.js';

export class SpriteComponent extends Component {
    constructor({ width = 32, height = 32, color = '#ffffff', textureKey = null } = {}) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.textureKey = textureKey;  // BARU: key ke AssetManager
        this.visible = true;
        this.layer = 0;
    }
}