import { Logger } from '../utils/Logger.js';

export class Renderer {
    constructor(canvas, camera) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.camera = camera;
        this.clearColor = '#1a1a2e';
        Logger.info('Renderer initialized', canvas.width, 'x', canvas.height);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.camera.width = width;
        this.camera.height = height;
    }

    beginFrame() {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    endFrame() {
        // Reserved for post-processing in later stages
    }

    drawRect(worldX, worldY, width, height, color) {
        const { x, y } = this.camera.worldToScreen(worldX, worldY);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x - (width * this.camera.zoom) / 2,
            y - (height * this.camera.zoom) / 2,
            width * this.camera.zoom,
            height * this.camera.zoom
        );
    }

    drawSprite(worldX, worldY, image, width, height) {
        const { x, y } = this.camera.worldToScreen(worldX, worldY);
        const w = width * this.camera.zoom;
        const h = height * this.camera.zoom;
        this.ctx.drawImage(image, x - w / 2, y - h / 2, w, h);
    }
}