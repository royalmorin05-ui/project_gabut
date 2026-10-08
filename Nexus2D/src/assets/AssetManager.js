import { Logger } from '../utils/Logger.js';

export class AssetManager {
    constructor() {
        this.images = new Map();
        this.pending = new Map();
    }

    loadImage(key, url) {
        if (this.images.has(key)) {
            Logger.warn(`Image "${key}" already loaded`);
            return Promise.resolve(this.images.get(key));
        }
        if (this.pending.has(key)) {
            return this.pending.get(key);
        }

        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.images.set(key, img);
                this.pending.delete(key);
                Logger.debug(`Image "${key}" loaded`);
                resolve(img);
            };
            img.onerror = () => {
                this.pending.delete(key);
                Logger.error(`Failed to load image "${key}" from ${url}`);
                reject(new Error(`Failed to load image: ${key}`));
            };
            img.src = url;
        });

        this.pending.set(key, promise);
        return promise;
    }

    async loadAll(manifest) {
        const entries = Object.entries(manifest);
        await Promise.all(entries.map(([key, url]) => this.loadImage(key, url)));
        Logger.info(`Loaded ${entries.length} assets`);
    }

    getImage(key) {
        return this.images.get(key) ?? null;
    }

    has(key) {
        return this.images.has(key);
    }

    clear() {
        this.images.clear();
        this.pending.clear();
    }
}