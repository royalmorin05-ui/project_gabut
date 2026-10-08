import { Logger } from '../utils/Logger.js';

export class GameLoop {
    constructor({ update, render }) {
        this.updateFn = update;
        this.renderFn = render;
        this.running = false;
        this.lastTime = 0;
        this.rafId = null;
        this.maxDelta = 0.1; // clamp to avoid spiral of death
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this._tick);
        Logger.info('GameLoop started');
    }

    stop() {
        if (!this.running) return;
        this.running = false;
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = null;
        Logger.info('GameLoop stopped');
    }

    _tick = (now) => {
        if (!this.running) return;
        const deltaTime = Math.min((now - this.lastTime) / 1000, this.maxDelta);
        this.lastTime = now;
        this.updateFn(deltaTime);
        this.renderFn(deltaTime);
        this.rafId = requestAnimationFrame(this._tick);
    };
}