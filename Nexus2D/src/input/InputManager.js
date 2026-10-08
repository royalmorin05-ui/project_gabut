import { Logger } from '../utils/Logger.js';

export class InputManager {
    constructor() {
        this.keysDown = new Set();
        this.keysPressedThisFrame = new Set();
        this.keysReleasedThisFrame = new Set();
        this._boundHandlers = null;
    }

    attach(target = window) {
        this._boundHandlers = {
            keydown: (e) => {
                if (!this.keysDown.has(e.code)) {
                    this.keysPressedThisFrame.add(e.code);
                }
                this.keysDown.add(e.code);
            },
            keyup: (e) => {
                this.keysDown.delete(e.code);
                this.keysReleasedThisFrame.add(e.code);
            },
            blur: () => {
                this.keysDown.clear();
            }
        };
        target.addEventListener('keydown', this._boundHandlers.keydown);
        target.addEventListener('keyup', this._boundHandlers.keyup);
        target.addEventListener('blur', this._boundHandlers.blur);
        Logger.info('InputManager attached');
    }

    detach(target = window) {
        if (!this._boundHandlers) return;
        target.removeEventListener('keydown', this._boundHandlers.keydown);
        target.removeEventListener('keyup', this._boundHandlers.keyup);
        target.removeEventListener('blur', this._boundHandlers.blur);
        this._boundHandlers = null;
    }

    isKeyDown(code) {
        return this.keysDown.has(code);
    }

    isActionDown(codes) {
        for (const code of codes) {
            if (this.keysDown.has(code)) return true;
        }
        return false;
    }

    endFrame() {
        this.keysPressedThisFrame.clear();
        this.keysReleasedThisFrame.clear();
    }
}